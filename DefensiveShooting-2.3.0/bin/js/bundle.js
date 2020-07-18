(function () {
    'use strict';

    var lwg;
    (function (lwg) {
        let Global;
        (function (Global) {
            Global._gameLevel = 1;
            Global._yuanpifu = null;
            Global._gameStart = false;
            Global._execution = 100;
            Global._exemptEx = true;
            Global._hotShare = true;
            Global._freetHint = true;
            Global._CustomsNum = 999;
            Global._stageClick = true;
            Global._openXD = false;
            Global._goldNum = 0;
            Global._elect = true;
            Global._shakeSwitch = true;
            Global._btnDelayed = 2000;
            Global._currentPifu = '01_gongzhu';
            Global._havePifu = ['01_gongzhu'];
            Global._notHavePifuSubXD = [];
            Global._allPifu = ['01_gongzhu', '02_chiji', '03_change', '04_huiguniang', '05_tianshi', '06_xiaohongmao', '07_xiaohuangya', '08_zhenzi', '09_aisha'];
            Global._buyNum = 1;
            Global._watchAdsNum = 0;
            Global._huangpihaozi = false;
            Global._zibiyazi = false;
            Global._kejigongzhu = false;
            Global._haimiangongzhu = false;
            Global._paintedPifu = [];
            Global._pickPaintedNum = 0;
            Global.pingceV = true;
            function _vibratingScreen() {
            }
            Global._vibratingScreen = _vibratingScreen;
            function notHavePifuSubXD() {
                let allArray = [];
                for (let i = 0; i < lwg.Global._allPifu.length; i++) {
                    const element = lwg.Global._allPifu[i];
                    allArray.push(element);
                }
                for (let j = 0; j < allArray.length; j++) {
                    let element1 = allArray[j];
                    for (let k = 0; k < lwg.Global._havePifu.length; k++) {
                        let element2 = lwg.Global._havePifu[k];
                        if (element1 === element2) {
                            allArray.splice(j, 1);
                            j--;
                        }
                    }
                }
                lwg.Global._notHavePifu = allArray;
                for (let k = 0; k < allArray.length; k++) {
                    const element = allArray[k];
                    if (element === '09_aisha') {
                        allArray.splice(k, 1);
                    }
                }
                lwg.Global._notHavePifuSubXD = allArray;
            }
            Global.notHavePifuSubXD = notHavePifuSubXD;
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
                    Click.on(Click.ClickType.largen, null, sp, null, null, null, btnSetUp, null);
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
            function _addGold(number) {
                lwg.Global._goldNum += number;
                let Num = lwg.Global.GoldNumNode.getChildByName('Num');
                Num.value = lwg.Global._goldNum.toString();
                lwg.LocalStorage.addData();
            }
            Global._addGold = _addGold;
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
            function _addExecution(number) {
                lwg.Global._execution += number;
                if (lwg.Global._execution > 15) {
                    lwg.Global._execution = 15;
                }
                let num = lwg.Global.ExecutionNumNode.getChildByName('Num');
                num.value = lwg.Global._execution.toString();
                lwg.LocalStorage.addData();
            }
            Global._addExecution = _addExecution;
            function _createBtnPause(parent) {
                let sp;
                Laya.loader.load('prefab/BtnPause.json', Laya.Handler.create(this, function (prefab) {
                    let _prefab = new Laya.Prefab();
                    _prefab.json = prefab;
                    sp = Laya.Pool.getItemByCreateFun('prefab', _prefab.create, _prefab);
                    parent.addChild(sp);
                    sp.pos(645, 167);
                    sp.zOrder = 0;
                    Global.BtnPauseNode = sp;
                    Global.BtnPauseNode.name = 'BtnPauseNode';
                    Click.on(Click.ClickType.largen, null, sp, null, null, null, btnPauseUp, null);
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
                    sp.pos(645, 293);
                    sp.zOrder = 0;
                    Global.BtnHintNode = sp;
                    Global.BtnHintNode.name = 'BtnHintNode';
                    Click.on(Click.ClickType.largen, null, sp, null, null, null, btnHintUp, null);
                }));
            }
            Global._createBtnHint = _createBtnHint;
            function btnHintUp(event) {
                event.currentTarget.scale(1, 1);
                event.stopPropagation();
                Admin._openScene(Admin.SceneName.UISmallHint, null, null, f => { });
            }
            Global.btnHintUp = btnHintUp;
            function _createBtnAgain(parent) {
                let sp;
                Laya.loader.load('prefab/BtnAgain.json', Laya.Handler.create(this, function (prefab) {
                    let _prefab = new Laya.Prefab();
                    _prefab.json = prefab;
                    sp = Laya.Pool.getItemByCreateFun('prefab', _prefab.create, _prefab);
                    parent.addChild(sp);
                    sp.pos(645, 409);
                    sp.zOrder = 0;
                    Click.on(Click.ClickType.largen, null, sp, null, btnAgainUp, null, null, null);
                    Global.BtnAgainNode = sp;
                }));
            }
            Global._createBtnAgain = _createBtnAgain;
            function btnAgainUp(event) {
                event.stopPropagation();
                event.currentTarget.scale(1, 1);
                if (!Global._gameStart) {
                    return;
                }
                Global.refreshNum++;
                Admin._refreshScene();
            }
            Global.btnAgainUp = btnAgainUp;
            function _createP201_01(parent) {
                let sp;
                Laya.loader.load('prefab/P201.json', Laya.Handler.create(this, function (prefab) {
                    let _prefab = new Laya.Prefab();
                    _prefab.json = prefab;
                    sp = Laya.Pool.getItemByCreateFun('P201', _prefab.create, _prefab);
                    parent.addChild(sp);
                    sp.pos(80, 290);
                    sp.zOrder = 65;
                    Global.P201_01Node = sp;
                }));
            }
            Global._createP201_01 = _createP201_01;
            function _createStimulateDec(parent) {
                let sp;
                Laya.loader.load('prefab/StimulateDec.json', Laya.Handler.create(this, function (prefab) {
                    let _prefab = new Laya.Prefab();
                    _prefab.json = prefab;
                    sp = Laya.Pool.getItemByCreateFun('StimulateDec', _prefab.create, _prefab);
                    let dec = sp.getChildByName('Dec');
                    let num = lwg.Admin.openCustomName.substring(lwg.Admin.openCustomName.length - 3, lwg.Admin.openCustomName.length);
                    dec.text = lwg.Global._stimulateDec[Number(num) - 1]['dec'];
                    parent.addChild(sp);
                    sp.pos(35, 150);
                    sp.zOrder = 65;
                    Global.StimulateDecNode = sp;
                }));
            }
            Global._createStimulateDec = _createStimulateDec;
            function _createHint_01(type) {
                let sp;
                Laya.loader.load('prefab/HintPre_01.json', Laya.Handler.create(this, function (prefab) {
                    let _prefab = new Laya.Prefab();
                    _prefab.json = prefab;
                    sp = Laya.Pool.getItemByCreateFun('prefab', _prefab.create, _prefab);
                    Laya.stage.addChild(sp);
                    sp.pos(Laya.stage.width / 2, Laya.stage.height / 2);
                    let dec = sp.getChildByName('dec');
                    dec.text = Enum.HintDec[type];
                    sp.zOrder = 100;
                    dec.alpha = 0;
                    Animation.scale_Alpha(sp, 0, 1, 0, 1, 1, 1, 200, 0, f => {
                        Animation.fadeOut(dec, 0, 1, 150, 0, f => {
                            Animation.fadeOut(dec, 1, 0, 200, 800, f => {
                                Animation.scale_Alpha(sp, 1, 1, 1, 1, 0, 0, 200, 0, f => {
                                    sp.removeSelf();
                                });
                            });
                        });
                    });
                }));
            }
            Global._createHint_01 = _createHint_01;
            function _createHint_02(type) {
                let sp;
                Laya.loader.load('prefab/HintPre_02.json', Laya.Handler.create(this, function (prefab) {
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
            Global._createHint_02 = _createHint_02;
            function _createHint_InPut(input) {
                let sp;
                Laya.loader.load('prefab/HintPre_01.json', Laya.Handler.create(this, function (prefab) {
                    let _prefab = new Laya.Prefab();
                    _prefab.json = prefab;
                    sp = Laya.Pool.getItemByCreateFun('prefab', _prefab.create, _prefab);
                    Laya.stage.addChild(sp);
                    sp.pos(Laya.stage.width / 2, Laya.stage.height / 2);
                    let dec = sp.getChildByName('dec');
                    dec.text = input;
                    sp.zOrder = 100;
                    dec.alpha = 0;
                    Animation.scale_Alpha(sp, 0, 1, 0, 1, 1, 1, 200, 0, f => {
                        Animation.fadeOut(dec, 0, 1, 150, 0, f => {
                            Animation.fadeOut(dec, 1, 0, 200, 1500, f => {
                                Animation.scale_Alpha(sp, 1, 1, 1, 1, 0, 0, 200, 0, f => {
                                    sp.removeSelf();
                                });
                            });
                        });
                    });
                }));
            }
            Global._createHint_InPut = _createHint_InPut;
            function createConsumeEx(subEx) {
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
                    '_hotShareTime': lwg.Global._hotShareTime,
                    '_addExDate': lwg.Global._addExDate,
                    '_addExHours': lwg.Global._addExHours,
                    '_addMinutes': lwg.Global._addMinutes,
                    '_buyNum': lwg.Global._buyNum,
                    '_currentPifu': lwg.Global._currentPifu,
                    '_havePifu': lwg.Global._havePifu,
                    '_watchAdsNum': lwg.Global._watchAdsNum,
                    '_huangpihaozi': lwg.Global._huangpihaozi,
                    '_zibiyazi': lwg.Global._zibiyazi,
                    '_kejigongzhu': lwg.Global._kejigongzhu,
                    '_pickPaintedNum': lwg.Global._pickPaintedNum,
                    '_haimiangongzhu': lwg.Global._haimiangongzhu
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
                    lwg.Global._hotShareTime = null;
                    lwg.Global._addExDate = (new Date).getDate();
                    lwg.Global._addExHours = (new Date).getHours();
                    lwg.Global._addMinutes = (new Date).getMinutes();
                    lwg.Global._buyNum = 1;
                    lwg.Global._currentPifu = Enum.PifuAllName[0];
                    lwg.Global._havePifu = ['01_gongzhu'];
                    lwg.Global._watchAdsNum = 0;
                    lwg.Global._huangpihaozi = false;
                    lwg.Global._zibiyazi = false;
                    lwg.Global._kejigongzhu = false;
                    lwg.Global._haimiangongzhu = false;
                    lwg.Global._pickPaintedNum = 0;
                    return null;
                }
            }
            LocalStorage.getData = getData;
        })(LocalStorage = lwg.LocalStorage || (lwg.LocalStorage = {}));
        let EventAdmin;
        (function (EventAdmin) {
            let EventType;
            (function (EventType) {
                EventType["btnOnClick"] = "btnOnClick";
                EventType["aniComplete"] = "aniComplete";
            })(EventType = EventAdmin.EventType || (EventAdmin.EventType = {}));
            class EventClass {
                constructor() {
                    this.dispatcher = new Laya.EventDispatcher();
                }
                static reg(type, caller, listener) {
                    if (!caller) {
                        console.error("caller must exist!");
                    }
                    EventClass.Self.dispatcher.on(type.toString(), caller, listener);
                }
                static notify(type, args) {
                    EventClass.Self.dispatcher.event(type.toString(), args);
                }
                static off(type, caller, listener) {
                    EventClass.Self.dispatcher.off(type.toString(), caller, listener);
                }
                static offAll(type) {
                    EventClass.Self.dispatcher.offAll(type.toString());
                }
                static offCaller(caller) {
                    EventClass.Self.dispatcher.offAllCaller(caller);
                }
            }
            EventClass.Self = new EventClass();
            EventAdmin.EventClass = EventClass;
        })(EventAdmin = lwg.EventAdmin || (lwg.EventAdmin = {}));
        let Admin;
        (function (Admin) {
            Admin._sceneControl = {};
            Admin._gameStart = false;
            let SceneName;
            (function (SceneName) {
                SceneName["UILoding"] = "UILoding";
                SceneName["UIStart"] = "UIStart";
                SceneName["UIMain"] = "UIMain";
                SceneName["GameMain3D"] = "GameMain3D";
                SceneName["UIVictory"] = "UIVictory";
                SceneName["UIDefeated"] = "UIDefeated";
                SceneName["UIExecutionHint"] = "UIExecutionHint";
                SceneName["UIPassHint"] = "UIPassHint";
                SceneName["UISet"] = "UISet";
                SceneName["UIPifu"] = "UIPifu";
                SceneName["UIPuase"] = "UIPuase";
                SceneName["UIShare"] = "UIShare";
                SceneName["UISmallHint"] = "UISmallHint";
                SceneName["UIXDpifu"] = "UIXDpifu";
                SceneName["UIPifuTry"] = "UIPifuTry";
                SceneName["UIRedeem"] = "UIRedeem";
                SceneName["UIAnchorXD"] = "UIAnchorXD";
                SceneName["UITurntable"] = "UITurntable";
                SceneName["UICaiDanQiang"] = "UICaiDanQiang";
                SceneName["UICaidanPifu"] = "UICaidanPifu";
                SceneName["UIOperation"] = "UIOperation";
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
                    if (zOder) {
                        Laya.stage.addChildAt(scene, zOder);
                    }
                    else {
                        Laya.stage.addChild(scene);
                    }
                    scene.name = openName;
                    Admin._sceneControl[openName] = scene;
                    let background = scene.getChildByName('background');
                    if (background) {
                        if (openName.substring(0, 6) === 'UIMain') {
                            background.width = null;
                            background.height = null;
                            background.x = 360;
                            background.y = 640;
                        }
                        else {
                            background.width = Laya.stage.width;
                            background.height = Laya.stage.height;
                        }
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
                Admin.openLevelNum = lwg.Global._gameLevel;
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
                Admin.openLevelNum = num;
                if (num > 30) {
                    num = num - 30;
                }
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
                _openScene(sceneName, null, null, f => {
                    lwg.Global._gameStart = true;
                    if (lwg.Global._yuanpifu !== null) {
                        Global._currentPifu = lwg.Global._yuanpifu;
                        lwg.Global._yuanpifu = null;
                    }
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
            function _nextCustomScene(subEx) {
                if (subEx > 0) {
                    Global._execution -= subEx;
                    let num = Global.ExecutionNumNode.getChildByName('Num');
                    num.value = Global._execution.toString();
                    Global._createHint_01(lwg.Enum.HintType.consumeEx);
                    Global.createConsumeEx(subEx);
                }
                if (Admin.openLevelNum >= Global._gameLevel) {
                    Admin._closeCustomScene();
                    Global._gameLevel++;
                    Admin._openGLCustoms();
                }
                else {
                    Admin._closeCustomScene();
                    Admin.openLevelNum++;
                    Admin._openLevelNumCustom();
                }
                LocalStorage.addData();
            }
            Admin._nextCustomScene = _nextCustomScene;
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
            class Scene extends Laya.Script {
                constructor() {
                    super();
                    this.aniTime = 0;
                    this.aniDelayde = 0;
                }
                onAwake() {
                    this.self = this.owner;
                    this.calssName = this['__proto__']['constructor'].name;
                    this.gameState(this.calssName);
                    this.selfNode();
                    this.variateInit();
                    this.adaptive();
                }
                onEnable() {
                    this.self[this.calssName] = this;
                    this.lwgOnEnable();
                    this.btnAndOpenAni();
                }
                selfNode() {
                }
                variateInit() {
                }
                gameState(calssName) {
                    switch (calssName) {
                        case SceneName.UIStart:
                            Admin._gameState = GameState.GameStart;
                            break;
                        case SceneName.UIMain:
                            Admin._gameState = GameState.Play;
                            break;
                        case SceneName.UIDefeated:
                            Admin._gameState = GameState.Defeated;
                            break;
                        case SceneName.UIVictory:
                            Admin._gameState = GameState.Victory;
                            break;
                        default:
                            break;
                    }
                }
                lwgOnEnable() {
                }
                btnAndOpenAni() {
                    let time = this.openAni();
                    if (time) {
                        Laya.timer.once(time, this, f => {
                            this.btnOnClick();
                        });
                    }
                    else {
                        this.btnOnClick();
                    }
                }
                btnOnClick() {
                }
                openAni() {
                    return this.aniTime;
                }
                adaptive() {
                }
                vanishAni() {
                    return 0;
                }
                onUpdate() {
                    this.lwgOnUpdate();
                }
                lwgOnUpdate() {
                }
                onDisable() {
                    this.lwgDisable();
                    Laya.timer.clearAll(this);
                }
                lwgDisable() {
                }
            }
            Admin.Scene = Scene;
            class Person extends Laya.Script {
                constructor() {
                    super();
                }
                onAwake() {
                }
                lwgOnAwake() {
                }
                onEnable() {
                    this.self = this.owner;
                    this.selfScene = this.self.scene;
                    this.rig = this.self.getComponent(Laya.RigidBody);
                    let calssName = this['__proto__']['constructor'].name;
                    this.self[calssName] = this;
                    this.lwgOnEnable();
                }
                lwgOnEnable() {
                    console.log('父类的初始化！');
                }
            }
            Admin.Person = Person;
            class Object extends Laya.Script {
                constructor() {
                    super();
                }
                onAwake() {
                    this.self = this.owner;
                    this.selfScene = this.self.scene;
                    let calssName = this['__proto__']['constructor'].name;
                    this.self[calssName] = this;
                    this.rig = this.self.getComponent(Laya.RigidBody);
                    this.selfNode();
                }
                selfNode() {
                }
                onEnable() {
                    this.lwgOnEnable();
                    this.btnOnClick();
                }
                lwgOnEnable() {
                    console.log('父类的初始化！');
                }
                btnOnClick() {
                }
                onUpdate() {
                    this.lwgOnUpdate();
                }
                lwgOnUpdate() {
                }
                onDisable() {
                    this.lwgDisable();
                    Laya.Tween.clearTween(this);
                }
                lwgDisable() {
                }
            }
            Admin.Object = Object;
        })(Admin = lwg.Admin || (lwg.Admin = {}));
        let Effects;
        (function (Effects) {
            let SkinUrl;
            (function (SkinUrl) {
                SkinUrl[SkinUrl["Effects/cir_white.png"] = 0] = "Effects/cir_white.png";
                SkinUrl[SkinUrl["Effects/cir_black.png"] = 1] = "Effects/cir_black.png";
                SkinUrl[SkinUrl["Effects/cir_blue.png"] = 2] = "Effects/cir_blue.png";
                SkinUrl[SkinUrl["Effects/cir_bluish.png"] = 3] = "Effects/cir_bluish.png";
                SkinUrl[SkinUrl["Effects/cir_cyan.png"] = 4] = "Effects/cir_cyan.png";
                SkinUrl[SkinUrl["Effects/cir_grass.png"] = 5] = "Effects/cir_grass.png";
                SkinUrl[SkinUrl["Effects/cir_green.png"] = 6] = "Effects/cir_green.png";
                SkinUrl[SkinUrl["Effects/cir_orange.png"] = 7] = "Effects/cir_orange.png";
                SkinUrl[SkinUrl["Effects/cir_pink.png"] = 8] = "Effects/cir_pink.png";
                SkinUrl[SkinUrl["Effects/cir_purple.png"] = 9] = "Effects/cir_purple.png";
                SkinUrl[SkinUrl["Effects/cir_red.png"] = 10] = "Effects/cir_red.png";
                SkinUrl[SkinUrl["Effects/cir_yellow.png"] = 11] = "Effects/cir_yellow.png";
                SkinUrl[SkinUrl["Effects/star_black.png"] = 12] = "Effects/star_black.png";
                SkinUrl[SkinUrl["Effects/star_blue.png"] = 13] = "Effects/star_blue.png";
                SkinUrl[SkinUrl["Effects/star_bluish.png"] = 14] = "Effects/star_bluish.png";
                SkinUrl[SkinUrl["Effects/star_cyan.png"] = 15] = "Effects/star_cyan.png";
                SkinUrl[SkinUrl["Effects/star_grass.png"] = 16] = "Effects/star_grass.png";
                SkinUrl[SkinUrl["Effects/star_green.png"] = 17] = "Effects/star_green.png";
                SkinUrl[SkinUrl["Effects/star_orange.png"] = 18] = "Effects/star_orange.png";
                SkinUrl[SkinUrl["Effects/star_pink.png"] = 19] = "Effects/star_pink.png";
                SkinUrl[SkinUrl["Effects/star_purple.png"] = 20] = "Effects/star_purple.png";
                SkinUrl[SkinUrl["Effects/star_red.png"] = 21] = "Effects/star_red.png";
                SkinUrl[SkinUrl["Effects/star_white.png"] = 22] = "Effects/star_white.png";
                SkinUrl[SkinUrl["Effects/star_yellow.png"] = 23] = "Effects/star_yellow.png";
                SkinUrl[SkinUrl["Effects/icon_biggold.png"] = 24] = "Effects/icon_biggold.png";
            })(SkinUrl = Effects.SkinUrl || (Effects.SkinUrl = {}));
            class EffectsBase extends Laya.Script {
                onAwake() {
                    this.initProperty();
                }
                onEnable() {
                    this.self = this.owner;
                    this.selfScene = this.self.scene;
                    let calssName = this['__proto__']['constructor'].name;
                    this.self[calssName] = this;
                    this.self.pivotX = this.self.width / 2;
                    this.self.pivotY = this.self.height / 2;
                    this.timer = 0;
                    this.lwgOnEnable();
                    this.propertyAssign();
                }
                lwgOnEnable() {
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
            function createCommonExplosion(parent, quantity, x, y, style, speed, continueTime) {
                for (let index = 0; index < quantity; index++) {
                    let ele = Laya.Pool.getItemByClass('ele', Laya.Image);
                    ele.name = 'ele';
                    let num;
                    if (style === 'star') {
                        num = 12 + Math.floor(Math.random() * 12);
                    }
                    else if (style === 'dot') {
                        num = Math.floor(Math.random() * 12);
                    }
                    ele.skin = SkinUrl[num];
                    ele.alpha = 1;
                    parent.addChild(ele);
                    ele.pos(x, y);
                    let scirpt = ele.getComponent(commonExplosion);
                    if (!scirpt) {
                        scirpt = ele.addComponent(commonExplosion);
                    }
                    scirpt.startSpeed = 5 * Math.random() + speed;
                    scirpt.continueTime = 8 * Math.random() + continueTime;
                }
            }
            Effects.createCommonExplosion = createCommonExplosion;
            class commonExplosion extends lwg.Effects.EffectsBase {
                initProperty() {
                    this.startAngle = 360 * Math.random();
                    this.startSpeed = 5 * Math.random() + 8;
                    this.startScale = 0.4 + Math.random() * 0.6;
                    this.accelerated = 0.1;
                    this.continueTime = 8 + Math.random() * 10;
                }
                moveRules() {
                    this.timer++;
                    if (this.timer >= this.continueTime / 2) {
                        this.self.alpha -= 0.1;
                    }
                    if (this.timer >= this.continueTime) {
                        this.self.removeSelf();
                    }
                    else {
                        this.commonSpeedXYByAngle(this.startAngle, this.startSpeed + this.accelerated);
                    }
                }
            }
            Effects.commonExplosion = commonExplosion;
            function createAddGold(parent, index, x, y, targetX, targetY, func) {
                let ele = Laya.Pool.getItemByClass('addGold', Laya.Image);
                ele.name = 'addGold';
                ele.alpha = 1;
                ele.scale(1, 1);
                ele.skin = SkinUrl[24];
                parent.addChild(ele);
                ele.zOrder = 60;
                ele.pos(x, y);
                let scirpt = ele.getComponent(AddGold);
                if (!scirpt) {
                    ele.addComponent(AddGold);
                    let scirpt1 = ele.getComponent(AddGold);
                    scirpt1.line = index;
                    scirpt1.targetX = targetX;
                    scirpt1.targetY = targetY;
                    scirpt1.timer -= index * 3;
                    scirpt1.moveSwitch = true;
                    scirpt1.func = func;
                }
                else {
                    scirpt.line = index;
                    scirpt.timer -= index * 3;
                    scirpt.targetX = targetX;
                    scirpt.targetY = targetY;
                    scirpt.moveSwitch = true;
                    scirpt.func = func;
                }
            }
            Effects.createAddGold = createAddGold;
            class AddGold extends lwg.Effects.EffectsBase {
                initProperty() {
                }
                moveRules() {
                    if (this.moveSwitch) {
                        this.timer++;
                        if (this.timer > 0) {
                            lwg.Animation.move_Scale(this.self, 1, this.self.x, this.self.y, this.targetX, this.targetY, 0.35, 250, 0, f => {
                                this.self.removeSelf();
                                if (this.func !== null) {
                                    this.func();
                                }
                            });
                            this.moveSwitch = false;
                        }
                    }
                }
            }
            Effects.AddGold = AddGold;
            function createFireworks(parent, quantity, x, y) {
                for (let index = 0; index < quantity; index++) {
                    let ele = Laya.Pool.getItemByClass('fireworks', Laya.Image);
                    ele.name = 'fireworks';
                    let num = Math.floor(Math.random() * 12);
                    ele.alpha = 1;
                    ele.skin = SkinUrl[num];
                    parent.addChild(ele);
                    ele.pos(x, y);
                    let scirpt = ele.getComponent(Fireworks);
                    if (!scirpt) {
                        ele.addComponent(Fireworks);
                    }
                }
            }
            Effects.createFireworks = createFireworks;
            class Fireworks extends lwg.Effects.EffectsBase {
                initProperty() {
                    this.startAngle = 360 * Math.random();
                    this.startSpeed = 5 * Math.random() + 5;
                    this.startScale = 0.4 + Math.random() * 0.6;
                    this.accelerated = 0.1;
                    this.continueTime = 200 + Math.random() * 10;
                }
                moveRules() {
                    this.timer++;
                    if (this.timer >= this.continueTime * 3 / 5) {
                        this.self.alpha -= 0.1;
                    }
                    if (this.timer >= this.continueTime) {
                        this.self.removeSelf();
                    }
                    else {
                        this.commonSpeedXYByAngle(this.startAngle, this.startSpeed);
                    }
                    if (this.self.scaleX < 0) {
                        this.self.scaleX += 0.01;
                    }
                    else if (this.self.scaleX >= this.startScale) {
                        this.self.scaleX -= 0.01;
                    }
                }
            }
            Effects.Fireworks = Fireworks;
            function createLeftOrRightJet(parent, direction, quantity, x, y) {
                for (let index = 0; index < quantity; index++) {
                    let ele = Laya.Pool.getItemByClass('Jet', Laya.Image);
                    ele.name = 'Jet';
                    let num = 12 + Math.floor(Math.random() * 11);
                    ele.skin = SkinUrl[num];
                    ele.alpha = 1;
                    parent.addChild(ele);
                    ele.pos(x, y);
                    let scirpt = ele.getComponent(leftOrRightJet);
                    if (!scirpt) {
                        ele.addComponent(leftOrRightJet);
                        let scirpt1 = ele.getComponent(leftOrRightJet);
                        scirpt1.direction = direction;
                        scirpt1.initProperty();
                    }
                    else {
                        scirpt.direction = direction;
                        scirpt.initProperty();
                    }
                }
            }
            Effects.createLeftOrRightJet = createLeftOrRightJet;
            class leftOrRightJet extends lwg.Effects.EffectsBase {
                initProperty() {
                    if (this.direction === 'left') {
                        this.startAngle = 100 * Math.random() - 90 + 45 - 10 - 20;
                    }
                    else if (this.direction === 'right') {
                        this.startAngle = 100 * Math.random() + 90 + 45 + 20;
                    }
                    this.startSpeed = 10 * Math.random() + 3;
                    this.startScale = 0.4 + Math.random() * 0.6;
                    this.accelerated = 0.1;
                    this.continueTime = 300 + Math.random() * 50;
                    this.randomRotate = 1 + Math.random() * 20;
                }
                moveRules() {
                    this.timer++;
                    if (this.timer >= this.continueTime * 3 / 5) {
                        this.self.alpha -= 0.1;
                    }
                    if (this.timer >= this.continueTime) {
                        this.self.removeSelf();
                    }
                    else {
                        this.commonSpeedXYByAngle(this.startAngle, this.startSpeed);
                    }
                    this.self.rotation += this.randomRotate;
                    if (this.self.scaleX < 0) {
                        this.self.scaleX += 0.01;
                    }
                    else if (this.self.scaleX >= this.startScale) {
                        this.self.scaleX -= 0.01;
                    }
                }
            }
            Effects.leftOrRightJet = leftOrRightJet;
        })(Effects = lwg.Effects || (lwg.Effects = {}));
        let Sk;
        (function (Sk) {
            let PifuMatching;
            (function (PifuMatching) {
                PifuMatching["gongzhu"] = "01_gongzhu";
                PifuMatching["chiji"] = "02_chiji";
                PifuMatching["change"] = "03_change";
                PifuMatching["huiguniang"] = "04_huiguniang";
                PifuMatching["tianshi"] = "05_tianshi";
                PifuMatching["xiaohongmao"] = "06_xiaohongmao";
                PifuMatching["xiaohuangya"] = "07_xiaohuangya";
                PifuMatching["zhenzi"] = "08_zhenzi";
                PifuMatching["aisha"] = "09_aisha";
            })(PifuMatching = Sk.PifuMatching || (Sk.PifuMatching = {}));
            let PaintedPifu;
            (function (PaintedPifu) {
                PaintedPifu["daji"] = "P_001_daji";
                PaintedPifu["shizi"] = "P_002_shizi";
                PaintedPifu["pikaqiu"] = "P_003_pikaqiu";
                PaintedPifu["cangshu"] = "P_004_cangshu";
                PaintedPifu["haimianbaobao"] = "P_005_haimianbaobao";
                PaintedPifu["keji"] = "P_006_keji";
                PaintedPifu["kedaya"] = "P_007_kedaya";
            })(PaintedPifu = Sk.PaintedPifu || (Sk.PaintedPifu = {}));
            Sk.gongzhuTem = new Laya.Templet();
            Sk.aishaTem = new Laya.Templet();
            Sk.changeTem = new Laya.Templet();
            Sk.chijiTem = new Laya.Templet();
            Sk.huiguniangTem = new Laya.Templet();
            Sk.tianshiTem = new Laya.Templet();
            Sk.xiaohongmaoTem = new Laya.Templet();
            Sk.xiaohuangyaTem = new Laya.Templet();
            Sk.zhenziTem = new Laya.Templet();
            Sk.kedayaTem = new Laya.Templet();
            Sk.cangshuTem = new Laya.Templet();
            Sk.dajiTem = new Laya.Templet();
            Sk.haimianbaobaoTem = new Laya.Templet();
            Sk.pikaqiuTem = new Laya.Templet();
            Sk.shiziTem = new Laya.Templet();
            Sk.kejiTem = new Laya.Templet();
            Sk.wangziTem = new Laya.Templet();
            Sk.gouTem = new Laya.Templet();
            Sk.qingdi_01Tem = new Laya.Templet();
            Sk.qingdi_02Tem = new Laya.Templet();
            Sk.houmaTem = new Laya.Templet();
            Sk.houziTem = new Laya.Templet();
            function skLoding() {
                createGongzhuTem();
                createAishaTem();
                createChijiTem();
                createChangeTem();
                createHuiguniangTem();
                createTianshiTem();
                createXiaohongmaoTem();
                createXiaohuangyaTem();
                createZhenziTem();
                createCangshuTem();
                createPikaqiuTem();
                createDajiTem();
                createHaimianbaobaoTem();
                createShiziTem();
                createKejiTem();
                createKedayaTem();
                createWangziTem();
                createGouTem();
                createQingdi_01Tem();
                createQingdi_02Tem();
                createHoumaTem();
                createHouziTem();
            }
            Sk.skLoding = skLoding;
            function createGongzhuTem() {
                Sk.gongzhuTem.on(Laya.Event.COMPLETE, this, onCompelet);
                Sk.gongzhuTem.on(Laya.Event.ERROR, this, onError);
                Sk.gongzhuTem.loadAni("SK/gongzhu.sk");
            }
            Sk.createGongzhuTem = createGongzhuTem;
            function createAishaTem() {
                Sk.aishaTem.on(Laya.Event.COMPLETE, this, onCompelet);
                Sk.aishaTem.on(Laya.Event.ERROR, this, onError);
                Sk.aishaTem.loadAni("SK/aisha.sk");
            }
            Sk.createAishaTem = createAishaTem;
            function createChangeTem() {
                Sk.changeTem.on(Laya.Event.COMPLETE, this, onCompelet);
                Sk.changeTem.on(Laya.Event.ERROR, this, onError);
                Sk.changeTem.loadAni("SK/change.sk");
            }
            Sk.createChangeTem = createChangeTem;
            function createChijiTem() {
                Sk.chijiTem.on(Laya.Event.COMPLETE, this, onCompelet);
                Sk.chijiTem.on(Laya.Event.ERROR, this, onError);
                Sk.chijiTem.loadAni("SK/chiji.sk");
            }
            Sk.createChijiTem = createChijiTem;
            function createHuiguniangTem() {
                Sk.huiguniangTem.on(Laya.Event.COMPLETE, this, onCompelet);
                Sk.huiguniangTem.on(Laya.Event.ERROR, this, onError);
                Sk.huiguniangTem.loadAni("SK/huiguniang.sk");
            }
            Sk.createHuiguniangTem = createHuiguniangTem;
            function createTianshiTem() {
                Sk.tianshiTem.on(Laya.Event.COMPLETE, this, onCompelet);
                Sk.tianshiTem.on(Laya.Event.ERROR, this, onError);
                Sk.tianshiTem.loadAni("SK/tianshi.sk");
            }
            Sk.createTianshiTem = createTianshiTem;
            function createXiaohongmaoTem() {
                Sk.xiaohongmaoTem.on(Laya.Event.COMPLETE, this, onCompelet);
                Sk.xiaohongmaoTem.on(Laya.Event.ERROR, this, onError);
                Sk.xiaohongmaoTem.loadAni("SK/xiaohongmao.sk");
            }
            Sk.createXiaohongmaoTem = createXiaohongmaoTem;
            function createXiaohuangyaTem() {
                Sk.xiaohuangyaTem.on(Laya.Event.COMPLETE, this, onCompelet);
                Sk.xiaohuangyaTem.on(Laya.Event.ERROR, this, onError);
                Sk.xiaohuangyaTem.loadAni("SK/xiaohuangya.sk");
            }
            Sk.createXiaohuangyaTem = createXiaohuangyaTem;
            function createZhenziTem() {
                Sk.zhenziTem.on(Laya.Event.COMPLETE, this, onCompelet);
                Sk.zhenziTem.on(Laya.Event.ERROR, this, onError);
                Sk.zhenziTem.loadAni("SK/zhenzi.sk");
            }
            Sk.createZhenziTem = createZhenziTem;
            function createCangshuTem() {
                Sk.cangshuTem.on(Laya.Event.COMPLETE, this, onCompelet);
                Sk.cangshuTem.on(Laya.Event.ERROR, this, onError);
                Sk.cangshuTem.loadAni("SK/cangshu.sk");
            }
            Sk.createCangshuTem = createCangshuTem;
            function createDajiTem() {
                Sk.dajiTem.on(Laya.Event.COMPLETE, this, onCompelet);
                Sk.dajiTem.on(Laya.Event.ERROR, this, onError);
                Sk.dajiTem.loadAni("SK/daji.sk");
            }
            Sk.createDajiTem = createDajiTem;
            function createHaimianbaobaoTem() {
                Sk.haimianbaobaoTem.on(Laya.Event.COMPLETE, this, onCompelet);
                Sk.haimianbaobaoTem.on(Laya.Event.ERROR, this, onError);
                Sk.haimianbaobaoTem.loadAni("SK/haimianbaobao.sk");
            }
            Sk.createHaimianbaobaoTem = createHaimianbaobaoTem;
            function createPikaqiuTem() {
                Sk.pikaqiuTem.on(Laya.Event.COMPLETE, this, onCompelet);
                Sk.pikaqiuTem.on(Laya.Event.ERROR, this, onError);
                Sk.pikaqiuTem.loadAni("SK/pikaqiu.sk");
            }
            Sk.createPikaqiuTem = createPikaqiuTem;
            function createShiziTem() {
                Sk.shiziTem.on(Laya.Event.COMPLETE, this, onCompelet);
                Sk.shiziTem.on(Laya.Event.ERROR, this, onError);
                Sk.shiziTem.loadAni("SK/shizi.sk");
            }
            Sk.createShiziTem = createShiziTem;
            function createKejiTem() {
                Sk.kejiTem.on(Laya.Event.COMPLETE, this, onCompelet);
                Sk.kejiTem.on(Laya.Event.ERROR, this, onError);
                Sk.kejiTem.loadAni("SK/keji.sk");
            }
            Sk.createKejiTem = createKejiTem;
            function createKedayaTem() {
                Sk.kedayaTem.on(Laya.Event.COMPLETE, this, onCompelet);
                Sk.kedayaTem.on(Laya.Event.ERROR, this, onError);
                Sk.kedayaTem.loadAni("SK/kedaya.sk");
            }
            Sk.createKedayaTem = createKedayaTem;
            function createWangziTem() {
                Sk.wangziTem.on(Laya.Event.COMPLETE, this, onCompelet);
                Sk.wangziTem.on(Laya.Event.ERROR, this, onError);
                Sk.wangziTem.loadAni("SK/wangzi.sk");
            }
            Sk.createWangziTem = createWangziTem;
            function createGouTem() {
                Sk.gouTem.on(Laya.Event.COMPLETE, this, onCompelet);
                Sk.gouTem.on(Laya.Event.ERROR, this, onError);
                Sk.gouTem.loadAni("SK/gou.sk");
            }
            Sk.createGouTem = createGouTem;
            function createQingdi_01Tem() {
                Sk.qingdi_01Tem.on(Laya.Event.COMPLETE, this, onCompelet);
                Sk.qingdi_01Tem.on(Laya.Event.ERROR, this, onError);
                Sk.qingdi_01Tem.loadAni("SK/qingdi.sk");
            }
            Sk.createQingdi_01Tem = createQingdi_01Tem;
            function createQingdi_02Tem() {
                Sk.qingdi_02Tem.on(Laya.Event.COMPLETE, this, onCompelet);
                Sk.qingdi_02Tem.on(Laya.Event.ERROR, this, onError);
                Sk.qingdi_02Tem.loadAni("SK/qingdi1.sk");
            }
            Sk.createQingdi_02Tem = createQingdi_02Tem;
            function createHoumaTem() {
                Sk.houmaTem.on(Laya.Event.COMPLETE, this, onCompelet);
                Sk.houmaTem.on(Laya.Event.ERROR, this, onError);
                Sk.houmaTem.loadAni("SK/houma.sk");
            }
            Sk.createHoumaTem = createHoumaTem;
            function createHouziTem() {
                Sk.houziTem.on(Laya.Event.COMPLETE, this, onCompelet);
                Sk.houziTem.on(Laya.Event.ERROR, this, onError);
                Sk.houziTem.loadAni("SK/houzi.sk");
            }
            Sk.createHouziTem = createHouziTem;
            function onCompelet(tem) {
                console.log(tem['_skBufferUrl'], '加载成功');
            }
            Sk.onCompelet = onCompelet;
            function onError(url) {
                console.log(url, '加载失败！');
            }
            Sk.onError = onError;
        })(Sk = lwg.Sk || (lwg.Sk = {}));
        let Enum;
        (function (Enum) {
            let HintDec;
            (function (HintDec) {
                HintDec[HintDec["\u91D1\u5E01\u4E0D\u591F\u4E86\uFF01"] = 0] = "\u91D1\u5E01\u4E0D\u591F\u4E86\uFF01";
                HintDec[HintDec["\u6CA1\u6709\u53EF\u4EE5\u8D2D\u4E70\u7684\u76AE\u80A4\u4E86\uFF01"] = 1] = "\u6CA1\u6709\u53EF\u4EE5\u8D2D\u4E70\u7684\u76AE\u80A4\u4E86\uFF01";
                HintDec[HintDec["\u6682\u65F6\u6CA1\u6709\u5E7F\u544A\uFF0C\u8FC7\u4F1A\u513F\u518D\u8BD5\u8BD5\u5427\uFF01"] = 2] = "\u6682\u65F6\u6CA1\u6709\u5E7F\u544A\uFF0C\u8FC7\u4F1A\u513F\u518D\u8BD5\u8BD5\u5427\uFF01";
                HintDec[HintDec["\u6682\u65E0\u76AE\u80A4!"] = 3] = "\u6682\u65E0\u76AE\u80A4!";
                HintDec[HintDec["\u6682\u65E0\u5206\u4EAB!"] = 4] = "\u6682\u65E0\u5206\u4EAB!";
                HintDec[HintDec["\u6682\u65E0\u63D0\u793A\u673A\u4F1A!"] = 5] = "\u6682\u65E0\u63D0\u793A\u673A\u4F1A!";
                HintDec[HintDec["\u89C2\u770B\u5B8C\u6574\u5E7F\u544A\u624D\u80FD\u83B7\u53D6\u5956\u52B1\u54E6\uFF01"] = 6] = "\u89C2\u770B\u5B8C\u6574\u5E7F\u544A\u624D\u80FD\u83B7\u53D6\u5956\u52B1\u54E6\uFF01";
                HintDec[HintDec["\u901A\u5173\u4E0A\u4E00\u5173\u624D\u80FD\u89E3\u9501\u672C\u5173\uFF01"] = 7] = "\u901A\u5173\u4E0A\u4E00\u5173\u624D\u80FD\u89E3\u9501\u672C\u5173\uFF01";
                HintDec[HintDec["\u5206\u4EAB\u6210\u529F\u540E\u624D\u80FD\u83B7\u53D6\u5956\u52B1\uFF01"] = 8] = "\u5206\u4EAB\u6210\u529F\u540E\u624D\u80FD\u83B7\u53D6\u5956\u52B1\uFF01";
                HintDec[HintDec["\u5206\u4EAB\u6210\u529F"] = 9] = "\u5206\u4EAB\u6210\u529F";
                HintDec[HintDec["\u6682\u65E0\u89C6\u9891\uFF0C\u73A9\u4E00\u5C40\u6E38\u620F\u4E4B\u540E\u5206\u4EAB\uFF01"] = 10] = "\u6682\u65E0\u89C6\u9891\uFF0C\u73A9\u4E00\u5C40\u6E38\u620F\u4E4B\u540E\u5206\u4EAB\uFF01";
                HintDec[HintDec["\u6D88\u80172\u70B9\u4F53\u529B\uFF01"] = 11] = "\u6D88\u80172\u70B9\u4F53\u529B\uFF01";
                HintDec[HintDec["\u4ECA\u65E5\u4F53\u529B\u798F\u5229\u5DF2\u9886\u53D6\uFF01"] = 12] = "\u4ECA\u65E5\u4F53\u529B\u798F\u5229\u5DF2\u9886\u53D6\uFF01";
                HintDec[HintDec["\u5206\u4EAB\u6210\u529F\uFF0C\u83B7\u5F97125\u91D1\u5E01\uFF01"] = 13] = "\u5206\u4EAB\u6210\u529F\uFF0C\u83B7\u5F97125\u91D1\u5E01\uFF01";
                HintDec[HintDec["\u9650\u5B9A\u76AE\u80A4\u5DF2\u7ECF\u83B7\u5F97\uFF0C\u8BF7\u524D\u5F80\u5546\u5E97\u67E5\u770B\u3002"] = 14] = "\u9650\u5B9A\u76AE\u80A4\u5DF2\u7ECF\u83B7\u5F97\uFF0C\u8BF7\u524D\u5F80\u5546\u5E97\u67E5\u770B\u3002";
                HintDec[HintDec["\u5206\u4EAB\u5931\u8D25\uFF01"] = 15] = "\u5206\u4EAB\u5931\u8D25\uFF01";
                HintDec[HintDec["\u5151\u6362\u7801\u9519\u8BEF\uFF01"] = 16] = "\u5151\u6362\u7801\u9519\u8BEF\uFF01";
                HintDec[HintDec["\u83B7\u5F97\u67EF\u57FA\u516C\u4E3B\u76AE\u80A4\uFF0C\u524D\u5F80\u5F69\u86CB\u5899\u67E5\u770B\uFF01"] = 17] = "\u83B7\u5F97\u67EF\u57FA\u516C\u4E3B\u76AE\u80A4\uFF0C\u524D\u5F80\u5F69\u86CB\u5899\u67E5\u770B\uFF01";
                HintDec[HintDec["\u83B7\u5F97\u9EC4\u76AE\u8017\u5B50\u76AE\u80A4\uFF0C\u524D\u5F80\u5F69\u86CB\u5899\u67E5\u770B\uFF01"] = 18] = "\u83B7\u5F97\u9EC4\u76AE\u8017\u5B50\u76AE\u80A4\uFF0C\u524D\u5F80\u5F69\u86CB\u5899\u67E5\u770B\uFF01";
                HintDec[HintDec["\u83B7\u5F97\u8D5B\u7259\u4EBA\u76AE\u80A4\uFF0C\u524D\u5F80\u5F69\u86CB\u5899\u67E5\u770B\uFF01"] = 19] = "\u83B7\u5F97\u8D5B\u7259\u4EBA\u76AE\u80A4\uFF0C\u524D\u5F80\u5F69\u86CB\u5899\u67E5\u770B\uFF01";
                HintDec[HintDec["\u83B7\u5F97\u6D77\u7EF5\u516C\u4E3B\u76AE\u80A4\uFF0C\u524D\u5F80\u5F69\u86CB\u5899\u67E5\u770B\uFF01"] = 20] = "\u83B7\u5F97\u6D77\u7EF5\u516C\u4E3B\u76AE\u80A4\uFF0C\u524D\u5F80\u5F69\u86CB\u5899\u67E5\u770B\uFF01";
                HintDec[HintDec["\u83B7\u5F97\u4ED3\u9F20\u516C\u4E3B\u76AE\u80A4\uFF0C\u524D\u5F80\u5F69\u86CB\u5899\u67E5\u770B\uFF01"] = 21] = "\u83B7\u5F97\u4ED3\u9F20\u516C\u4E3B\u76AE\u80A4\uFF0C\u524D\u5F80\u5F69\u86CB\u5899\u67E5\u770B\uFF01";
                HintDec[HintDec["\u83B7\u5F97\u81EA\u95ED\u9E2D\u5B50\u76AE\u80A4\uFF0C\u524D\u5F80\u5F69\u86CB\u5899\u67E5\u770B\uFF01"] = 22] = "\u83B7\u5F97\u81EA\u95ED\u9E2D\u5B50\u76AE\u80A4\uFF0C\u524D\u5F80\u5F69\u86CB\u5899\u67E5\u770B\uFF01";
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
                HintType[HintType["no_exemptExTime"] = 12] = "no_exemptExTime";
                HintType[HintType["shareyes"] = 13] = "shareyes";
                HintType[HintType["getXD"] = 14] = "getXD";
                HintType[HintType["sharefailNoAward"] = 15] = "sharefailNoAward";
                HintType[HintType["inputerr"] = 16] = "inputerr";
                HintType[HintType["kejigongzhu"] = 17] = "kejigongzhu";
                HintType[HintType["huangpihaozi"] = 18] = "huangpihaozi";
                HintType[HintType["saiyaren"] = 19] = "saiyaren";
                HintType[HintType["haimiangongzhu"] = 20] = "haimiangongzhu";
                HintType[HintType["cangshugongzhu"] = 21] = "cangshugongzhu";
                HintType[HintType["zibiyazi"] = 22] = "zibiyazi";
            })(HintType = Enum.HintType || (Enum.HintType = {}));
            let PifuOrder;
            (function (PifuOrder) {
                PifuOrder[PifuOrder["01_gongzhu"] = 0] = "01_gongzhu";
                PifuOrder[PifuOrder["02_chiji"] = 1] = "02_chiji";
                PifuOrder[PifuOrder["03_change"] = 2] = "03_change";
                PifuOrder[PifuOrder["04_huiguniang"] = 3] = "04_huiguniang";
                PifuOrder[PifuOrder["05_tianshi"] = 4] = "05_tianshi";
                PifuOrder[PifuOrder["06_xiaohongmao"] = 5] = "06_xiaohongmao";
                PifuOrder[PifuOrder["07_xiaohuangya"] = 6] = "07_xiaohuangya";
                PifuOrder[PifuOrder["08_zhenzi"] = 7] = "08_zhenzi";
                PifuOrder[PifuOrder["09_aisha"] = 8] = "09_aisha";
            })(PifuOrder = Enum.PifuOrder || (Enum.PifuOrder = {}));
            let PifuAllName;
            (function (PifuAllName) {
                PifuAllName[PifuAllName["01_gongzhu"] = 0] = "01_gongzhu";
                PifuAllName[PifuAllName["02_chiji"] = 1] = "02_chiji";
                PifuAllName[PifuAllName["03_change"] = 2] = "03_change";
                PifuAllName[PifuAllName["04_huiguniang"] = 3] = "04_huiguniang";
                PifuAllName[PifuAllName["05_tianshi"] = 4] = "05_tianshi";
                PifuAllName[PifuAllName["06_xiaohongmao"] = 5] = "06_xiaohongmao";
                PifuAllName[PifuAllName["07_xiaohuangya"] = 6] = "07_xiaohuangya";
                PifuAllName[PifuAllName["08_zhenzi"] = 7] = "08_zhenzi";
                PifuAllName[PifuAllName["09_aisha"] = 8] = "09_aisha";
            })(PifuAllName = Enum.PifuAllName || (Enum.PifuAllName = {}));
            let PifuSkin;
            (function (PifuSkin) {
                PifuSkin[PifuSkin["UI_new/Pifu/pifu_01_gongzhu.png"] = 0] = "UI_new/Pifu/pifu_01_gongzhu.png";
                PifuSkin[PifuSkin["UI_new/Pifu/pifu_02_chiji.png"] = 1] = "UI_new/Pifu/pifu_02_chiji.png";
                PifuSkin[PifuSkin["UI_new/Pifu/pifu_03_change.png"] = 2] = "UI_new/Pifu/pifu_03_change.png";
                PifuSkin[PifuSkin["UI_new/Pifu/pifu_04_huiguniang.png"] = 3] = "UI_new/Pifu/pifu_04_huiguniang.png";
                PifuSkin[PifuSkin["UI_new/Pifu/pifu_05_tianshi.png"] = 4] = "UI_new/Pifu/pifu_05_tianshi.png";
                PifuSkin[PifuSkin["UI_new/Pifu/pifu_06_xiaohongmao.png"] = 5] = "UI_new/Pifu/pifu_06_xiaohongmao.png";
                PifuSkin[PifuSkin["UI_new/Pifu/pifu_07_xiaohuangya.png"] = 6] = "UI_new/Pifu/pifu_07_xiaohuangya.png";
                PifuSkin[PifuSkin["UI_new/Pifu/pifu_08_zhenzi.png"] = 7] = "UI_new/Pifu/pifu_08_zhenzi.png";
                PifuSkin[PifuSkin["UI_new/Pifu/pifu_09_aisha.png"] = 8] = "UI_new/Pifu/pifu_09_aisha.png";
            })(PifuSkin = Enum.PifuSkin || (Enum.PifuSkin = {}));
            let PifuSkin_No;
            (function (PifuSkin_No) {
                PifuSkin_No[PifuSkin_No["UI_new/Pifu/pifu_01_gongzhu_h.png"] = 0] = "UI_new/Pifu/pifu_01_gongzhu_h.png";
                PifuSkin_No[PifuSkin_No["UI_new/Pifu/pifu_02_chiji_h.png"] = 1] = "UI_new/Pifu/pifu_02_chiji_h.png";
                PifuSkin_No[PifuSkin_No["UI_new/Pifu/pifu_03_change_h.png"] = 2] = "UI_new/Pifu/pifu_03_change_h.png";
                PifuSkin_No[PifuSkin_No["UI_new/Pifu/pifu_04_huiguniang_h.png"] = 3] = "UI_new/Pifu/pifu_04_huiguniang_h.png";
                PifuSkin_No[PifuSkin_No["UI_new/Pifu/pifu_05_tianshi_h.png"] = 4] = "UI_new/Pifu/pifu_05_tianshi_h.png";
                PifuSkin_No[PifuSkin_No["UI_new/Pifu/pifu_06_xiaohongmao_h.png"] = 5] = "UI_new/Pifu/pifu_06_xiaohongmao_h.png";
                PifuSkin_No[PifuSkin_No["UI_new/Pifu/pifu_07_xiaohuangya_h.png"] = 6] = "UI_new/Pifu/pifu_07_xiaohuangya_h.png";
                PifuSkin_No[PifuSkin_No["UI_new/Pifu/pifu_08_zhenzi_h.png"] = 7] = "UI_new/Pifu/pifu_08_zhenzi_h.png";
                PifuSkin_No[PifuSkin_No["UI_new/Pifu/pifu_09_aisha_h.png"] = 8] = "UI_new/Pifu/pifu_09_aisha_h.png";
            })(PifuSkin_No = Enum.PifuSkin_No || (Enum.PifuSkin_No = {}));
            let PifuNameSkin;
            (function (PifuNameSkin) {
                PifuNameSkin[PifuNameSkin["UI_new/Pifu/word_xueer.png"] = 0] = "UI_new/Pifu/word_xueer.png";
                PifuNameSkin[PifuNameSkin["UI_new/Pifu/word_jingying.png"] = 1] = "UI_new/Pifu/word_jingying.png";
                PifuNameSkin[PifuNameSkin["UI_new/Pifu/word_change.png"] = 2] = "UI_new/Pifu/word_change.png";
                PifuNameSkin[PifuNameSkin["UI_new/Pifu/word_hui.png"] = 3] = "UI_new/Pifu/word_hui.png";
                PifuNameSkin[PifuNameSkin["UI_new/Pifu/word_tianshi.png"] = 4] = "UI_new/Pifu/word_tianshi.png";
                PifuNameSkin[PifuNameSkin["UI_new/Pifu/wrod_hongmao.png"] = 5] = "UI_new/Pifu/wrod_hongmao.png";
                PifuNameSkin[PifuNameSkin["UI_new/Pifu/word_huangya.png"] = 6] = "UI_new/Pifu/word_huangya.png";
                PifuNameSkin[PifuNameSkin["UI_new/Pifu/word_changfa.png"] = 7] = "UI_new/Pifu/word_changfa.png";
                PifuNameSkin[PifuNameSkin["UI_new/Pifu/word_bingjing.png"] = 8] = "UI_new/Pifu/word_bingjing.png";
            })(PifuNameSkin = Enum.PifuNameSkin || (Enum.PifuNameSkin = {}));
            let CaidanPifuName;
            (function (CaidanPifuName) {
                CaidanPifuName["huangpihaozi"] = "01_huangpihaozi";
                CaidanPifuName["zibiyazi"] = "02_zibiyazi";
                CaidanPifuName["cangshugongzhu"] = "03_cangshugongzhu";
                CaidanPifuName["kejigongzhu"] = "04_kejigongzhu";
                CaidanPifuName["saiyaren"] = "05_saiyaren";
                CaidanPifuName["haimiangongzhu"] = "06_haimiangongzhu";
                CaidanPifuName["daji"] = "07_daji";
            })(CaidanPifuName = Enum.CaidanPifuName || (Enum.CaidanPifuName = {}));
            let voiceUrl;
            (function (voiceUrl) {
                voiceUrl["btn"] = "voice/btn.wav";
                voiceUrl["bgm"] = "voice/bgm.mp3";
                voiceUrl["victory"] = "voice/guoguan.wav";
                voiceUrl["defeated"] = "voice/wancheng.wav";
            })(voiceUrl = Enum.voiceUrl || (Enum.voiceUrl = {}));
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
            let RoomSkinZoder;
            (function (RoomSkinZoder) {
                RoomSkinZoder[RoomSkinZoder["Room/room_blue.png"] = 0] = "Room/room_blue.png";
                RoomSkinZoder[RoomSkinZoder["Room/room_bluish.png"] = 1] = "Room/room_bluish.png";
                RoomSkinZoder[RoomSkinZoder["Room/room_grass.png"] = 2] = "Room/room_grass.png";
                RoomSkinZoder[RoomSkinZoder["Room/room_green.png"] = 3] = "Room/room_green.png";
                RoomSkinZoder[RoomSkinZoder["Room/room_pink.png"] = 4] = "Room/room_pink.png";
                RoomSkinZoder[RoomSkinZoder["Room/room_purple.png"] = 5] = "Room/room_purple.png";
                RoomSkinZoder[RoomSkinZoder["Room/room_red.png"] = 6] = "Room/room_red.png";
                RoomSkinZoder[RoomSkinZoder["Room/room_yellow.png"] = 7] = "Room/room_yellow.png";
                RoomSkinZoder[RoomSkinZoder["Room/room_yellowish.png"] = 8] = "Room/room_yellowish.png";
            })(RoomSkinZoder = Enum.RoomSkinZoder || (Enum.RoomSkinZoder = {}));
            let WallpaperSkin;
            (function (WallpaperSkin) {
                WallpaperSkin[WallpaperSkin["Room/room_blue_wallpaper.png"] = 0] = "Room/room_blue_wallpaper.png";
                WallpaperSkin[WallpaperSkin["Room/room_bluish_wallpaper.png"] = 1] = "Room/room_bluish_wallpaper.png";
                WallpaperSkin[WallpaperSkin["Room/room_grass_wallpaper.png"] = 2] = "Room/room_grass_wallpaper.png";
                WallpaperSkin[WallpaperSkin["Room/room_green_wallpaper.png"] = 3] = "Room/room_green_wallpaper.png";
                WallpaperSkin[WallpaperSkin["Room/room_pink_wallpaper.png"] = 4] = "Room/room_pink_wallpaper.png";
                WallpaperSkin[WallpaperSkin["Room/room_purple_wallpaper.png"] = 5] = "Room/room_purple_wallpaper.png";
                WallpaperSkin[WallpaperSkin["Room/room_red_wallpaper.png"] = 6] = "Room/room_red_wallpaper.png";
                WallpaperSkin[WallpaperSkin["Room/room_yellow_wallpaper.png"] = 7] = "Room/room_yellow_wallpaper.png";
                WallpaperSkin[WallpaperSkin["Room/room_yellowish_wallpaper.png"] = 8] = "Room/room_yellowish_wallpaper.png";
            })(WallpaperSkin = Enum.WallpaperSkin || (Enum.WallpaperSkin = {}));
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
                WallSkin["common"] = "Room/room_common_wall.png";
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
                AisleColorSkin["common"] = "Room/room_common_color.png";
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
        })(Enum = lwg.Enum || (lwg.Enum = {}));
        let Click;
        (function (Click) {
            let ClickType;
            (function (ClickType) {
                ClickType["noEffect"] = "noEffect";
                ClickType["largen"] = "largen";
                ClickType["balloon"] = "balloon";
                ClickType["beetle"] = "beetle";
            })(ClickType = Click.ClickType || (Click.ClickType = {}));
            function on(effect, audioUrl, target, caller, down, move, up, out) {
                let btnEffect;
                if (audioUrl) {
                    Click.audioUrl = audioUrl;
                }
                else {
                    Click.audioUrl = Enum.voiceUrl.btn;
                }
                switch (effect) {
                    case ClickType.noEffect:
                        btnEffect = new Btn_NoEffect();
                        break;
                    case ClickType.largen:
                        btnEffect = new Btn_LargenEffect();
                        break;
                    case ClickType.balloon:
                        btnEffect = new Btn_Balloon();
                        break;
                    case ClickType.balloon:
                        btnEffect = new Btn_Beetle();
                        break;
                    default:
                        btnEffect = new Btn_LargenEffect();
                        break;
                }
                target.on(Laya.Event.MOUSE_DOWN, caller, down);
                target.on(Laya.Event.MOUSE_MOVE, caller, move);
                target.on(Laya.Event.MOUSE_UP, caller, up);
                target.on(Laya.Event.MOUSE_OUT, caller, out);
                target.on(Laya.Event.MOUSE_DOWN, caller, btnEffect.down);
                target.on(Laya.Event.MOUSE_MOVE, caller, btnEffect.move);
                target.on(Laya.Event.MOUSE_UP, caller, btnEffect.up);
                target.on(Laya.Event.MOUSE_OUT, caller, btnEffect.out);
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
                target.off(Laya.Event.MOUSE_DOWN, caller, down);
                target.off(Laya.Event.MOUSE_MOVE, caller, move);
                target.off(Laya.Event.MOUSE_UP, caller, up);
                target.off(Laya.Event.MOUSE_OUT, caller, out);
                target.off(Laya.Event.MOUSE_DOWN, caller, btnEffect.down);
                target.off(Laya.Event.MOUSE_MOVE, caller, btnEffect.move);
                target.off(Laya.Event.MOUSE_UP, caller, btnEffect.up);
                target.off(Laya.Event.MOUSE_OUT, caller, btnEffect.out);
            }
            Click.off = off;
        })(Click = lwg.Click || (lwg.Click = {}));
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
                if (lwg.PalyAudio._voiceSwitch) {
                    Laya.SoundManager.playSound(Click.audioUrl, 1, Laya.Handler.create(this, function () { }));
                }
            }
            move(event) {
            }
            up(event) {
                event.currentTarget.scale(1, 1);
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
        let Animation3D;
        (function (Animation3D) {
            function Pos_Euler(target, v3_Pos, v3_Rotate, time) {
                let moveTarget = target.transform.position;
                Laya.Tween.to(moveTarget, {
                    x: v3_Pos.x, y: v3_Pos.y, z: v3_Pos.z, update: new Laya.Handler(this, f => {
                        target.transform.position = (new Laya.Vector3(moveTarget.x, moveTarget.y, moveTarget.z));
                    })
                }, time, null);
                let rotateTarget = target.transform.localRotationEuler;
                Laya.Tween.to(rotateTarget, {
                    x: v3_Rotate.x, y: v3_Rotate.y, z: v3_Rotate.z, update: new Laya.Handler(this, f => {
                        target.transform.localRotationEulerX = (new Laya.Vector3(rotateTarget.x, rotateTarget.y, rotateTarget.z)).x;
                        target.transform.localRotationEulerY = (new Laya.Vector3(rotateTarget.x, rotateTarget.y, rotateTarget.z)).y;
                        target.transform.localRotationEulerZ = (new Laya.Vector3(rotateTarget.x, rotateTarget.y, rotateTarget.z)).z;
                    })
                }, time, null);
            }
            Animation3D.Pos_Euler = Pos_Euler;
        })(Animation3D = lwg.Animation3D || (lwg.Animation3D = {}));
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
            function move_FadeOut_Scale_01(node, firstX, firstY, targetX, targetY, time, delayed, func) {
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
            Animation.move_FadeOut_Scale_01 = move_FadeOut_Scale_01;
            function move_Scale(node, fScale, fX, fY, tX, tY, eScale, time, delayed, func) {
                node.scaleX = fScale;
                node.scaleY = fScale;
                node.x = fX;
                node.y = fY;
                Laya.Tween.to(node, { x: tX, y: tY, scaleX: eScale, scaleY: eScale }, time, null, Laya.Handler.create(this, function () {
                    if (func !== null) {
                        func();
                    }
                }), delayed);
            }
            Animation.move_Scale = move_Scale;
            function rotate_Scale(target, fRotate, fScaleX, fScaleY, eRotate, eScaleX, eScaleY, time, delayed, func) {
                target.scaleX = fScaleX;
                target.scaleY = fScaleY;
                target.rotation = fRotate;
                Laya.Tween.to(target, { rotation: eRotate, scaleX: eScaleX, scaleY: eScaleY }, time, null, Laya.Handler.create(this, function () {
                    Laya.Tween.to(target, { rotation: 0, scaleX: 1, scaleY: 1 }, time / 2, null, Laya.Handler.create(this, function () {
                        if (func !== null) {
                            func();
                        }
                    }), delayed);
                }), 0);
            }
            Animation.rotate_Scale = rotate_Scale;
            function drop_Simple(node, fY, tY, rotation, time, delayed, func) {
                node.y = fY;
                Laya.Tween.to(node, { y: tY, rotation: rotation }, time, Laya.Ease.circOut, Laya.Handler.create(this, function () {
                    if (func !== null) {
                        func();
                    }
                }), delayed);
            }
            Animation.drop_Simple = drop_Simple;
            function drop_KickBack(target, fAlpha, firstY, targetY, extendY, time1, delayed, func) {
                target.alpha = fAlpha;
                target.y = firstY;
                Laya.Tween.to(target, { alpha: 1, y: targetY + extendY }, time1, null, Laya.Handler.create(this, function () {
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
            function blink_FadeOut_v(target, minAlpha, maXalpha, time, delayed, func) {
                target.alpha = minAlpha;
                Laya.Tween.to(target, { alpha: maXalpha }, time, null, Laya.Handler.create(this, function () {
                    Laya.Tween.to(target, { alpha: minAlpha }, time, null, Laya.Handler.create(this, function () {
                        if (func !== null) {
                            func();
                        }
                    }), 0);
                }), delayed);
            }
            Animation.blink_FadeOut_v = blink_FadeOut_v;
            function blink_FadeOut(target, minAlpha, maXalpha, time, delayed, func) {
                Laya.Tween.to(target, { alpha: minAlpha }, time, null, Laya.Handler.create(this, function () {
                    Laya.Tween.to(target, { alpha: maXalpha }, time, null, Laya.Handler.create(this, function () {
                        if (func !== null) {
                            func();
                        }
                    }), 0);
                }), delayed);
            }
            Animation.blink_FadeOut = blink_FadeOut;
            function shookHead_Simple(target, rotate, time, delayed, func) {
                let firstR = target.rotation;
                Laya.Tween.to(target, { rotation: firstR + rotate }, time, null, Laya.Handler.create(this, function () {
                    Laya.Tween.to(target, { rotation: firstR - rotate * 2 }, time, null, Laya.Handler.create(this, function () {
                        Laya.Tween.to(target, { rotation: firstR + rotate }, time, null, Laya.Handler.create(this, function () {
                            Laya.Tween.to(target, { rotation: firstR }, time, null, Laya.Handler.create(this, function () {
                                if (func !== null) {
                                    func();
                                }
                            }), 0);
                        }), 0);
                    }), 0);
                }), delayed);
            }
            Animation.shookHead_Simple = shookHead_Simple;
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
            function scale_Alpha(target, fAlpha, fScaleX, fScaleY, eScaleX, eScaleY, eAlpha, time, delayed, func) {
                target.alpha = fAlpha;
                target.scaleX = fScaleX;
                target.scaleY = fScaleY;
                Laya.Tween.to(target, { scaleX: eScaleX, scaleY: eScaleY, alpha: eAlpha }, time, null, Laya.Handler.create(this, function () {
                    if (func !== null) {
                        func();
                    }
                }), delayed);
            }
            Animation.scale_Alpha = scale_Alpha;
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
            PalyAudio._voiceSwitch = true;
            function playSound(url, number) {
                if (PalyAudio._voiceSwitch) {
                    Laya.SoundManager.playSound(url, number, Laya.Handler.create(this, function () { }));
                }
            }
            PalyAudio.playSound = playSound;
            function playMusic(url, number, deley) {
                if (PalyAudio._voiceSwitch) {
                    Laya.SoundManager.playMusic(url, number, Laya.Handler.create(this, function () { }), deley);
                }
            }
            PalyAudio.playMusic = playMusic;
            function stopMusic() {
                Laya.SoundManager.stopMusic();
            }
            PalyAudio.stopMusic = stopMusic;
        })(PalyAudio = lwg.PalyAudio || (lwg.PalyAudio = {}));
        let Tools;
        (function (Tools) {
            function dotRotateXY(x0, y0, x1, y1, angle) {
                let x2 = x0 + (x1 - x0) * Math.cos(angle * Math.PI / 180) - (y1 - y0) * Math.sin(angle * Math.PI / 180);
                let y2 = y0 + (x1 - x0) * Math.sin(angle * Math.PI / 180) + (y1 - y0) * Math.cos(angle * Math.PI / 180);
                return new Laya.Point(x2, y2);
            }
            Tools.dotRotateXY = dotRotateXY;
            function toHexString(r, g, b) {
                return '#' + ("00000" + (r << 16 | g << 8 | b).toString(16)).slice(-6);
            }
            Tools.toHexString = toHexString;
            function twoObjectsLen_3D(obj1, obj2) {
                let obj1V3 = obj1.transform.position;
                let obj2V3 = obj2.transform.position;
                let p = new Laya.Vector3();
                Laya.Vector3.subtract(obj1V3, obj2V3, p);
                let lenp = Laya.Vector3.scalarLength(p);
                return lenp;
            }
            Tools.twoObjectsLen_3D = twoObjectsLen_3D;
            function twoObjectsLen_2D(obj1, obj2) {
                let point = new Laya.Point(obj1.x, obj1.y);
                let len = point.distance(obj2.x, obj2.y);
                return len;
            }
            Tools.twoObjectsLen_2D = twoObjectsLen_2D;
            function twoSubV3_3D(V3_01, V3_02) {
                let p = new Laya.Vector3();
                Laya.Vector3.subtract(V3_01, V3_02, p);
                return p;
            }
            Tools.twoSubV3_3D = twoSubV3_3D;
            function reverseVector(type, Vecoter1, Vecoter2, normalizing) {
                let p;
                if (type === '2d') {
                    p = new Laya.Point(Vecoter1.x - Vecoter2.x, Vecoter1.y - Vecoter2.y);
                    if (normalizing) {
                        p.normalize();
                    }
                    return p;
                }
                else if (type === '3d') {
                    p = new Laya.Vector3(Vecoter1.x - Vecoter2.x, Vecoter1.y - Vecoter2.y, Vecoter1.z - Vecoter2.z);
                    if (normalizing) {
                        let returnP = new Laya.Vector3();
                        Laya.Vector3.normalize(p, returnP);
                        return returnP;
                    }
                    else {
                        return p;
                    }
                }
            }
            Tools.reverseVector = reverseVector;
            function vectorAngle(x, y) {
                let radian = Math.atan2(x, y);
                let angle = 90 - radian * (180 / Math.PI);
                if (angle <= 0) {
                    angle = 270 + (90 + angle);
                }
                return angle;
            }
            Tools.vectorAngle = vectorAngle;
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
    let Admin = lwg.Admin;
    let Click = lwg.Click;
    let Global = lwg.Global;
    let Animation = lwg.Animation;
    let EventAdmin = lwg.EventAdmin;
    let Tools = lwg.Tools;
    let Effects = lwg.Effects;
    let Animation3D = lwg.Animation3D;

    var GameControl;
    (function (GameControl) {
        let GEnum;
        (function (GEnum) {
            let bulletType;
            (function (bulletType) {
                bulletType["yellow"] = "yellow";
                bulletType["bule"] = "bule";
                bulletType["green"] = "green";
            })(bulletType = GEnum.bulletType || (GEnum.bulletType = {}));
            let bulletSkin;
            (function (bulletSkin) {
                bulletSkin["yellow"] = "Frame/UI/ui_square_011.png";
                bulletSkin["bule"] = "Frame/UI/ui_square_002.png";
                bulletSkin["green"] = "Frame/UI/ui_square_009.png";
            })(bulletSkin = GEnum.bulletSkin || (GEnum.bulletSkin = {}));
            let BulletState;
            (function (BulletState) {
                BulletState["attack"] = "attack";
                BulletState["rebound"] = "rebound";
                BulletState["stone"] = "stone";
            })(BulletState = GEnum.BulletState || (GEnum.BulletState = {}));
            let enemyType;
            (function (enemyType) {
                enemyType["yellow"] = "yellow";
                enemyType["bule"] = "bule";
                enemyType["green"] = "green";
            })(enemyType = GEnum.enemyType || (GEnum.enemyType = {}));
            let enemySkin;
            (function (enemySkin) {
                enemySkin["yellow"] = "Frame/UI/ui_square_011.png";
                enemySkin["bule"] = "Frame/UI/ui_square_002.png";
                enemySkin["green"] = "Frame/UI/ui_square_009.png";
            })(enemySkin = GEnum.enemySkin || (GEnum.enemySkin = {}));
            let enemyState;
            (function (enemyState) {
                enemyState["move"] = "move";
                enemyState["stone"] = "stone";
                enemyState["await"] = "stone";
            })(enemyState = GEnum.enemyState || (GEnum.enemyState = {}));
            let enemyMoveDir;
            (function (enemyMoveDir) {
                enemyMoveDir["up"] = "up";
                enemyMoveDir["left"] = "left";
                enemyMoveDir["down"] = "down";
                enemyMoveDir["right"] = "right";
                enemyMoveDir["stay"] = "stay";
            })(enemyMoveDir = GEnum.enemyMoveDir || (GEnum.enemyMoveDir = {}));
        })(GEnum = GameControl.GEnum || (GameControl.GEnum = {}));
        let G;
        (function (G) {
            G.bulletNum = 0;
        })(G = GameControl.G || (GameControl.G = {}));
    })(GameControl || (GameControl = {}));
    let G = GameControl.G;
    let GEnum = GameControl.GEnum;

    class UIMain_Enemy extends lwg.Admin.Object {
        constructor() {
            super(...arguments);
            this.stoneTime = false;
            this.moveDir = GEnum.enemyMoveDir.down;
        }
        selfNode() {
        }
        lwgOnEnable() {
            this.moveDir = GEnum.enemyMoveDir.down;
            this.enemyState = GEnum.enemyState.move;
            let num = this.self.getChildByName('Num');
            num.text = (Math.floor(Math.random() * 3) + 1).toString();
            let pic = this.self.getChildByName('Pic');
            let rand = Math.floor(Math.random() * 3);
            switch (rand) {
                case 0:
                    pic.skin = GEnum.enemySkin.yellow;
                    this.enemyType = GEnum.enemyType.yellow;
                    break;
                case 1:
                    pic.skin = GEnum.enemySkin.bule;
                    this.enemyType = GEnum.enemyType.bule;
                    break;
                case 2:
                    pic.skin = GEnum.enemySkin.green;
                    this.enemyType = GEnum.enemyType.green;
                    break;
                default:
                    break;
            }
        }
        onTriggerEnter(other, self) {
            switch (other.label) {
                case 'bullet':
                    this.enemyAndEnemy(other, self);
                    break;
                case 'stone':
                    this.enemyAndStone(other, self);
                    break;
                case 'enemy':
                    this.enemyAndEnemy(other, self);
                    break;
                default:
                    break;
            }
        }
        enemyAndEnemy(other, self) {
            this.beforDir = this.moveDir;
            this.moveDir = GEnum.enemyMoveDir.stay;
            Laya.timer.frameOnce(30, this, f => {
                this.moveDir = this.beforDir;
                if (this.moveDir === GEnum.enemyMoveDir.stay) {
                    if (this.stoneTime) {
                        Math.floor(Math.random() * 2) === 1 ? this.moveDir = GEnum.enemyMoveDir.left : this.moveDir = GEnum.enemyMoveDir.right;
                    }
                    else {
                        this.moveDir = GEnum.enemyMoveDir.down;
                    }
                }
            });
        }
        enemyAndStone(other, self) {
            this.stoneTime = true;
            Math.floor(Math.random() * 2) === 1 ? this.moveDir = GEnum.enemyMoveDir.left : this.moveDir = GEnum.enemyMoveDir.right;
        }
        onTriggerExit(other, self) {
            switch (other.label) {
                case 'bullet':
                    break;
                case 'stone':
                    this.stoneTime = false;
                    this.moveDir = GEnum.enemyMoveDir.down;
                    break;
                case 'enemy':
                    break;
                default:
                    break;
            }
        }
        moveRules() {
            if (this.moveDir === GEnum.enemyMoveDir.left) {
                if (this.stoneTime) {
                    this.self.x--;
                }
                else {
                    this.moveDir = GEnum.enemyMoveDir.down;
                }
            }
            else if (this.moveDir === GEnum.enemyMoveDir.right) {
                if (this.stoneTime) {
                    this.self.x++;
                }
                else {
                    this.moveDir = GEnum.enemyMoveDir.down;
                }
            }
            else if (this.moveDir === GEnum.enemyMoveDir.down) {
                this.self.y++;
            }
            else if (this.moveDir === GEnum.enemyMoveDir.up) {
                this.self.y++;
            }
        }
        lwgOnUpdate() {
            if (!Admin._gameStart) {
                return;
            }
            this.moveRules();
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
                if (this.timer % 10 === 0) {
                    if (this.selfScene['UIMain'].launchType) ;
                }
            }
        }
    }

    class UIMain_Bullet extends lwg.Admin.Object {
        constructor() {
            super(...arguments);
            this.targetEnemy = new Laya.Sprite();
            this.reboundRotae = 0;
            this.accelerated = 0;
            this.speed = 80;
        }
        selfNode() {
            this.EnemyParent = this.selfScene['EnemyParent'];
            this.BarrierParent = this.selfScene['BarrierParent'];
        }
        lwgOnEnable() {
            this.bulletState = GEnum.BulletState.attack;
        }
        attackEnemy() {
            for (let index = 0; index < this.EnemyParent.numChildren; index++) {
                const enemy = this.EnemyParent.getChildAt(index);
                if (enemy) {
                    let len = lwg.Tools.twoObjectsLen_2D(this.self, enemy);
                    if (len < 50) {
                        let num = enemy.getChildByName('Num');
                        if (enemy['UIMain_Enemy'].enemyType === this.bulletType) {
                            if (this.bulletState === GEnum.BulletState.attack) {
                                num.text = (Number(num.text) - 2).toString();
                                if (Number(num.text) <= 0) {
                                    enemy.removeSelf();
                                }
                                this.self.removeSelf();
                            }
                        }
                        else {
                            this.bulletState = GEnum.BulletState.rebound;
                            this.accelerated = 0;
                            this.reboundRotae = Math.floor(Math.random() * 2) === 1 ? Math.random() * this.speed / 3 + 10 : -Math.random() * this.speed / 3 + 10;
                        }
                        return;
                    }
                }
            }
        }
        attackBarrier() {
            if (this.BarrierParent) {
                for (let index = 0; index < this.BarrierParent.numChildren; index++) {
                    const barrier = this.BarrierParent.getChildAt(index);
                    if (barrier) {
                        let len = lwg.Tools.twoObjectsLen_2D(this.self, barrier);
                        if (len < 50) {
                            this.bulletState = GEnum.BulletState.rebound;
                            this.accelerated = 0;
                            this.reboundRotae = Math.floor(Math.random() * 2) === 1 ? Math.random() * this.speed / 3 + 10 : -Math.random() * this.speed / 3 + 10;
                            return;
                        }
                    }
                }
            }
        }
        lwgOnUpdate() {
            if (this.bulletState === GEnum.BulletState.attack) {
                this.attackEnemy();
                this.attackBarrier();
                if (this.accelerated >= this.speed) {
                    this.accelerated = 0;
                    return;
                }
                else {
                    this.accelerated -= 2;
                }
                this.self.x -= (this.speed + this.accelerated) * this.movePoint.x;
                this.self.y -= (this.speed + this.accelerated) * this.movePoint.y;
                if (this.self.y < -100 || this.self.y > Laya.stage.height || this.self.x > Laya.stage.width || this.self.x < 0) {
                    this.self.removeSelf();
                }
            }
            else if (this.bulletState === GEnum.BulletState.rebound) {
                if (this.speed / 2 + this.accelerated <= 0) {
                    this.self.alpha -= 0.05;
                    if (this.self.alpha <= 0) {
                        this.self.removeSelf();
                    }
                }
                else {
                    this.self.rotation += this.reboundRotae;
                    this.accelerated -= 2;
                    this.self.x += (this.speed / 2 + this.accelerated) * this.movePoint.x;
                    this.self.y += (this.speed / 2 + this.accelerated) * this.movePoint.y;
                }
            }
        }
    }

    class UIMain extends lwg.Admin.Scene {
        constructor() {
            super(...arguments);
            this.timer = 0;
        }
        selfNode() {
        }
        lwgOnEnable() {
            this.timer = 0;
            this.bulletNum = 0;
            this.self['Protagonist'].addComponent(UIMain_Protagonist);
            this.self['GuideLine'].alpha = 0;
            this.touchColor = null;
            lwg.Admin._gameStart = true;
        }
        createEnemy() {
            let enemy;
            enemy = Laya.Pool.getItemByCreateFun('enemy', this.Enemy.create, this.Enemy);
            this.self['EnemyParent'].addChild(enemy);
            let randX = enemy.width / 2 + (Laya.stage.width - enemy.width / 2 * 2) * Math.random();
            enemy.addComponent(UIMain_Enemy);
            enemy.pos(randX, 0);
            enemy.zOrder = 0;
            this.bulletNum++;
            return enemy;
        }
        createBullet(x, y) {
            let bullet;
            bullet = Laya.Pool.getItemByCreateFun('bullet', this.Bullet.create, this.Bullet);
            this.self['BulletParent'].addChild(bullet);
            bullet.pos(x, y);
            bullet.zOrder = 0;
            bullet.addComponent(UIMain_Bullet);
            let pic = bullet.getChildByName('Pic');
            switch (this.launchType) {
                case GEnum.bulletType.yellow:
                    pic.skin = GEnum.bulletSkin.yellow;
                    bullet['UIMain_Bullet'].bulletType = GEnum.bulletType.yellow;
                    break;
                case GEnum.bulletType.bule:
                    pic.skin = GEnum.bulletSkin.bule;
                    bullet['UIMain_Bullet'].bulletType = GEnum.bulletType.bule;
                    break;
                case GEnum.bulletType.green:
                    pic.skin = GEnum.bulletSkin.green;
                    bullet['UIMain_Bullet'].bulletType = GEnum.bulletType.green;
                    break;
                default:
                    break;
            }
            G.bulletNum++;
            return bullet;
        }
        btnOnClick() {
            lwg.Click.on(lwg.Click.ClickType.noEffect, null, this.self['BtnYellow'], this, this.clickDwon, null, null, null);
            lwg.Click.on(lwg.Click.ClickType.noEffect, null, this.self['BtnBlue'], this, this.clickDwon, null, null, null);
            lwg.Click.on(lwg.Click.ClickType.noEffect, null, this.self['BtnGreen'], this, this.clickDwon, null, null, null);
        }
        clickDwon(e) {
            this.touchColor = e.currentTarget;
            switch (this.touchColor.name) {
                case 'BtnYellow':
                    this.launchType = GEnum.bulletType.yellow;
                    this.self['BtnYellow'].scale(1.1, 1.1);
                    this.self['BtnBlue'].scale(1, 1);
                    this.self['BtnGreen'].scale(1, 1);
                    this.self['GuideLine'].x = this.self['BtnYellow'].x;
                    this.self['GuideLine'].y = this.self['BtnYellow'].y;
                    this.self['GuideLine'].alpha = 1;
                    break;
                case 'BtnBlue':
                    this.launchType = GEnum.bulletType.bule;
                    this.self['BtnYellow'].scale(1, 1);
                    this.self['BtnBlue'].scale(1.1, 1.1);
                    this.self['BtnGreen'].scale(1, 1);
                    this.self['GuideLine'].x = this.self['BtnBlue'].x;
                    this.self['GuideLine'].y = this.self['BtnBlue'].y;
                    this.self['GuideLine'].alpha = 1;
                    break;
                case 'BtnGreen':
                    this.launchType = GEnum.bulletType.green;
                    this.self['BtnYellow'].scale(1, 1);
                    this.self['BtnBlue'].scale(1, 1);
                    this.self['BtnGreen'].scale(1.1, 1.1);
                    this.self['GuideLine'].x = this.self['BtnGreen'].x;
                    this.self['GuideLine'].y = this.self['BtnGreen'].y;
                    this.self['GuideLine'].alpha = 1;
                    break;
                default:
                    break;
            }
        }
        onStageMouseMove(e) {
            if (this.touchColor !== null) {
                let x = e.stageX;
                let y = e.stageY;
                let point = new Laya.Point(x, y);
                let len = point.distance(this.touchColor.x, this.touchColor.y);
                let line = this.self['GuideLine'].getChildByName('Line');
                line.height = len;
                let movePoint = new Laya.Point(x - this.touchColor.x, y - this.touchColor.y);
                this.self['GuideLine'].rotation = lwg.Tools.vectorAngle(movePoint.x, movePoint.y) - 90;
                this.touchColor.rotation = this.self['GuideLine'].rotation;
                this.self[this.touchColor.name];
            }
        }
        onStageMouseUp(e) {
            let x = e.stageX;
            let y = e.stageY;
            let point = new Laya.Point(x, y);
            if (this.touchColor !== null) {
                let distance = point.distance(this.touchColor.x, this.touchColor.y);
                if (distance > 100) {
                    let bullet = this.createBullet(this.touchColor.x, this.touchColor.y);
                    let movePoint = new Laya.Point(x - this.touchColor.x, y - this.touchColor.y);
                    movePoint.normalize();
                    bullet.getComponent(UIMain_Bullet).movePoint = movePoint;
                    bullet.rotation = this.self['GuideLine'].rotation;
                }
            }
            this.self['GuideLine'].alpha = 0;
            this.touchColor = null;
        }
        lwgOnUpdate() {
            if (lwg.Admin._gameStart) {
                if (this.timer % 100 === 0) {
                    this.createEnemy();
                }
                this.timer++;
            }
        }
    }

    class UILoding extends lwg.Admin.Scene {
        constructor() {
            super(...arguments);
            this.mianSceneOk = false;
            this.time = 0;
        }
        lwgOnEnable() {
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
