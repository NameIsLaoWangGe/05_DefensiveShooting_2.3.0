(function () {
    'use strict';

    class ADManager {
        constructor() {
        }
        static ShowBanner() {
            if (TJ.API.AppInfo.Channel() == TJ.Define.Channel.AppRt.ZJTD_AppRt) {
                return;
            }
            let p = new TJ.ADS.Param();
            p.place = TJ.ADS.Place.BOTTOM | TJ.ADS.Place.CENTER;
            TJ.ADS.Api.ShowBanner(p);
        }
        static CloseBanner() {
            let p = new TJ.ADS.Param();
            p.place = TJ.ADS.Place.BOTTOM | TJ.ADS.Place.CENTER;
            TJ.ADS.Api.RemoveBanner(p);
        }
        static ShowNormal() {
            TJ.API.AdService.ShowNormal(new TJ.API.AdService.Param());
        }
        static showNormal2() {
            TJ.API.AdService.ShowNormal(new TJ.API.AdService.Param());
        }
        static ShowReward(rewardAction) {
            lwg.PalyAudio.stopMusic();
            console.log("?????");
            let p = new TJ.ADS.Param();
            p.extraAd = true;
            let getReward = false;
            p.cbi.Add(TJ.Define.Event.Reward, () => {
                getReward = true;
                lwg.PalyAudio.playMusic(lwg.Enum.voiceUrl.bgm, 0, 1000);
                if (rewardAction != null)
                    rewardAction();
            });
            p.cbi.Add(TJ.Define.Event.Close, () => {
                if (!getReward) {
                    lwg.PalyAudio.playMusic(lwg.Enum.voiceUrl.bgm, 0, 1000);
                    lwg.Global._createHint(lwg.Enum.HintType.lookend);
                }
            });
            p.cbi.Add(TJ.Define.Event.NoAds, () => {
                lwg.PalyAudio.playMusic(lwg.Enum.voiceUrl.bgm, 0, 1000);
                lwg.Global._createHint(lwg.Enum.HintType.noAdv);
            });
            TJ.ADS.Api.ShowReward(p);
        }
        static Event(param, value) {
            console.log("Param:>" + param + "Value:>" + value);
            let p = new TJ.GSA.Param();
            if (value == null) {
                p.id = param;
            }
            else {
                p.id = param + value;
            }
            console.log(p.id);
            TJ.GSA.Api.Event(p);
        }
        static initShare() {
            if (TJ.API.AppInfo.Channel() == TJ.Define.Channel.AppRt.WX_AppRt) {
                this.wx.onShareAppMessage(() => {
                    return {
                        title: this.shareContent,
                        imageUrl: this.shareImgUrl,
                        query: ""
                    };
                });
                this.wx.showShareMenu({
                    withShareTicket: true,
                    success: null,
                    fail: null,
                    complete: null
                });
            }
        }
        static lureShare() {
            if (TJ.API.AppInfo.Channel() == TJ.Define.Channel.AppRt.WX_AppRt) {
                this.wx.shareAppMessage({
                    title: this.shareContent,
                    imageUrl: this.shareImgUrl,
                    query: ""
                });
            }
        }
        static VibrateShort() {
            TJ.API.Vibrate.Short();
        }
        static Vibratelong() {
            TJ.API.Vibrate.Long();
        }
        static TAPoint(type, name) {
            let p = new TJ.API.TA.Param();
            p.id = name;
            switch (type) {
                case TaT.BtnShow:
                    TJ.API.TA.Event_Button_Show(p);
                    break;
                case TaT.BtnClick:
                    TJ.API.TA.Event_Button_Click(p);
                    break;
                case TaT.PageShow:
                    TJ.API.TA.Event_Page_Show(p);
                    break;
                case TaT.PageEnter:
                    TJ.API.TA.Event_Page_Enter(p);
                    break;
                case TaT.PageLeave:
                    TJ.API.TA.Event_Page_Leave(p);
                    break;
                case TaT.LevelStart:
                    TJ.API.TA.Event_Level_Start(p);
                    break;
                case TaT.LevelFail:
                    TJ.API.TA.Event_Level_Fail(p);
                    break;
                case TaT.LevelFinish:
                    TJ.API.TA.Event_Level_Finish(p);
                    break;
            }
        }
    }
    ADManager.wx = Laya.Browser.window.wx;
    ADManager.shareImgUrl = "http://image.tomatojoy.cn/6847506204006681a5d5fa0cd91ce408";
    ADManager.shareContent = "快把锅甩给队友！";
    var TaT;
    (function (TaT) {
        TaT[TaT["BtnShow"] = 0] = "BtnShow";
        TaT[TaT["BtnClick"] = 1] = "BtnClick";
        TaT[TaT["PageShow"] = 2] = "PageShow";
        TaT[TaT["PageEnter"] = 3] = "PageEnter";
        TaT[TaT["PageLeave"] = 4] = "PageLeave";
        TaT[TaT["LevelStart"] = 5] = "LevelStart";
        TaT[TaT["LevelFinish"] = 6] = "LevelFinish";
        TaT[TaT["LevelFail"] = 7] = "LevelFail";
    })(TaT || (TaT = {}));

    var lwg;
    (function (lwg) {
        let Global;
        (function (Global) {
            Global._gameLevel = 1;
            Global._gameStart = false;
            Global._execution = 100;
            Global._exemptEx = true;
            Global._freetHint = true;
            Global._CustomsNum = 999;
            Global._stageClick = true;
            Global._goldNum = 0;
            Global._voiceSwitch = true;
            Global._shakeSwitch = true;
            Global._allPifu = ['01_xiaofu', '02_konglong', '03_xueren', '04_qipao', '05_qianxun', '06_lvyifu', '07_maozi', '08_lufei', '09_chaoren'];
            Global.pingceV = true;
            function _vibratingScreen() {
            }
            Global._vibratingScreen = _vibratingScreen;
            function _createLevel(parent, x, y) {
                let sp;
                Laya.loader.load('prefab/LevelNode.json', Laya.Handler.create(this, function (prefab) {
                    let _prefab = new Laya.Prefab();
                    _prefab.json = prefab;
                    sp = Laya.Pool.getItemByCreateFun('prefab', _prefab.create, _prefab);
                    parent.addChild(sp);
                    sp.pos(x, y);
                    sp.zOrder = 0;
                    let level = sp.getChildByName('level');
                    level.text = 'NO.' + lwg.Global._gameLevel;
                    Global.LevelNode = sp;
                }));
            }
            Global._createLevel = _createLevel;
            function _createKeyNum(parent, x, y) {
                let sp;
                Laya.loader.load('prefab/KeyNum.json', Laya.Handler.create(this, function (prefab) {
                    let _prefab = new Laya.Prefab();
                    _prefab.json = prefab;
                    sp = Laya.Pool.getItemByCreateFun('prefab', _prefab.create, _prefab);
                    parent.addChild(sp);
                    sp.pos(x, y);
                    sp.zOrder = 0;
                    let num = sp.getChildByName('Num');
                    num.text = lwg.Global._execution + '/' + '5';
                    Global.KeyNumNode = sp;
                }));
            }
            Global._createKeyNum = _createKeyNum;
            function _createBtnSet(parent) {
                let sp;
                Laya.loader.load('prefab/BtnSet.json', Laya.Handler.create(this, function (prefab) {
                    let _prefab = new Laya.Prefab();
                    _prefab.json = prefab;
                    sp = Laya.Pool.getItemByCreateFun('prefab', _prefab.create, _prefab);
                    parent.addChild(sp);
                    sp.pos(671, 273);
                    sp.zOrder = 0;
                    Click.on(Enum.ClickType.largen, null, sp, null, null, null, btnSetUp, null);
                    Global.BtnSetNode = sp;
                    Global.BtnSetNode.name = 'BtnSetNode';
                }));
            }
            Global._createBtnSet = _createBtnSet;
            function btnSetUp() {
                Admin._openScene('UISet', null, null, null);
            }
            Global.btnSetUp = btnSetUp;
            function _createGoldNum(parent) {
                let sp;
                Laya.loader.load('prefab/GoldNum.json', Laya.Handler.create(this, function (prefab) {
                    let _prefab = new Laya.Prefab();
                    _prefab.json = prefab;
                    sp = Laya.Pool.getItemByCreateFun('prefab', _prefab.create, _prefab);
                    let num = sp.getChildByName('Num');
                    num.value = Global._goldNum.toString();
                    parent.addChild(sp);
                    sp.pos(114, 91);
                    sp.zOrder = 50;
                    Global.GoldNumNode = sp;
                }));
            }
            Global._createGoldNum = _createGoldNum;
            function _createExecutionNum(parent) {
                let sp;
                Laya.loader.load('prefab/ExecutionNum.json', Laya.Handler.create(this, function (prefab) {
                    let _prefab = new Laya.Prefab();
                    _prefab.json = prefab;
                    sp = Laya.Pool.getItemByCreateFun('prefab', _prefab.create, _prefab);
                    parent.addChild(sp);
                    let num = sp.getChildByName('Num');
                    num.value = Global._execution.toString();
                    sp.pos(297, 90);
                    sp.zOrder = 50;
                    Global.ExecutionNumNode = sp;
                    Global.ExecutionNumNode.name = 'ExecutionNumNode';
                }));
            }
            Global._createExecutionNum = _createExecutionNum;
            function _createBtnPause(parent) {
                let sp;
                Laya.loader.load('prefab/BtnPause.json', Laya.Handler.create(this, function (prefab) {
                    let _prefab = new Laya.Prefab();
                    _prefab.json = prefab;
                    sp = Laya.Pool.getItemByCreateFun('prefab', _prefab.create, _prefab);
                    parent.addChild(sp);
                    sp.pos(645, 137);
                    sp.zOrder = 0;
                    Global.BtnPauseNode = sp;
                    Global.BtnPauseNode.name = 'BtnPauseNode';
                    Click.on(Enum.ClickType.largen, null, sp, null, null, null, btnPauseUp, null);
                }));
            }
            Global._createBtnPause = _createBtnPause;
            function btnPauseUp(event) {
                event.stopPropagation();
                event.currentTarget.scale(1, 1);
                lwg.Admin._openScene('UIPause', null, null, null);
            }
            Global.btnPauseUp = btnPauseUp;
            function _createBtnHint(parent) {
                let sp;
                Laya.loader.load('prefab/BtnHint.json', Laya.Handler.create(this, function (prefab) {
                    let _prefab = new Laya.Prefab();
                    _prefab.json = prefab;
                    sp = Laya.Pool.getItemByCreateFun('prefab', _prefab.create, _prefab);
                    parent.addChild(sp);
                    sp.pos(645, 273);
                    sp.zOrder = 0;
                    Global.BtnHintNode = sp;
                    Global.BtnHintNode.name = 'BtnHintNode';
                    Click.on(Enum.ClickType.largen, null, sp, null, null, null, btnHintUp, null);
                }));
            }
            Global._createBtnHint = _createBtnHint;
            function btnHintUp(event) {
                event.currentTarget.scale(1, 1);
                event.stopPropagation();
                lwg.Global._createHint(lwg.Enum.HintType.noHint);
            }
            Global.btnHintUp = btnHintUp;
            function _createBtnAgain(parent) {
                let sp;
                Laya.loader.load('prefab/BtnAgain.json', Laya.Handler.create(this, function (prefab) {
                    let _prefab = new Laya.Prefab();
                    _prefab.json = prefab;
                    sp = Laya.Pool.getItemByCreateFun('prefab', _prefab.create, _prefab);
                    parent.addChild(sp);
                    sp.pos(645, 404);
                    sp.zOrder = 0;
                    Click.on(Enum.ClickType.largen, null, sp, null, null, null, btnAgainUp, null);
                    Global.BtnAgainNode = sp;
                }));
            }
            Global._createBtnAgain = _createBtnAgain;
            function btnAgainUp(event) {
                event.stopPropagation();
                Global.refreshNum++;
                event.currentTarget.scale(1, 1);
                Admin._refreshScene();
            }
            Global.btnAgainUp = btnAgainUp;
            function _createHint(type) {
                let sp;
                Laya.loader.load('prefab/HintPre.json', Laya.Handler.create(this, function (prefab) {
                    let _prefab = new Laya.Prefab();
                    _prefab.json = prefab;
                    sp = Laya.Pool.getItemByCreateFun('prefab', _prefab.create, _prefab);
                    Laya.stage.addChild(sp);
                    sp.pos(Laya.stage.width / 2, Laya.stage.height / 2);
                    let dec = sp.getChildByName('dec');
                    dec.text = Enum.HintDec[type];
                    sp.zOrder = 100;
                    Animation.HintAni_01(sp, 100, 100, 1000, 50, 100, f => {
                        sp.removeSelf();
                    });
                }));
            }
            Global._createHint = _createHint;
            function createConsumeEx(func) {
                let label = Laya.Pool.getItemByClass('label', Laya.Label);
                label.name = 'label';
                Laya.stage.addChild(label);
                label.text = '-2';
                label.fontSize = 40;
                label.bold = true;
                label.color = '#59245c';
                label.x = Global.ExecutionNumNode.x + 100;
                label.y = Global.ExecutionNumNode.y - label.height / 2 + 4;
                label.zOrder = 100;
                lwg.Animation.fadeOut(label, 0, 1, 200, 150, f => {
                    lwg.Animation.leftRight_Shake(Global.ExecutionNumNode, 15, 60, 0, null);
                    lwg.Animation.fadeOut(label, 1, 0, 600, 400, f => {
                        if (func) {
                            func();
                        }
                    });
                });
            }
            Global.createConsumeEx = createConsumeEx;
            function _createGold(type, parent, x, y) {
                let sp;
                Laya.loader.load('prefab/GolPre.json', Laya.Handler.create(this, function (prefab) {
                    let _prefab = new Laya.Prefab();
                    _prefab.json = prefab;
                    sp = Laya.Pool.getItemByCreateFun('prefab', _prefab.create, _prefab);
                    parent.addChild(sp);
                    sp.pos(x, y);
                }));
            }
            Global._createGold = _createGold;
            function _createAddExecution(x, y, func) {
                let sp;
                Laya.loader.load('prefab/execution.json', Laya.Handler.create(this, function (prefab) {
                    let _prefab = new Laya.Prefab();
                    _prefab.json = prefab;
                    sp = Laya.Pool.getItemByCreateFun('prefab', _prefab.create, _prefab);
                    Laya.stage.addChild(sp);
                    sp.x = Laya.stage.width / 2;
                    sp.y = Laya.stage.height / 2;
                    sp.zOrder = 50;
                    if (Global.ExecutionNumNode) {
                        Animation.move_Simple_01(sp, sp.x, sp.y, Global.ExecutionNumNode.x, Global.ExecutionNumNode.y, 800, 100, f => {
                            Animation.fadeOut(sp, 1, 0, 200, 0, f => {
                                lwg.Animation.upDwon_Shake(Global.ExecutionNumNode, 10, 80, 0, null);
                                if (func) {
                                    func();
                                }
                            });
                        });
                    }
                }));
            }
            Global._createAddExecution = _createAddExecution;
        })(Global = lwg.Global || (lwg.Global = {}));
        let LocalStorage;
        (function (LocalStorage) {
            let storageData;
            function addData() {
                storageData = {
                    '_gameLevel': lwg.Global._gameLevel,
                    '_goldNum': lwg.Global._goldNum,
                    '_execution': lwg.Global._execution,
                    '_exemptExTime': lwg.Global._exemptExTime,
                    '_freeHintTime': lwg.Global._freeHintTime,
                };
                let data = JSON.stringify(storageData);
                Laya.LocalStorage.setJSON('storageData', data);
            }
            LocalStorage.addData = addData;
            function clearData() {
                Laya.LocalStorage.clear();
            }
            LocalStorage.clearData = clearData;
            function getData() {
                let storageData = Laya.LocalStorage.getJSON('storageData');
                if (storageData) {
                    let data = JSON.parse(storageData);
                    return data;
                }
                else {
                    lwg.Global._gameLevel = 1;
                    lwg.Global._goldNum = 0;
                    lwg.Global._execution = 15;
                    lwg.Global._exemptExTime = null;
                    lwg.Global._freeHintTime = null;
                    return null;
                }
            }
            LocalStorage.getData = getData;
        })(LocalStorage = lwg.LocalStorage || (lwg.LocalStorage = {}));
        let Admin;
        (function (Admin) {
            Admin._sceneControl = {};
            let SceneName;
            (function (SceneName) {
                SceneName["UILoding"] = "UILoding";
                SceneName["UIStart"] = "UIStart";
                SceneName["UIMain"] = "UIMain";
                SceneName["UIVictory"] = "UIVictory";
                SceneName["UIDefeated"] = "UIDefeated";
                SceneName["UIExecutionHint"] = "UIExecutionHint";
                SceneName["UIPassHint"] = "UIPassHint";
                SceneName["UISet"] = "UISet";
                SceneName["UIPifu"] = "UIPifu";
                SceneName["UIPuase"] = "UIPuase";
            })(SceneName = Admin.SceneName || (Admin.SceneName = {}));
            let GameState;
            (function (GameState) {
                GameState["GameStart"] = "GameStart";
                GameState["Play"] = "Play";
                GameState["Pause"] = "pause";
                GameState["Victory"] = "victory";
                GameState["Defeated"] = "defeated";
            })(GameState = Admin.GameState || (Admin.GameState = {}));
            function _openScene(openName, zOder, cloesScene, func) {
                Laya.Scene.load('Scene/' + openName + '.json', Laya.Handler.create(this, function (scene) {
                    scene.width = Laya.stage.width;
                    scene.height = Laya.stage.height;
                    Laya.stage.addChild(scene);
                    scene.name = openName;
                    Admin._sceneControl[openName] = scene;
                    let background = scene.getChildByName('Background');
                    if (background) {
                        background.width = Laya.stage.width;
                        background.height = Laya.stage.height;
                    }
                    if (cloesScene) {
                        cloesScene.close();
                    }
                    if (func) {
                        func();
                    }
                }));
            }
            Admin._openScene = _openScene;
            function _openGLCustoms() {
                let sceneName;
                let num;
                if (lwg.Global._gameLevel > 30) {
                    num = lwg.Global._gameLevel - 30;
                }
                else {
                    num = lwg.Global._gameLevel;
                }
                Admin.openLevelNum = num;
                if (num <= 9) {
                    sceneName = 'UIMain_00' + num;
                }
                else if (9 < num || num <= 99) {
                    sceneName = 'UIMain_0' + num;
                }
                if (num <= 9) {
                    sceneName = 'UIMain_00' + num;
                }
                else if (9 < num || num <= 99) {
                    sceneName = 'UIMain_0' + num;
                }
                Admin.openCustomName = sceneName;
                console.log('打开', sceneName);
                _openScene(sceneName, null, null, f => {
                    lwg.Global._gameStart = true;
                });
            }
            Admin._openGLCustoms = _openGLCustoms;
            function _openNumCustom(num) {
                let sceneName;
                if (num > 30) {
                    num = num - 30;
                }
                Admin.openLevelNum = num;
                if (num <= 9) {
                    sceneName = 'UIMain_00' + num;
                }
                else if (9 < num || num <= 99) {
                    sceneName = 'UIMain_0' + num;
                }
                if (num <= 9) {
                    sceneName = 'UIMain_00' + num;
                }
                else if (9 < num || num <= 99) {
                    sceneName = 'UIMain_0' + num;
                }
                Admin.openCustomName = sceneName;
                console.log('打开' + sceneName);
                _openScene(sceneName, null, null, f => {
                    lwg.Global._gameStart = true;
                });
            }
            Admin._openNumCustom = _openNumCustom;
            function _openLevelNumCustom() {
                let sceneName;
                if (Admin.openLevelNum <= 9) {
                    sceneName = 'UIMain_00' + Admin.openLevelNum;
                }
                else if (9 < Admin.openLevelNum || Admin.openLevelNum <= 99) {
                    sceneName = 'UIMain_0' + Admin.openLevelNum;
                }
                if (Admin.openLevelNum <= 9) {
                    sceneName = 'UIMain_00' + Admin.openLevelNum;
                }
                else if (9 < Admin.openLevelNum || Admin.openLevelNum <= 99) {
                    sceneName = 'UIMain_0' + Admin.openLevelNum;
                }
                Admin.openCustomName = sceneName;
                _openScene(sceneName, null, null, f => {
                    lwg.Global._gameStart = true;
                });
            }
            Admin._openLevelNumCustom = _openLevelNumCustom;
            function _refreshScene() {
                Admin._sceneControl[Admin.openCustomName].close();
                _openScene(Admin.openCustomName, null, null, null);
            }
            Admin._refreshScene = _refreshScene;
            function _closeCustomScene() {
                console.log('关闭当前关卡' + Admin.openCustomName);
                Admin._sceneControl[Admin.openCustomName].close();
            }
            Admin._closeCustomScene = _closeCustomScene;
            function printPoint(type, name) {
                switch (name) {
                    case SceneName.UILoding:
                        if (type === 'on') {
                            ADManager.TAPoint(TaT.PageEnter, 'UIPreload');
                        }
                        else if (type === 'dis') {
                            ADManager.TAPoint(TaT.PageLeave, 'UIPreload');
                        }
                        break;
                    case SceneName.UIStart:
                        if (type === 'on') {
                            ADManager.TAPoint(TaT.PageEnter, 'mianpage');
                        }
                        else if (type === 'dis') {
                            ADManager.TAPoint(TaT.PageLeave, 'mianpage');
                        }
                        break;
                    case SceneName.UIVictory:
                        if (type === 'on') {
                            ADManager.TAPoint(TaT.PageEnter, 'successpage');
                        }
                        else if (type === 'dis') {
                            ADManager.TAPoint(TaT.PageLeave, 'successpage');
                        }
                        break;
                    case SceneName.UIDefeated:
                        if (type === 'on') {
                            ADManager.TAPoint(TaT.PageEnter, 'failpage');
                        }
                        else if (type === 'dis') {
                            ADManager.TAPoint(TaT.PageLeave, 'failpage');
                        }
                        break;
                    case SceneName.UIExecutionHint:
                        if (type === 'on') {
                            ADManager.TAPoint(TaT.PageEnter, 'noticketpage');
                        }
                        else if (type === 'dis') {
                            ADManager.TAPoint(TaT.PageLeave, 'noticketpage');
                        }
                        break;
                    case SceneName.UIPassHint:
                        if (type === 'on') {
                            ADManager.TAPoint(TaT.PageEnter, 'freegiftpage');
                        }
                        else if (type === 'dis') {
                            ADManager.TAPoint(TaT.PageLeave, 'freegiftpage');
                        }
                        break;
                    case SceneName.UIPuase:
                        if (type === 'on') {
                            ADManager.TAPoint(TaT.PageEnter, 'pausepage');
                        }
                        else if (type === 'dis') {
                            ADManager.TAPoint(TaT.PageLeave, 'pausepage');
                        }
                        break;
                    default:
                        break;
                }
            }
            Admin.printPoint = printPoint;
            class Scene extends Laya.Script {
                constructor() {
                    super();
                }
                onEnable() {
                    this.self = this.owner;
                    this.calssName = this['__proto__']['constructor'].name;
                    this.gameState(this.calssName);
                    this.self[this.calssName] = this;
                    this.selfVars();
                    this.lwgInit();
                    this.btnOnClick();
                    this.adaptive();
                }
                gameState(calssName) {
                    switch (calssName) {
                        case SceneName.UIStart:
                            Admin._gameState = lwg.Enum.GameState.GameStart;
                            break;
                        case SceneName.UIMain:
                            Admin._gameState = lwg.Enum.GameState.Play;
                            break;
                        case SceneName.UIDefeated:
                            Admin._gameState = lwg.Enum.GameState.Defeated;
                            break;
                        case SceneName.UIVictory:
                            Admin._gameState = lwg.Enum.GameState.Victory;
                            break;
                        default:
                            break;
                    }
                }
                lwgInit() {
                }
                selfVars() {
                }
                btnOnClick() {
                }
                adaptive() {
                }
                openAni() {
                }
                vanishAni() {
                }
                onUpdate() {
                    this.lwgOnUpdate();
                }
                lwgOnUpdate() {
                }
                onDisable() {
                    this.lwgDisable();
                }
                lwgDisable() {
                }
            }
            Admin.Scene = Scene;
            class Person extends Laya.Script {
                constructor() {
                    super();
                }
                onEnable() {
                    this.self = this.owner;
                    this.selfScene = this.self.scene;
                    this.rig = this.self.getComponent(Laya.RigidBody);
                    let calssName = this['__proto__']['constructor'].name;
                    this.self[calssName] = this;
                    this.lwgInit();
                }
                lwgInit() {
                }
                onUpdate() {
                    this.lwgOnUpdate();
                }
                lwgOnUpdate() { }
                onDisable() {
                    this.lwgOnDisable();
                }
                lwgOnDisable() { }
            }
            Admin.Person = Person;
            class Object extends Laya.Script {
                constructor() {
                    super();
                }
                onEnable() {
                    this.self = this.owner;
                    this.selfScene = this.self.scene;
                    let calssName = this['__proto__']['constructor'].name;
                    this.self[calssName] = this;
                    this.rig = this.self.getComponent(Laya.RigidBody);
                    this.lwgInit();
                }
                lwgInit() {
                }
                onUpdate() {
                    this.lwgOnUpdate();
                }
                lwgOnUpdate() { }
                onDisable() {
                    this.lwgOnDisable();
                }
                lwgOnDisable() { }
            }
            Admin.Object = Object;
        })(Admin = lwg.Admin || (lwg.Admin = {}));
        let Hint;
        (function (Hint) {
            let SkinUrl;
            (function (SkinUrl) {
                SkinUrl[SkinUrl["ui_square_012"] = 0] = "ui_square_012";
            })(SkinUrl || (SkinUrl = {}));
            function _createHint(type) {
                let sp = new Laya.Sprite();
                let pic = new Laya.Image();
                pic.skin = SkinUrl[0];
                Laya.stage.addChild(sp);
                sp.pos(Laya.stage.width / 2, Laya.stage.height / 2);
                let dec = sp.getChildByName('dec');
                dec.text = Enum.HintDec[type];
                sp.zOrder = 100;
                Animation.HintAni_01(sp, 100, 100, 1000, 50, 100, f => {
                    sp.removeSelf();
                });
            }
            Hint._createHint = _createHint;
        })(Hint = lwg.Hint || (lwg.Hint = {}));
        let Effects;
        (function (Effects) {
            let SkinUrl;
            (function (SkinUrl) {
                SkinUrl[SkinUrl["Frame/Effects/cir_white.png"] = 0] = "Frame/Effects/cir_white.png";
                SkinUrl[SkinUrl["Frame/Effects/cir_black.png"] = 1] = "Frame/Effects/cir_black.png";
                SkinUrl[SkinUrl["Frame/Effects/cir_blue.png"] = 2] = "Frame/Effects/cir_blue.png";
                SkinUrl[SkinUrl["Frame/Effects/cir_bluish.png"] = 3] = "Frame/Effects/cir_bluish.png";
                SkinUrl[SkinUrl["Frame/Effects/cir_cyan.png"] = 4] = "Frame/Effects/cir_cyan.png";
                SkinUrl[SkinUrl["Frame/Effects/cir_grass.png"] = 5] = "Frame/Effects/cir_grass.png";
                SkinUrl[SkinUrl["Frame/Effects/cir_green.png"] = 6] = "Frame/Effects/cir_green.png";
                SkinUrl[SkinUrl["Frame/Effects/cir_orange.png"] = 7] = "Frame/Effects/cir_orange.png";
                SkinUrl[SkinUrl["Frame/Effects/cir_pink.png"] = 8] = "Frame/Effects/cir_pink.png";
                SkinUrl[SkinUrl["Frame/Effects/cir_purple.png"] = 9] = "Frame/Effects/cir_purple.png";
                SkinUrl[SkinUrl["Frame/Effects/cir_red.png"] = 10] = "Frame/Effects/cir_red.png";
                SkinUrl[SkinUrl["Frame/Effects/cir_yellow.png"] = 11] = "Frame/Effects/cir_yellow.png";
                SkinUrl[SkinUrl["Frame/Effects/star_black.png"] = 12] = "Frame/Effects/star_black.png";
                SkinUrl[SkinUrl["Frame/Effects/star_blue.png"] = 13] = "Frame/Effects/star_blue.png";
                SkinUrl[SkinUrl["Frame/Effects/star_bluish.png"] = 14] = "Frame/Effects/star_bluish.png";
                SkinUrl[SkinUrl["Frame/Effects/star_cyan.png"] = 15] = "Frame/Effects/star_cyan.png";
                SkinUrl[SkinUrl["Frame/Effects/star_grass.png"] = 16] = "Frame/Effects/star_grass.png";
                SkinUrl[SkinUrl["Frame/Effects/star_green.png"] = 17] = "Frame/Effects/star_green.png";
                SkinUrl[SkinUrl["Frame/Effects/star_orange.png"] = 18] = "Frame/Effects/star_orange.png";
                SkinUrl[SkinUrl["Frame/Effects/star_pink.png"] = 19] = "Frame/Effects/star_pink.png";
                SkinUrl[SkinUrl["Frame/Effects/star_purple.png"] = 20] = "Frame/Effects/star_purple.png";
                SkinUrl[SkinUrl["Frame/Effects/star_red.png"] = 21] = "Frame/Effects/star_red.png";
                SkinUrl[SkinUrl["Frame/Effects/star_white.png"] = 22] = "Frame/Effects/star_white.png";
                SkinUrl[SkinUrl["Frame/Effects/star_yellow.png"] = 23] = "Frame/Effects/star_yellow.png";
            })(SkinUrl = Effects.SkinUrl || (Effects.SkinUrl = {}));
            class EffectsBase extends Laya.Script {
                onEnable() {
                    this.self = this.owner;
                    this.selfScene = this.self.scene;
                    let calssName = this['__proto__']['constructor'].name;
                    this.self[calssName] = this;
                    this.self.pivotX = this.self.width / 2;
                    this.self.pivotY = this.self.height / 2;
                    this.timer = 0;
                    this.lwgInit();
                    this.initProperty();
                    this.propertyAssign();
                }
                lwgInit() {
                }
                initProperty() {
                }
                propertyAssign() {
                    if (this.startAlpha) {
                        this.self.alpha = this.startAlpha;
                    }
                    if (this.startScale) {
                        this.self.scale(this.startScale, this.startScale);
                    }
                    if (this.startRotat) {
                        this.self.rotation = this.startRotat;
                    }
                }
                commonSpeedXYByAngle(angle, speed) {
                    this.self.x += Tools.speedXYByAngle(angle, speed + this.accelerated).x;
                    this.self.y += Tools.speedXYByAngle(angle, speed + this.accelerated).y;
                }
                moveRules() {
                }
                onUpdate() {
                    this.moveRules();
                }
                onDisable() {
                    Laya.Pool.recover(this.self.name, this.self);
                }
            }
            Effects.EffectsBase = EffectsBase;
            function createCommonExplosion(parent, quantity, x, y) {
                for (let index = 0; index < quantity; index++) {
                    let ele = Laya.Pool.getItemByClass('ele', Laya.Image);
                    ele.name = 'ele';
                    let num = Math.floor(Math.random() * 12);
                    ele.alpha = 1;
                    ele.skin = SkinUrl[num];
                    parent.addChild(ele);
                    ele.pos(x, y);
                    let scirpt = ele.getComponent(commonExplosion);
                    if (!scirpt) {
                        ele.addComponent(commonExplosion);
                    }
                }
            }
            Effects.createCommonExplosion = createCommonExplosion;
            class commonExplosion extends lwg.Effects.EffectsBase {
                initProperty() {
                    this.startAngle = 360 * Math.random();
                    this.startSpeed = 5 * Math.random() + 8;
                    this.startScale = 0.4 + Math.random() * 0.6;
                    this.accelerated = 0.1;
                    this.vanishTime = 8 + Math.random() * 10;
                }
                moveRules() {
                    this.timer++;
                    if (this.timer >= this.vanishTime / 2) {
                        this.self.alpha -= 0.15;
                    }
                    if (this.timer >= this.vanishTime) {
                        this.self.removeSelf();
                    }
                    else {
                        this.commonSpeedXYByAngle(this.startAngle, this.startSpeed + this.accelerated);
                    }
                }
            }
            Effects.commonExplosion = commonExplosion;
        })(Effects = lwg.Effects || (lwg.Effects = {}));
        let Sk;
        (function (Sk) {
            Sk.gongzhuTem = new Laya.Templet();
            Sk.wangziTem = new Laya.Templet();
            Sk.gouTem = new Laya.Templet();
            Sk.qingdi_01Tem = new Laya.Templet();
            Sk.qingdi_02Tem = new Laya.Templet();
            Sk.houmaTem = new Laya.Templet();
            Sk.houziTem = new Laya.Templet();
            Sk.houseTem = new Laya.Templet();
            function skLoding() {
                createGongzhuTem();
                createWangziTem();
                createGouTem();
                createQingdi_01Tem();
                createQingdi_02Tem();
                createHoumaTem();
                createHouziTem();
                createHouseTem();
            }
            Sk.skLoding = skLoding;
            function createGongzhuTem() {
                Sk.gongzhuTem.on(Laya.Event.COMPLETE, this, null);
                Sk.gongzhuTem.on(Laya.Event.ERROR, this, onError);
                Sk.gongzhuTem.loadAni("SK/gongzhu.sk");
            }
            Sk.createGongzhuTem = createGongzhuTem;
            function createWangziTem() {
                Sk.wangziTem.on(Laya.Event.COMPLETE, this, null);
                Sk.wangziTem.on(Laya.Event.ERROR, this, onError);
                Sk.wangziTem.loadAni("SK/wangzi.sk");
            }
            Sk.createWangziTem = createWangziTem;
            function createGouTem() {
                Sk.gouTem.on(Laya.Event.COMPLETE, this, null);
                Sk.gouTem.on(Laya.Event.ERROR, this, onError);
                Sk.gouTem.loadAni("SK/gou.sk");
            }
            Sk.createGouTem = createGouTem;
            function createQingdi_01Tem() {
                Sk.qingdi_01Tem.on(Laya.Event.COMPLETE, this, null);
                Sk.qingdi_01Tem.on(Laya.Event.ERROR, this, onError);
                Sk.qingdi_01Tem.loadAni("SK/qingdi.sk");
            }
            Sk.createQingdi_01Tem = createQingdi_01Tem;
            function createQingdi_02Tem() {
                Sk.qingdi_02Tem.on(Laya.Event.COMPLETE, this, null);
                Sk.qingdi_02Tem.on(Laya.Event.ERROR, this, onError);
                Sk.qingdi_02Tem.loadAni("SK/qingdi1.sk");
            }
            Sk.createQingdi_02Tem = createQingdi_02Tem;
            function createHoumaTem() {
                Sk.houmaTem.on(Laya.Event.COMPLETE, this, null);
                Sk.houmaTem.on(Laya.Event.ERROR, this, onError);
                Sk.houmaTem.loadAni("SK/houma.sk");
            }
            Sk.createHoumaTem = createHoumaTem;
            function createHouziTem() {
                Sk.houziTem.on(Laya.Event.COMPLETE, this, null);
                Sk.houziTem.on(Laya.Event.ERROR, this, onError);
                Sk.houziTem.loadAni("SK/houzi.sk");
            }
            Sk.createHouziTem = createHouziTem;
            function createHouseTem() {
                Sk.houseTem.on(Laya.Event.COMPLETE, this, null);
                Sk.houseTem.on(Laya.Event.ERROR, this, onError);
                Sk.houseTem.loadAni("SK/house.sk");
            }
            Sk.createHouseTem = createHouseTem;
            function onError() {
                console.log('加载失败！');
            }
            Sk.onError = onError;
        })(Sk = lwg.Sk || (lwg.Sk = {}));
        let Enum;
        (function (Enum) {
            let HintDec;
            (function (HintDec) {
                HintDec[HintDec["\u91D1\u5E01\u4E0D\u591F\u4E86\uFF01"] = 0] = "\u91D1\u5E01\u4E0D\u591F\u4E86\uFF01";
                HintDec[HintDec["\u6CA1\u6709\u53EF\u4EE5\u5356\u7684\u76AE\u80A4\u4E86\uFF01"] = 1] = "\u6CA1\u6709\u53EF\u4EE5\u5356\u7684\u76AE\u80A4\u4E86\uFF01";
                HintDec[HintDec["\u6682\u65F6\u6CA1\u6709\u5E7F\u544A\uFF0C\u8FC7\u4F1A\u513F\u518D\u8BD5\u8BD5\u5427\uFF01"] = 2] = "\u6682\u65F6\u6CA1\u6709\u5E7F\u544A\uFF0C\u8FC7\u4F1A\u513F\u518D\u8BD5\u8BD5\u5427\uFF01";
                HintDec[HintDec["\u6682\u65E0\u76AE\u80A4!"] = 3] = "\u6682\u65E0\u76AE\u80A4!";
                HintDec[HintDec["\u6682\u65E0\u5206\u4EAB!"] = 4] = "\u6682\u65E0\u5206\u4EAB!";
                HintDec[HintDec["\u6682\u65E0\u63D0\u793A\u673A\u4F1A!"] = 5] = "\u6682\u65E0\u63D0\u793A\u673A\u4F1A!";
                HintDec[HintDec["\u89C2\u770B\u5B8C\u6574\u5E7F\u544A\u624D\u80FD\u83B7\u53D6\u5956\u52B1\u54E6\uFF01"] = 6] = "\u89C2\u770B\u5B8C\u6574\u5E7F\u544A\u624D\u80FD\u83B7\u53D6\u5956\u52B1\u54E6\uFF01";
                HintDec[HintDec["\u6CA1\u6709\u8FC7\u5173\u54E6\uFF0C\u518D\u63A5\u518D\u5389\uFF01"] = 7] = "\u6CA1\u6709\u8FC7\u5173\u54E6\uFF0C\u518D\u63A5\u518D\u5389\uFF01";
                HintDec[HintDec["\u5206\u4EAB\u6210\u529F\u540E\u624D\u80FD\u83B7\u53D6\u5956\u52B1\uFF01"] = 8] = "\u5206\u4EAB\u6210\u529F\u540E\u624D\u80FD\u83B7\u53D6\u5956\u52B1\uFF01";
                HintDec[HintDec["\u5206\u4EAB\u6210\u529F"] = 9] = "\u5206\u4EAB\u6210\u529F";
                HintDec[HintDec["\u6682\u65E0\u89C6\u9891\uFF0C\u73A9\u4E00\u5C40\u6E38\u620F\u4E4B\u540E\u5206\u4EAB\uFF01"] = 10] = "\u6682\u65E0\u89C6\u9891\uFF0C\u73A9\u4E00\u5C40\u6E38\u620F\u4E4B\u540E\u5206\u4EAB\uFF01";
                HintDec[HintDec["\u6D88\u80172\u70B9\u4F53\u529B\uFF01"] = 11] = "\u6D88\u80172\u70B9\u4F53\u529B\uFF01";
            })(HintDec = Enum.HintDec || (Enum.HintDec = {}));
            let HintType;
            (function (HintType) {
                HintType[HintType["noGold"] = 0] = "noGold";
                HintType[HintType["noGetPifu"] = 1] = "noGetPifu";
                HintType[HintType["noAdv"] = 2] = "noAdv";
                HintType[HintType["noPifu"] = 3] = "noPifu";
                HintType[HintType["noShare"] = 4] = "noShare";
                HintType[HintType["noHint"] = 5] = "noHint";
                HintType[HintType["lookend"] = 6] = "lookend";
                HintType[HintType["nopass"] = 7] = "nopass";
                HintType[HintType["sharefail"] = 8] = "sharefail";
                HintType[HintType["sharesuccess"] = 9] = "sharesuccess";
                HintType[HintType["novideo"] = 10] = "novideo";
                HintType[HintType["consumeEx"] = 11] = "consumeEx";
            })(HintType = Enum.HintType || (Enum.HintType = {}));
            let PifuOrder;
            (function (PifuOrder) {
                PifuOrder[PifuOrder["01_xiaofu"] = 0] = "01_xiaofu";
                PifuOrder[PifuOrder["02_konglong"] = 1] = "02_konglong";
                PifuOrder[PifuOrder["03_xueren"] = 2] = "03_xueren";
                PifuOrder[PifuOrder["04_qipao"] = 3] = "04_qipao";
                PifuOrder[PifuOrder["05_qianxun"] = 4] = "05_qianxun";
                PifuOrder[PifuOrder["06_lvyifu"] = 5] = "06_lvyifu";
                PifuOrder[PifuOrder["07_maozi"] = 6] = "07_maozi";
                PifuOrder[PifuOrder["08_lufei"] = 7] = "08_lufei";
                PifuOrder[PifuOrder["09_chaoren"] = 8] = "09_chaoren";
            })(PifuOrder = Enum.PifuOrder || (Enum.PifuOrder = {}));
            let ClickType;
            (function (ClickType) {
                ClickType["noEffect"] = "noEffect";
                ClickType["largen"] = "largen";
                ClickType["balloon"] = "balloon";
                ClickType["beetle"] = "beetle";
            })(ClickType = Enum.ClickType || (Enum.ClickType = {}));
            let voiceUrl;
            (function (voiceUrl) {
                voiceUrl["btn"] = "Voice/btn.wav";
                voiceUrl["bgm"] = "Voice/bgm.mp3";
                voiceUrl["victory"] = "Voice/guoguan.wav";
                voiceUrl["defeated"] = "Voice/wancheng.wav";
            })(voiceUrl = Enum.voiceUrl || (Enum.voiceUrl = {}));
            let PifuAllName;
            (function (PifuAllName) {
                PifuAllName[PifuAllName["01_xiaofu"] = 0] = "01_xiaofu";
                PifuAllName[PifuAllName["02_konglong"] = 1] = "02_konglong";
                PifuAllName[PifuAllName["03_xueren"] = 2] = "03_xueren";
                PifuAllName[PifuAllName["04_qipao"] = 3] = "04_qipao";
                PifuAllName[PifuAllName["05_qianxun"] = 4] = "05_qianxun";
                PifuAllName[PifuAllName["06_lvyifu"] = 5] = "06_lvyifu";
                PifuAllName[PifuAllName["07_maozi"] = 6] = "07_maozi";
                PifuAllName[PifuAllName["08_lufei"] = 7] = "08_lufei";
                PifuAllName[PifuAllName["09_chaoren"] = 8] = "09_chaoren";
            })(PifuAllName = Enum.PifuAllName || (Enum.PifuAllName = {}));
            let PifuAllName_Ch;
            (function (PifuAllName_Ch) {
                PifuAllName_Ch[PifuAllName_Ch["\u540C\u684C"] = 0] = "\u540C\u684C";
                PifuAllName_Ch[PifuAllName_Ch["\u5C0F\u6050\u9F99"] = 1] = "\u5C0F\u6050\u9F99";
                PifuAllName_Ch[PifuAllName_Ch["\u96EA\u4EBA"] = 2] = "\u96EA\u4EBA";
                PifuAllName_Ch[PifuAllName_Ch["\u557E\u557E"] = 3] = "\u557E\u557E";
                PifuAllName_Ch[PifuAllName_Ch["\u5C0F\u828A"] = 4] = "\u5C0F\u828A";
                PifuAllName_Ch[PifuAllName_Ch["\u9EA6\u5C14"] = 5] = "\u9EA6\u5C14";
                PifuAllName_Ch[PifuAllName_Ch["\u68D2\u7403\u5C0F\u5B50"] = 6] = "\u68D2\u7403\u5C0F\u5B50";
                PifuAllName_Ch[PifuAllName_Ch["\u9646\u80A5"] = 7] = "\u9646\u80A5";
                PifuAllName_Ch[PifuAllName_Ch["\u82F1\u96C4"] = 8] = "\u82F1\u96C4";
            })(PifuAllName_Ch = Enum.PifuAllName_Ch || (Enum.PifuAllName_Ch = {}));
            let PifuSkin;
            (function (PifuSkin) {
                PifuSkin[PifuSkin["pifu/pifu_01_xiaofu.png"] = 0] = "pifu/pifu_01_xiaofu.png";
                PifuSkin[PifuSkin["pifu/pifu_02_konglong.png"] = 1] = "pifu/pifu_02_konglong.png";
                PifuSkin[PifuSkin["pifu/pifu_03_xueren.png"] = 2] = "pifu/pifu_03_xueren.png";
                PifuSkin[PifuSkin["pifu/pifu_04_qipao.png"] = 3] = "pifu/pifu_04_qipao.png";
                PifuSkin[PifuSkin["pifu/pifu_05_qianxun.png"] = 4] = "pifu/pifu_05_qianxun.png";
                PifuSkin[PifuSkin["pifu/pifu_06_lvyifu.png"] = 5] = "pifu/pifu_06_lvyifu.png";
                PifuSkin[PifuSkin["pifu/pifu_07_maozi.png"] = 6] = "pifu/pifu_07_maozi.png";
                PifuSkin[PifuSkin["pifu/pifu_08_lufei.png"] = 7] = "pifu/pifu_08_lufei.png";
                PifuSkin[PifuSkin["pifu/pifu_09_chaoren.png"] = 8] = "pifu/pifu_09_chaoren.png";
            })(PifuSkin = Enum.PifuSkin || (Enum.PifuSkin = {}));
            let PifuSkin_No;
            (function (PifuSkin_No) {
                PifuSkin_No[PifuSkin_No["pifu/pifu_01_xiaofu_h.png"] = 0] = "pifu/pifu_01_xiaofu_h.png";
                PifuSkin_No[PifuSkin_No["pifu/pifu_02_konglong_h.png"] = 1] = "pifu/pifu_02_konglong_h.png";
                PifuSkin_No[PifuSkin_No["pifu/pifu_03_xueren_h.png"] = 2] = "pifu/pifu_03_xueren_h.png";
                PifuSkin_No[PifuSkin_No["pifu/pifu_04_qipao_h.png"] = 3] = "pifu/pifu_04_qipao_h.png";
                PifuSkin_No[PifuSkin_No["pifu/pifu_05_qianxun_h.png"] = 4] = "pifu/pifu_05_qianxun_h.png";
                PifuSkin_No[PifuSkin_No["pifu/pifu_06_lvyifu_h.png"] = 5] = "pifu/pifu_06_lvyifu_h.png";
                PifuSkin_No[PifuSkin_No["pifu/pifu_07_maozi_h.png"] = 6] = "pifu/pifu_07_maozi_h.png";
                PifuSkin_No[PifuSkin_No["pifu/pifu_08_lufei_h.png"] = 7] = "pifu/pifu_08_lufei_h.png";
                PifuSkin_No[PifuSkin_No["pifu/pifu_09_chaoren_h.png"] = 8] = "pifu/pifu_09_chaoren_h.png";
            })(PifuSkin_No = Enum.PifuSkin_No || (Enum.PifuSkin_No = {}));
            let TaskType;
            (function (TaskType) {
                TaskType["topUp"] = "topUp";
                TaskType["move"] = "move";
                TaskType["continue"] = "continue";
                TaskType["gold"] = "gold";
            })(TaskType = Enum.TaskType || (Enum.TaskType = {}));
            let PersonDir;
            (function (PersonDir) {
                PersonDir["up"] = "up";
                PersonDir["down"] = "down";
                PersonDir["left"] = "left";
                PersonDir["right"] = "right";
            })(PersonDir = Enum.PersonDir || (Enum.PersonDir = {}));
            let SceneName;
            (function (SceneName) {
                SceneName["UILoding"] = "UILoding";
                SceneName["UIMain"] = "UIMain";
                SceneName["UIStart"] = "UIStart";
                SceneName["UITask"] = "UITask";
                SceneName["UIVictory"] = "UIVictory";
                SceneName["UIDefeated"] = "UIDefeated";
            })(SceneName = Enum.SceneName || (Enum.SceneName = {}));
            let GameState;
            (function (GameState) {
                GameState["GameStart"] = "GameStart";
                GameState["Play"] = "Play";
                GameState["Pause"] = "pause";
                GameState["Victory"] = "victory";
                GameState["Defeated"] = "defeated";
            })(GameState = Enum.GameState || (Enum.GameState = {}));
            let MoveState;
            (function (MoveState) {
                MoveState["onFloor"] = "onFloor";
                MoveState["onLadder"] = "onLadder";
                MoveState["inAir"] = "inAir";
            })(MoveState = Enum.MoveState || (Enum.MoveState = {}));
            let BuffState;
            (function (BuffState) {
                BuffState["stick"] = "stick";
                BuffState["kettle"] = "kettle";
            })(BuffState = Enum.BuffState || (Enum.BuffState = {}));
            let RoomColor;
            (function (RoomColor) {
                RoomColor["blue"] = "blue";
                RoomColor["bluish"] = "bluish";
                RoomColor["grass"] = "grass";
                RoomColor["green"] = "green";
                RoomColor["pink"] = "pink";
                RoomColor["purple"] = "purple";
                RoomColor["red"] = "red";
                RoomColor["yellow"] = "yellow";
                RoomColor["yellowish"] = "yellowish";
            })(RoomColor = Enum.RoomColor || (Enum.RoomColor = {}));
            let RoomSkin;
            (function (RoomSkin) {
                RoomSkin["blue"] = "Room/room_blue.png";
                RoomSkin["bluish"] = "Room/room_bluish.png";
                RoomSkin["grass"] = "Room/room_grass.png";
                RoomSkin["green"] = "Room/room_green.png";
                RoomSkin["pink"] = "Room/room_pink.png";
                RoomSkin["purple"] = "Room/room_purple.png";
                RoomSkin["red"] = "Room/room_red.png";
                RoomSkin["yellow"] = "Room/room_yellow.png";
                RoomSkin["yellowish"] = "Room/room_yellowish.png";
            })(RoomSkin = Enum.RoomSkin || (Enum.RoomSkin = {}));
            let WallSkin;
            (function (WallSkin) {
                WallSkin["blue"] = "Room/room_blue_wall.png";
                WallSkin["bluish"] = "Room/room_bluish_wall.png";
                WallSkin["grass"] = "Room/room_grass_wall.png";
                WallSkin["green"] = "Room/room_green_wall.png";
                WallSkin["pink"] = "Room/room_pink_wall.png";
                WallSkin["purple"] = "Room/room_purple_wall.png";
                WallSkin["red"] = "Room/room_red_wall.png";
                WallSkin["yellow"] = "Room/room_yellow_wall.png";
                WallSkin["yellowish"] = "Room/room_yellowish_wall.png";
            })(WallSkin = Enum.WallSkin || (Enum.WallSkin = {}));
            let AisleColorSkin;
            (function (AisleColorSkin) {
                AisleColorSkin["blue"] = "Room/room_blue_color.png";
                AisleColorSkin["bluish"] = "Room/room_bluish_color.png";
                AisleColorSkin["grass"] = "Room/room_grass_color.png";
                AisleColorSkin["green"] = "Room/room_green_color.png";
                AisleColorSkin["pink"] = "Room/room_pink_color.png";
                AisleColorSkin["purple"] = "Room/room_purple_color.png";
                AisleColorSkin["red"] = "Room/room_red_color.png";
                AisleColorSkin["yellow"] = "Room/room_yellow_color.png";
                AisleColorSkin["yellowish"] = "Room/room_yellowish_color.png";
            })(AisleColorSkin = Enum.AisleColorSkin || (Enum.AisleColorSkin = {}));
            let gongzhuAni;
            (function (gongzhuAni) {
                gongzhuAni["walk"] = "walk";
                gongzhuAni["die"] = "die";
                gongzhuAni["die_xianglian"] = "die_xianglian";
                gongzhuAni["walk_gun"] = "walk_gun";
                gongzhuAni["walk_shuihu"] = "walk_shuihu";
                gongzhuAni["walk_xianglian"] = "walk_xianglian";
                gongzhuAni["attack_gun"] = "attack_gun";
                gongzhuAni["attack_shuihu"] = "attack_shuihu";
                gongzhuAni["win"] = "win";
                gongzhuAni["win_xianglian"] = "win_xianglian";
            })(gongzhuAni = Enum.gongzhuAni || (Enum.gongzhuAni = {}));
            let dogAni;
            (function (dogAni) {
                dogAni["standby"] = "standby";
                dogAni["walk"] = "walk";
                dogAni["die"] = "die";
            })(dogAni = Enum.dogAni || (Enum.dogAni = {}));
            let wangziAni;
            (function (wangziAni) {
                wangziAni["standby"] = "standby";
                wangziAni["win"] = "win";
                wangziAni["walk"] = "walk";
            })(wangziAni = Enum.wangziAni || (Enum.wangziAni = {}));
            let houseAni;
            (function (houseAni) {
                houseAni["box_01_open"] = "box_01_open";
                houseAni["box_02_open"] = "box_02_open";
                houseAni["box_01_static"] = "box_01_static";
                houseAni["box_02_static"] = "box_02_static";
            })(houseAni = Enum.houseAni || (Enum.houseAni = {}));
            let bulletType;
            (function (bulletType) {
                bulletType["yellow"] = "yellow";
                bulletType["bule"] = "bule";
                bulletType["green"] = "green";
            })(bulletType = Enum.bulletType || (Enum.bulletType = {}));
        })(Enum = lwg.Enum || (lwg.Enum = {}));
        let Click;
        (function (Click) {
            let Type;
            (function (Type) {
                Type["noEffect"] = "noEffect";
                Type["largen"] = "largen";
                Type["balloon"] = "balloon";
                Type["beetle"] = "beetle";
            })(Type = Click.Type || (Click.Type = {}));
            function on(effect, audioUrl, target, caller, down, move, up, out) {
                let btnEffect;
                if (audioUrl) {
                    Click.audioUrl = audioUrl;
                }
                else {
                    Click.audioUrl = Enum.voiceUrl.btn;
                }
                switch (effect) {
                    case 'noEffect':
                        btnEffect = new Btn_NoEffect();
                        break;
                    case 'largen':
                        btnEffect = new Btn_LargenEffect();
                        break;
                    case 'balloon':
                        btnEffect = new Btn_Balloon();
                        break;
                    case 'beetle':
                        btnEffect = new Btn_Beetle();
                        break;
                    default:
                        btnEffect = new Btn_LargenEffect();
                        break;
                }
                target.on(Laya.Event.MOUSE_DOWN, caller, down === null ? btnEffect.down : down);
                target.on(Laya.Event.MOUSE_MOVE, caller, move === null ? btnEffect.move : move);
                target.on(Laya.Event.MOUSE_UP, caller, up === null ? btnEffect.up : up);
                target.on(Laya.Event.MOUSE_OUT, caller, out === null ? btnEffect.out : out);
            }
            Click.on = on;
            function off(effect, target, caller, down, move, up, out) {
                let btnEffect;
                switch (effect) {
                    case 'largen':
                        btnEffect = new Btn_LargenEffect();
                        break;
                    case 'balloon':
                        btnEffect = new Btn_Balloon();
                        break;
                    case 'beetle':
                        btnEffect = new Btn_Beetle();
                        break;
                    default:
                        break;
                }
                btnPrintPoint('on', target);
                target.off(Laya.Event.MOUSE_DOWN, caller, down === null ? btnEffect.down : down);
                target.off(Laya.Event.MOUSE_MOVE, caller, move === null ? btnEffect.move : move);
                target.off(Laya.Event.MOUSE_UP, caller, up === null ? btnEffect.up : up);
                target.off(Laya.Event.MOUSE_OUT, caller, out === null ? btnEffect.out : out);
            }
            Click.off = off;
        })(Click = lwg.Click || (lwg.Click = {}));
        function btnPrintPoint(type, target) {
            switch (target) {
                case lwg.Global.BtnPauseNode:
                    if (type === 'on') {
                        ADManager.TAPoint(TaT.BtnShow, 'pausebt_play');
                    }
                    else if (type === 'dis') {
                        ADManager.TAPoint(TaT.BtnClick, 'pausebt_play');
                    }
                    break;
                case lwg.Global.BtnHintNode:
                    if (type === 'on') {
                        ADManager.TAPoint(TaT.BtnShow, 'ADrwardbt_play');
                    }
                    else if (type === 'dis') {
                        ADManager.TAPoint(TaT.BtnClick, 'ADrwardbt_play');
                    }
                    break;
                case lwg.Global.BtnAgainNode:
                    if (type === 'on') {
                        ADManager.TAPoint(TaT.BtnShow, 'returnbt_play');
                    }
                    else if (type === 'dis') {
                        ADManager.TAPoint(TaT.BtnClick, 'returnbt_play');
                    }
                    break;
                default:
                    break;
            }
        }
        lwg.btnPrintPoint = btnPrintPoint;
        class Btn_NoEffect {
            constructor() {
            }
            down(event) {
                console.log('无点击效果的点击');
            }
            move(event) {
            }
            up(event) {
            }
            out(event) {
            }
        }
        lwg.Btn_NoEffect = Btn_NoEffect;
        class Btn_LargenEffect {
            constructor() {
            }
            down(event) {
                event.currentTarget.scale(1.1, 1.1);
                if (lwg.Global._voiceSwitch) {
                    Laya.SoundManager.playSound(Click.audioUrl, 1, Laya.Handler.create(this, function () { }));
                }
            }
            move(event) {
                event.currentTarget.scale(1, 1);
            }
            up(event) {
                event.currentTarget.scale(1, 1);
                btnPrintPoint('on', event.currentTarget.name);
            }
            out(event) {
                event.currentTarget.scale(1, 1);
            }
        }
        lwg.Btn_LargenEffect = Btn_LargenEffect;
        class Btn_Balloon {
            constructor() {
            }
            down(event) {
                event.currentTarget.scale(Click.balloonScale + 0.06, Click.balloonScale + 0.06);
                Laya.SoundManager.playSound(Click.audioUrl, 1, Laya.Handler.create(this, function () { }));
            }
            up(event) {
                event.currentTarget.scale(Click.balloonScale, Click.balloonScale);
            }
            move(event) {
                event.currentTarget.scale(Click.balloonScale, Click.balloonScale);
            }
            out(event) {
                event.currentTarget.scale(Click.balloonScale, Click.balloonScale);
            }
        }
        lwg.Btn_Balloon = Btn_Balloon;
        class Btn_Beetle {
            constructor() {
            }
            down(event) {
                event.currentTarget.scale(Click.beetleScale + 0.06, Click.beetleScale + 0.06);
                Laya.SoundManager.playSound(Click.audioUrl, 1, Laya.Handler.create(this, function () { }));
            }
            up(event) {
                event.currentTarget.scale(Click.beetleScale, Click.beetleScale);
            }
            move(event) {
                event.currentTarget.scale(Click.beetleScale, Click.beetleScale);
            }
            out(event) {
                event.currentTarget.scale(Click.beetleScale, Click.beetleScale);
            }
        }
        lwg.Btn_Beetle = Btn_Beetle;
        let Animation;
        (function (Animation) {
            function simple_Rotate(node, Frotate, Erotate, time, func) {
                node.rotation = Frotate;
                Laya.Tween.to(node, { rotation: Erotate }, time, null, Laya.Handler.create(this, function () {
                    if (func !== null) {
                        func();
                    }
                }), 0);
            }
            Animation.simple_Rotate = simple_Rotate;
            function upDown_Overturn(node, time, func) {
                Laya.Tween.to(node, { scaleY: 0 }, time, null, Laya.Handler.create(this, function () {
                    Laya.Tween.to(node, { scaleY: 1 }, time, null, Laya.Handler.create(this, function () {
                        Laya.Tween.to(node, { scaleY: 0 }, time, null, Laya.Handler.create(this, function () {
                            Laya.Tween.to(node, { scaleY: 1 }, time, null, Laya.Handler.create(this, function () {
                                if (func !== null) {
                                    func();
                                }
                            }), 0);
                        }), 0);
                    }), 0);
                }), 0);
            }
            Animation.upDown_Overturn = upDown_Overturn;
            function leftRight_Overturn(node, time, func) {
                Laya.Tween.to(node, { scaleX: 0 }, time, null, Laya.Handler.create(this, function () {
                    Laya.Tween.to(node, { scaleX: 1 }, time, null, Laya.Handler.create(this, function () {
                        Laya.Tween.to(node, { scaleX: 0 }, time, null, Laya.Handler.create(this, function () {
                            Laya.Tween.to(node, { scaleX: 1 }, time, null, Laya.Handler.create(this, function () {
                            }), 0);
                            if (func !== null) {
                                func();
                            }
                        }), 0);
                    }), 0);
                }), 0);
            }
            Animation.leftRight_Overturn = leftRight_Overturn;
            function leftRight_Shake(node, range, time, delayed, func) {
                Laya.Tween.to(node, { x: node.x - range }, time, null, Laya.Handler.create(this, function () {
                    Laya.Tween.to(node, { x: node.x + range * 2 }, time, null, Laya.Handler.create(this, function () {
                        Laya.Tween.to(node, { x: node.x - range }, time, null, Laya.Handler.create(this, function () {
                            if (func !== null) {
                                func();
                            }
                        }));
                    }));
                }), delayed);
            }
            Animation.leftRight_Shake = leftRight_Shake;
            function upDwon_Shake(node, range, time, delayed, func) {
                Laya.Tween.to(node, { y: node.y + range }, time, null, Laya.Handler.create(this, function () {
                    Laya.Tween.to(node, { y: node.y - range * 2 }, time, null, Laya.Handler.create(this, function () {
                        Laya.Tween.to(node, { y: node.y + range }, time, null, Laya.Handler.create(this, function () {
                            if (func !== null) {
                                func();
                            }
                        }));
                    }));
                }), delayed);
            }
            Animation.upDwon_Shake = upDwon_Shake;
            function fadeOut(node, alpha1, alpha2, time, delayed, func) {
                node.alpha = alpha1;
                Laya.Tween.to(node, { alpha: alpha2 }, time, null, Laya.Handler.create(this, function () {
                    if (func !== null) {
                        func();
                    }
                }), delayed);
            }
            Animation.fadeOut = fadeOut;
            function fadeOut_KickBack(node, alpha1, alpha2, time, delayed, func) {
                node.alpha = alpha1;
                Laya.Tween.to(node, { alpha: alpha2 }, time, null, Laya.Handler.create(this, function () {
                    if (func !== null) {
                        func();
                    }
                }), delayed);
            }
            Animation.fadeOut_KickBack = fadeOut_KickBack;
            function move_FadeOut(node, firstX, firstY, targetX, targetY, time, delayed, func) {
                node.alpha = 0;
                node.x = firstX;
                node.y = firstY;
                Laya.Tween.to(node, { alpha: 1, x: targetX, y: targetY }, time, null, Laya.Handler.create(this, function () {
                    if (func !== null) {
                        func();
                    }
                }), delayed);
            }
            Animation.move_FadeOut = move_FadeOut;
            function move_Fade_Out(node, firstX, firstY, targetX, targetY, time, delayed, func) {
                node.alpha = 1;
                node.x = firstX;
                node.y = firstY;
                Laya.Tween.to(node, { alpha: 0, x: targetX, y: targetY }, time, null, Laya.Handler.create(this, function () {
                    if (func !== null) {
                        func();
                    }
                }), delayed);
            }
            Animation.move_Fade_Out = move_Fade_Out;
            function move_FadeOut_Scale(node, firstX, firstY, targetX, targetY, time, delayed, func) {
                node.alpha = 0;
                node.targetX = 0;
                node.targetY = 0;
                node.x = firstX;
                node.y = firstY;
                Laya.Tween.to(node, { alpha: 1, x: targetX, y: targetY, scaleX: 1, scaleY: 1 }, time, null, Laya.Handler.create(this, function () {
                    if (func !== null) {
                        func();
                    }
                }), delayed);
            }
            Animation.move_FadeOut_Scale = move_FadeOut_Scale;
            function drop_Simple(node, targetY, rotation, time, delayed, func) {
                Laya.Tween.to(node, { y: targetY, rotation: rotation }, time, Laya.Ease.expoIn, Laya.Handler.create(this, function () {
                    if (func !== null) {
                        func();
                    }
                }), delayed);
            }
            Animation.drop_Simple = drop_Simple;
            function drop_KickBack(target, fAlpha, firstY, targetY, extendY, time1, delayed, func) {
                target.alpha = fAlpha;
                target.y = firstY;
                Laya.Tween.to(target, { alpha: 1, y: targetY + extendY }, time1, Laya.Ease.expoIn, Laya.Handler.create(this, function () {
                    Laya.Tween.to(target, { y: targetY - extendY / 2 }, time1 / 2, null, Laya.Handler.create(this, function () {
                        Laya.Tween.to(target, { y: targetY }, time1 / 4, null, Laya.Handler.create(this, function () {
                            if (func !== null) {
                                func();
                            }
                        }), 0);
                    }), 0);
                }), delayed);
            }
            Animation.drop_KickBack = drop_KickBack;
            function drop_Excursion(node, targetY, targetX, rotation, time, delayed, func) {
                Laya.Tween.to(node, { x: node.x + targetX, y: node.y + targetY * 1 / 6 }, time, Laya.Ease.expoIn, Laya.Handler.create(this, function () {
                    Laya.Tween.to(node, { x: node.x + targetX + 50, y: targetY, rotation: rotation }, time, null, Laya.Handler.create(this, function () {
                        if (func !== null) {
                            func();
                        }
                    }), 0);
                }), delayed);
            }
            Animation.drop_Excursion = drop_Excursion;
            function goUp_Simple(node, initialY, initialR, targetY, time, delayed, func) {
                node.y = initialY;
                node.rotation = initialR;
                Laya.Tween.to(node, { y: targetY, rotation: 0 }, time, Laya.Ease.cubicOut, Laya.Handler.create(this, function () {
                    if (func !== null) {
                        func();
                    }
                }), delayed);
            }
            Animation.goUp_Simple = goUp_Simple;
            function cardRotateX_TowFace(node, arr, func1, time, delayed, func2) {
                Laya.Tween.to(node, { scaleX: 0 }, time, null, Laya.Handler.create(this, function () {
                    if (arr) {
                        for (let i = 0; i < arr.length; i++) {
                            let child = node.getChildByName(arr[i]);
                            if (child !== null) {
                                child['alpha'] = 0;
                            }
                        }
                    }
                    if (func1 !== null) {
                        func1();
                    }
                    Laya.Tween.to(node, { scaleX: 1 }, time * 0.9, null, Laya.Handler.create(this, function () {
                        Laya.Tween.to(node, { scaleX: 0 }, time * 0.8, null, Laya.Handler.create(this, function () {
                            if (arr) {
                                for (let i = 0; i < arr.length; i++) {
                                    let child = node.getChildByName(arr[i]);
                                    if (child !== null) {
                                        child['alpha'] = 1;
                                    }
                                }
                            }
                            Laya.Tween.to(node, { scaleX: 1 }, time * 0.7, null, Laya.Handler.create(this, function () {
                                if (func2 !== null) {
                                    func2();
                                }
                            }), 0);
                        }), 0);
                    }), 0);
                }), delayed);
            }
            Animation.cardRotateX_TowFace = cardRotateX_TowFace;
            function cardRotateX_OneFace(node, func1, time, delayed, func2) {
                Laya.Tween.to(node, { scaleX: 0 }, time, null, Laya.Handler.create(this, function () {
                    if (func1 !== null) {
                        func1();
                    }
                    Laya.Tween.to(node, { scaleX: 1 }, time, null, Laya.Handler.create(this, function () {
                        if (func2 !== null) {
                            func2();
                        }
                    }), 0);
                }), delayed);
            }
            Animation.cardRotateX_OneFace = cardRotateX_OneFace;
            function cardRotateY_TowFace(node, arr, func1, time, delayed, func2) {
                Laya.Tween.to(node, { scaleY: 0 }, time, null, Laya.Handler.create(this, function () {
                    if (arr) {
                        for (let i = 0; i < arr.length; i++) {
                            let child = node.getChildByName(arr[i]);
                            if (child !== null) {
                                child['alpha'] = 0;
                            }
                        }
                    }
                    if (func1 !== null) {
                        func1();
                    }
                    Laya.Tween.to(node, { scaleY: 1 }, time, null, Laya.Handler.create(this, function () {
                        Laya.Tween.to(node, { scaleY: 0 }, time, null, Laya.Handler.create(this, function () {
                            Laya.Tween.to(node, { scaleY: 1 }, time * 1 / 2, null, Laya.Handler.create(this, function () {
                                if (arr) {
                                    for (let i = 0; i < arr.length; i++) {
                                        let child = node.getChildByName(arr[i]);
                                        if (child !== null) {
                                            child['alpha'] = 1;
                                        }
                                    }
                                }
                                if (func2 !== null) {
                                    func2();
                                }
                            }), 0);
                        }), 0);
                    }), 0);
                }), delayed);
            }
            Animation.cardRotateY_TowFace = cardRotateY_TowFace;
            function cardRotateY_OneFace(node, func1, time, delayed, func2) {
                Laya.Tween.to(node, { scaleY: 0 }, time, null, Laya.Handler.create(this, function () {
                    if (func1 !== null) {
                        func1();
                    }
                    Laya.Tween.to(node, { scaleY: 1 }, time, null, Laya.Handler.create(this, function () {
                        if (func2 !== null) {
                            func2();
                        }
                    }), 0);
                }), delayed);
            }
            Animation.cardRotateY_OneFace = cardRotateY_OneFace;
            function move_changeRotate(node, targetX, targetY, per, rotation_pe, time, func) {
                let targetPerX = targetX * per + node.x * (1 - per);
                let targetPerY = targetY * per + node.y * (1 - per);
                Laya.Tween.to(node, { x: targetPerX, y: targetPerY, rotation: 45 }, time, null, Laya.Handler.create(this, function () {
                    Laya.Tween.to(node, { x: targetX, y: targetY, rotation: 0 }, time, null, Laya.Handler.create(this, function () {
                        if (func !== null) {
                            func();
                        }
                    }), 0);
                }), 0);
            }
            Animation.move_changeRotate = move_changeRotate;
            function bombs_Appear(node, firstAlpha, firstScale, scale1, rotation, time1, time2, delayed, audioType, func) {
                node.scale(0, 0);
                node.alpha = firstAlpha;
                Laya.Tween.to(node, { scaleX: scale1, scaleY: scale1, alpha: 1, rotation: rotation }, time1, Laya.Ease.cubicInOut, Laya.Handler.create(this, function () {
                    Laya.Tween.to(node, { scaleX: firstScale, scaleY: firstScale, rotation: 0 }, time2, null, Laya.Handler.create(this, function () {
                        Laya.Tween.to(node, { scaleX: firstScale + (scale1 - firstScale) * 0.2, scaleY: firstScale + (scale1 - firstScale) * 0.2, rotation: 0 }, time2, null, Laya.Handler.create(this, function () {
                            Laya.Tween.to(node, { scaleX: firstScale, scaleY: firstScale, rotation: 0 }, time2, null, Laya.Handler.create(this, function () {
                                if (func !== null) {
                                    func();
                                }
                            }), 0);
                        }), 0);
                    }), 0);
                }), delayed);
            }
            Animation.bombs_Appear = bombs_Appear;
            function bombs_Vanish(node, scale, alpha, rotation, time, delayed, func) {
                Laya.Tween.to(node, { scaleX: scale, scaleY: scale, alpha: alpha, rotation: rotation }, time, Laya.Ease.cubicOut, Laya.Handler.create(this, function () {
                    if (func !== null) {
                        func();
                    }
                }), delayed);
            }
            Animation.bombs_Vanish = bombs_Vanish;
            function swell_shrink(node, firstScale, scale1, time, delayed, func) {
                Laya.Tween.to(node, { scaleX: scale1, scaleY: scale1, alpha: 1, }, time, Laya.Ease.cubicInOut, Laya.Handler.create(this, function () {
                    Laya.Tween.to(node, { scaleX: firstScale, scaleY: firstScale, rotation: 0 }, time, null, Laya.Handler.create(this, function () {
                        Laya.Tween.to(node, { scaleX: firstScale + (scale1 - firstScale) * 0.5, scaleY: firstScale + (scale1 - firstScale) * 0.5, rotation: 0 }, time * 0.5, null, Laya.Handler.create(this, function () {
                            Laya.Tween.to(node, { scaleX: firstScale, scaleY: firstScale, rotation: 0 }, time, null, Laya.Handler.create(this, function () {
                                if (func !== null) {
                                    func();
                                }
                            }), 0);
                        }), 0);
                    }), 0);
                }), delayed);
            }
            Animation.swell_shrink = swell_shrink;
            function move_Simple(node, firstX, firstY, targetX, targetY, time, delayed, func) {
                node.x = firstX;
                node.y = firstY;
                Laya.Tween.to(node, { x: targetX, y: targetY }, time, null, Laya.Handler.create(this, function () {
                    if (func !== null) {
                        func();
                    }
                }), delayed);
            }
            Animation.move_Simple = move_Simple;
            function move_Simple_01(node, firstX, firstY, targetX, targetY, time, delayed, func) {
                node.x = firstX;
                node.y = firstY;
                Laya.Tween.to(node, { x: targetX, y: targetY }, time, Laya.Ease.cubicInOut, Laya.Handler.create(this, function () {
                    if (func !== null) {
                        func();
                    }
                }), delayed);
            }
            Animation.move_Simple_01 = move_Simple_01;
            function move_Deform_X(node, firstX, firstR, targetX, scaleX, scaleY, time, delayed, func) {
                node.alpha = 0;
                node.x = firstX;
                node.rotation = firstR;
                Laya.Tween.to(node, { x: targetX, scaleX: 1 + scaleX, scaleY: 1 + scaleY, rotation: firstR / 3, alpha: 1 }, time, null, Laya.Handler.create(this, function () {
                    Laya.Tween.to(node, { scaleX: 1, scaleY: 1, rotation: 0 }, time, null, Laya.Handler.create(this, function () {
                        if (func !== null) {
                            func();
                        }
                    }), 0);
                }), delayed);
            }
            Animation.move_Deform_X = move_Deform_X;
            function move_Deform_Y(target, firstY, firstR, targeY, scaleX, scaleY, time, delayed, func) {
                target.alpha = 0;
                if (firstY) {
                    target.y = firstY;
                }
                target.rotation = firstR;
                Laya.Tween.to(target, { y: targeY, scaleX: 1 + scaleX, scaleY: 1 + scaleY, rotation: firstR / 3, alpha: 1 }, time, null, Laya.Handler.create(this, function () {
                    Laya.Tween.to(target, { scaleX: 1, scaleY: 1, rotation: 0 }, time, null, Laya.Handler.create(this, function () {
                        if (func !== null) {
                            func();
                        }
                    }), 0);
                }), delayed);
            }
            Animation.move_Deform_Y = move_Deform_Y;
            function blink_FadeOut(target, minAlpha, maXalpha, time, delayed, func) {
                target.alpha = minAlpha;
                Laya.Tween.to(target, { alpha: maXalpha }, time, null, Laya.Handler.create(this, function () {
                    Laya.Tween.to(target, { alpha: minAlpha }, time, null, Laya.Handler.create(this, function () {
                        if (func !== null) {
                            func();
                        }
                    }), 0);
                }), delayed);
            }
            Animation.blink_FadeOut = blink_FadeOut;
            function HintAni_01(target, upNum, time1, stopTime, downNum, time2, func) {
                target.alpha = 0;
                Laya.Tween.to(target, { alpha: 1, y: target.y - upNum }, time1, null, Laya.Handler.create(this, function () {
                    Laya.Tween.to(target, { y: target.y - 15 }, stopTime, null, Laya.Handler.create(this, function () {
                        Laya.Tween.to(target, { alpha: 0, y: target.y + upNum + downNum }, time2, null, Laya.Handler.create(this, function () {
                            if (func !== null) {
                                func();
                            }
                        }), 0);
                    }), 0);
                }), 0);
            }
            Animation.HintAni_01 = HintAni_01;
            function rotate_Magnify_KickBack(node, eAngle, eScale, time1, time2, delayed1, delayed2, func) {
                node.alpha = 0;
                node.scaleX = 0;
                node.scaleY = 0;
                Laya.Tween.to(node, { alpha: 1, rotation: 360 + eAngle, scaleX: 1 + eScale, scaleY: 1 + eScale }, time1, null, Laya.Handler.create(this, function () {
                    Laya.Tween.to(node, { rotation: 360 - eAngle / 2, scaleX: 1 + eScale / 2, scaleY: 1 + eScale / 2 }, time2, null, Laya.Handler.create(this, function () {
                        Laya.Tween.to(node, { rotation: 360 + eAngle / 3, scaleX: 1 + eScale / 5, scaleY: 1 + eScale / 5 }, time2, null, Laya.Handler.create(this, function () {
                            Laya.Tween.to(node, { rotation: 360, scaleX: 1, scaleY: 1 }, time2, null, Laya.Handler.create(this, function () {
                                node.rotation = 0;
                                if (func !== null) {
                                    func();
                                }
                            }), 0);
                        }), delayed2);
                    }), 0);
                }), delayed1);
            }
            Animation.rotate_Magnify_KickBack = rotate_Magnify_KickBack;
        })(Animation = lwg.Animation || (lwg.Animation = {}));
        let PalyAudio;
        (function (PalyAudio) {
            function playSound(url, number) {
                Laya.SoundManager.playSound(url, number, Laya.Handler.create(this, function () { }));
            }
            PalyAudio.playSound = playSound;
            function playMusic(url, number, deley) {
                Laya.SoundManager.playMusic(url, number, Laya.Handler.create(this, function () { }), deley);
            }
            PalyAudio.playMusic = playMusic;
            function stopMusic() {
                Laya.SoundManager.stopMusic();
            }
            PalyAudio.stopMusic = stopMusic;
        })(PalyAudio = lwg.PalyAudio || (lwg.PalyAudio = {}));
        let Tools;
        (function (Tools) {
            function drawPieMask(parent, startAngle, endAngle) {
                parent.cacheAs = "bitmap";
                let drawPieSpt = new Laya.Sprite();
                drawPieSpt.blendMode = "destination-out";
                parent.addChild(drawPieSpt);
                let drawPie = drawPieSpt.graphics.drawPie(parent.width / 2, parent.height / 2, parent.width / 2 + 10, startAngle, endAngle, "#000000");
                return drawPie;
            }
            Tools.drawPieMask = drawPieMask;
            function transitionScreenPointfor3D(v3, camera) {
                let ScreenV3 = new Laya.Vector3();
                camera.viewport.project(v3, camera.projectionViewMatrix, ScreenV3);
                let point = new Laya.Vector2();
                point.x = ScreenV3.x;
                point.y = ScreenV3.y;
                return point;
            }
            Tools.transitionScreenPointfor3D = transitionScreenPointfor3D;
            function random(n, m) {
                m = m || 10;
                const c = m - n + 1;
                return Math.floor(Math.random() * c + n);
            }
            Tools.random = random;
            function getRandomArrayElements(arr, count) {
                var shuffled = arr.slice(0), i = arr.length, min = i - count, temp, index;
                while (i-- > min) {
                    index = Math.floor((i + 1) * Math.random());
                    temp = shuffled[index];
                    shuffled[index] = shuffled[i];
                    shuffled[i] = temp;
                }
                return shuffled.slice(min);
            }
            Tools.getRandomArrayElements = getRandomArrayElements;
            function getArrayDifElements(arr, count) {
                const result = [];
                let i = 0;
                for (i; i < count; i++) {
                    const temp = getDiffEle(arr.slice(), result, i);
                    result.push(temp);
                }
                return result;
            }
            Tools.getArrayDifElements = getArrayDifElements;
            function getDiffEle(arr, result, place) {
                let indexArr = [];
                let i = 0;
                for (i; i < arr.length - place; i++) {
                    indexArr.push(i);
                }
                const ranIndex = Math.floor(Math.random() * indexArr.length);
                if (result.indexOf(arr[ranIndex]) === -1) {
                    const backNum = arr[ranIndex];
                    arr[ranIndex] = arr[indexArr.length - 1];
                    return backNum;
                }
                else {
                    arr.splice(ranIndex, 1);
                    return getDiffEle(arr, result, place);
                }
            }
            Tools.getDiffEle = getDiffEle;
            Tools.roleDragCan = false;
            function copydata(obj) {
                const ret = {};
                Object.getOwnPropertyNames(obj).forEach(name => {
                    ret[name] = obj[name];
                });
                return ret;
            }
            Tools.copydata = copydata;
            function fillArray(value, len) {
                var arr = [];
                for (var i = 0; i < len; i++) {
                    arr.push(value);
                }
                return arr;
            }
            Tools.fillArray = fillArray;
            function speedByAngle(angle, XY) {
                if (angle % 90 === 0 || !angle) {
                    console.error("计算的角度异常,需要查看：", angle);
                    return;
                }
                let speedXY = { x: 0, y: 0 };
                speedXY.y = XY.y;
                speedXY.x = speedXY.y / Math.tan(angle * Math.PI / 180);
                return speedXY;
            }
            Tools.speedByAngle = speedByAngle;
            function speedXYByAngle(angle, speed) {
                const speedXY = { x: 0, y: 0 };
                speedXY.x = speed * Math.cos(angle * Math.PI / 180);
                speedXY.y = speed * Math.sin(angle * Math.PI / 180);
                return speedXY;
            }
            Tools.speedXYByAngle = speedXYByAngle;
            function speedLabelByAngle(angle, speed, speedBate) {
                const speedXY = { x: 0, y: 0 };
                const selfAngle = angle;
                const defaultSpeed = speed;
                const bate = speedBate || 1;
                if (selfAngle % 90 === 0) {
                    if (selfAngle === 0 || selfAngle === 360) {
                        speedXY.x = Math.abs(defaultSpeed) * bate;
                    }
                    else if (selfAngle === 90) {
                        speedXY.y = Math.abs(defaultSpeed) * bate;
                    }
                    else if (selfAngle === 180) {
                        speedXY.x = -Math.abs(defaultSpeed) * bate;
                    }
                    else {
                        speedXY.y = -Math.abs(defaultSpeed) * bate;
                    }
                }
                else {
                    const tempXY = Tools.speedXYByAngle(selfAngle, defaultSpeed);
                    speedXY.x = tempXY.x;
                    speedXY.y = tempXY.y;
                    if (selfAngle > 0 && selfAngle < 180) {
                        speedXY.y = Math.abs(speedXY.y) * bate;
                    }
                    else {
                        speedXY.y = -Math.abs(speedXY.y) * bate;
                    }
                    if (selfAngle > 90 && selfAngle < 270) {
                        speedXY.x = -Math.abs(speedXY.x) * bate;
                    }
                    else {
                        speedXY.x = Math.abs(speedXY.x) * bate;
                    }
                }
                return speedXY;
            }
            Tools.speedLabelByAngle = speedLabelByAngle;
            function getRad(degree) {
                return degree / 180 * Math.PI;
            }
            Tools.getRad = getRad;
            function getRoundPos(angle, radius, centPos) {
                var center = centPos;
                var radius = radius;
                var hudu = (2 * Math.PI / 360) * angle;
                var X = center.x + Math.sin(hudu) * radius;
                var Y = center.y - Math.cos(hudu) * radius;
                return { x: X, y: Y };
            }
            Tools.getRoundPos = getRoundPos;
            function converteNum(num) {
                if (typeof (num) !== "number") {
                    console.warn("要转化的数字并不为number");
                    return num;
                }
                let backNum;
                if (num < 1000) {
                    backNum = "" + num;
                }
                else if (num < 1000000) {
                    backNum = "" + (num / 1000).toFixed(1) + "k";
                }
                else if (num < 10e8) {
                    backNum = "" + (num / 1000000).toFixed(1) + "m";
                }
                else {
                    backNum = "" + num;
                }
                return backNum;
            }
            Tools.converteNum = converteNum;
        })(Tools = lwg.Tools || (lwg.Tools = {}));
    })(lwg || (lwg = {}));

    class UIMain_Enemy extends lwg.Admin.Person {
        lwgInit() {
            let num = this.self.getChildByName('Num');
            num.text = (Math.floor(Math.random() * 10) + 1).toString();
        }
        lwgOnUpdate() {
            this.self.y += 1;
            if (this.self.y >= this.selfScene['Protagonist'].y) {
                this.self.removeSelf();
            }
        }
    }

    class UIMain_Protagonist extends lwg.Admin.Person {
        constructor() {
            super(...arguments);
            this.timer = 0;
        }
        lwgInit() {
            console.log('我是主角！');
            this.timer = 0;
        }
        lwgOnUpdate() {
            if (lwg.Global._gameStart) {
                this.timer++;
                if (this.timer % 30 === 0) {
                    this.selfScene[lwg.Admin.SceneName.UIMain].createBullet();
                }
            }
        }
    }

    class UIMain_Bullet extends lwg.Admin.Object {
        lwgOnUpdate() {
            this.self.y -= 10;
            if (this.self.y < -100) {
                this.self.removeSelf();
            }
        }
    }

    class UIMain extends lwg.Admin.Scene {
        constructor() {
            super(...arguments);
            this.timer = 0;
        }
        selfVars() {
        }
        lwgInit() {
            this.timer = 0;
            this.self['Protagonist'].addComponent(UIMain_Protagonist);
            lwg.Global._gameStart = true;
        }
        createEnemy() {
            let enemy;
            enemy = Laya.Pool.getItemByCreateFun('enemy', this.Enemy.create, this.Enemy);
            this.self.addChild(enemy);
            let randX = enemy.width / 2 + (Laya.stage.width - enemy.width / 2 * 2) * Math.random();
            enemy.addComponent(UIMain_Enemy);
            enemy.pos(randX, 0);
            enemy.zOrder = 0;
        }
        createBullet() {
            let bullet;
            bullet = Laya.Pool.getItemByCreateFun('bullet', this.Bullet.create, this.Bullet);
            this.self.addChild(bullet);
            bullet.pos(this.self['Protagonist'].x, this.self['Protagonist'].y);
            bullet.zOrder = 0;
            bullet.addComponent(UIMain_Bullet);
            console.log('创建子弹');
        }
        btnOnClick() {
            lwg.Click.on(lwg.Click.Type.noEffect, null, this.self['BtnYellow'], this, null, null, this.clickUp, null);
            lwg.Click.on(lwg.Click.Type.noEffect, null, this.self['BtnBlue'], this, null, null, this.clickUp, null);
            lwg.Click.on(lwg.Click.Type.noEffect, null, this.self['BtnGreen'], this, null, null, this.clickUp, null);
        }
        clickUp(e) {
            switch (e.currentTarget.name) {
                case 'BtnYellow':
                    this.bulletType = lwg.Enum.bulletType.yellow;
                    this.self['BtnYellow'].scale(1.1, 1.1);
                    this.self['BtnBlue'].scale(1, 1);
                    this.self['BtnGreen'].scale(1, 1);
                    break;
                case 'BtnBlue':
                    this.bulletType = lwg.Enum.bulletType.bule;
                    this.self['BtnYellow'].scale(1, 1);
                    this.self['BtnBlue'].scale(1.1, 1.1);
                    this.self['BtnGreen'].scale(1, 1);
                    break;
                case 'BtnGreen':
                    this.bulletType = lwg.Enum.bulletType.green;
                    this.self['BtnYellow'].scale(1, 1);
                    this.self['BtnBlue'].scale(1, 1);
                    this.self['BtnGreen'].scale(1.1, 1.1);
                    break;
                default:
                    break;
            }
        }
        lwgOnUpdate() {
            if (lwg.Global._gameStart) {
                this.timer++;
                if (this.timer % 60 === 0) {
                    this.createEnemy();
                }
            }
        }
    }

    class UILoding extends lwg.Admin.Scene {
        constructor() {
            super(...arguments);
            this.mianSceneOk = false;
            this.time = 0;
        }
        lwgInit() {
            lwg.Admin._openScene(lwg.Admin.SceneName.UIMain, null, this.self, null);
        }
        dataLoading() {
            Laya.loader.load("Data/HintDec.json", Laya.Handler.create(this, this.levelsOnLoaded), null, Laya.Loader.JSON);
        }
        levelsOnLoaded() {
            lwg.Global._hintDec = Laya.loader.getRes("Data/HintDec.json")["RECORDS"];
            Laya.MouseManager.multiTouchEnabled = false;
        }
        lodeMianScene3D() {
            Laya.Scene3D.load("testScene/LayaScene_GameMain/Conventional/GameMain.ls", Laya.Handler.create(this, this.mianSceneComplete));
        }
        mianSceneComplete(scene) {
            Laya.stage.addChildAt(scene, 0);
            scene.addComponent(UIMain);
            this.Mask.x = 0;
            lwg.Admin._openScene('UIStart', 1, this.self, null);
            this.lodeUserInfo();
            this.mianSceneOk = true;
        }
        lodeUserInfo() {
            let data = lwg.LocalStorage.getData();
            if (data) {
                lwg.Global._gameLevel = data._gameLevel;
                lwg.Global._goldNum = data._goldNum;
                lwg.Global._execution = data._execution;
                lwg.Global._exemptExTime = data._exemptExTime;
                let d1 = (new Date()).getDate();
                if (d1 !== lwg.Global._exemptExTime) {
                    lwg.Global._exemptEx = true;
                    console.log('今天还有一次免体力进入的机会！');
                }
                else {
                    lwg.Global._exemptEx = false;
                    console.log('今天没有免体力进入的机会！');
                }
                lwg.Global._freeHintTime = data._freeHintTime;
                let d2 = (new Date()).getDate();
                if (d2 !== lwg.Global._freeHintTime) {
                    lwg.Global._freetHint = true;
                    console.log('今天还有一次双击免费提示的机会！');
                }
                else {
                    lwg.Global._freetHint = false;
                    console.log('今天没有双击免费提示的机会！');
                }
            }
        }
        onUpdate() {
        }
    }

    class GameConfig {
        constructor() { }
        static init() {
            var reg = Laya.ClassUtils.regClass;
            reg("script/Game/UILoding.ts", UILoding);
            reg("script/Game/UIMain.ts", UIMain);
        }
    }
    GameConfig.width = 720;
    GameConfig.height = 1280;
    GameConfig.scaleMode = "fixedwidth";
    GameConfig.screenMode = "none";
    GameConfig.alignV = "top";
    GameConfig.alignH = "left";
    GameConfig.startScene = "Scene/UILoding.scene";
    GameConfig.sceneRoot = "";
    GameConfig.debug = false;
    GameConfig.stat = true;
    GameConfig.physicsDebug = true;
    GameConfig.exportSceneToJson = true;
    GameConfig.init();

    class Main {
        constructor() {
            if (window["Laya3D"])
                Laya3D.init(GameConfig.width, GameConfig.height);
            else
                Laya.init(GameConfig.width, GameConfig.height, Laya["WebGL"]);
            Laya["Physics"] && Laya["Physics"].enable();
            Laya["DebugPanel"] && Laya["DebugPanel"].enable();
            Laya.stage.scaleMode = GameConfig.scaleMode;
            Laya.stage.screenMode = GameConfig.screenMode;
            Laya.stage.alignV = GameConfig.alignV;
            Laya.stage.alignH = GameConfig.alignH;
            Laya.URL.exportSceneToJson = GameConfig.exportSceneToJson;
            if (GameConfig.debug || Laya.Utils.getQueryString("debug") == "true")
                Laya.enableDebugPanel();
            if (GameConfig.physicsDebug && Laya["PhysicsDebugDraw"])
                Laya["PhysicsDebugDraw"].enable();
            if (GameConfig.stat)
                Laya.Stat.show();
            Laya.alertGlobalError = true;
            Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
        }
        onVersionLoaded() {
            Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));
        }
        onConfigLoaded() {
            GameConfig.startScene && Laya.Scene.open(GameConfig.startScene);
        }
    }
    new Main();

}());
