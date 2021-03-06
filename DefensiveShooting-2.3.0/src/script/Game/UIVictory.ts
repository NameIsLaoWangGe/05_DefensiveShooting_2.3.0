import { lwg } from "../Lwg_Template/lwg";
import ADManager, { TaT } from "../../TJ/Admanager";
import RecordManager from "../../TJ/RecordManager";

export default class UIVictory extends lwg.Admin.Scene {
    /**领取奖励按钮*/
    BtnGet: Laya.Sprite;
    /**过关显示*/
    AccordingLv: Laya.Sprite;
    /**获得金币*/
    GetGold: Laya.Sprite;
    /**三倍领取*/
    BtnGoldAdv: Laya.Sprite;
    /**看广告领取体力*/
    BtnExAdv: Laya.Sprite;
    /**关卡数量*/
    LvNum: Laya.FontClip;
    /**下一关*/
    BtnLast: Laya.Sprite;

    constructor() { super(); }

    lwgInit(): void {
        RecordManager.stopAutoRecord();
        this.BtnGoldAdv = this.self['BtnGoldAdv'];
        this.BtnExAdv = this.self['BtnExAdv'];
        this.GetGold = this.self['GetGold'];
        this.LvNum = this.self['LvNum'];
        this.LvNum.value = lwg.Global._gameLevel.toString();
        this.BtnLast = this.self['BtnLast'];
        lwg.Global._createGoldNum(this.self);
        lwg.Global._createExecutionNum(this.self);
        this.getGoldDisplay();
        this.LvNumDisplay();

        lwg.Global._createGoldNum(this.self);
        lwg.Global._createExecutionNum(this.self);

        lwg.PalyAudio.playSound(lwg.Enum.voiceUrl.victory, 1);
    }

    adaptive(): void {
        this.self['sceneContent'].y = Laya.stage.height / 2;
    }

    /**本关获得金币显示,此时并未获得*/
    getGoldDisplay(): void {
        let getLebel = this.GetGold.getChildByName('Num') as Laya.FontClip;
        let level = lwg.Global._gameLevel;
        getLebel.value = 'x' + 25;
        console.log('普通关卡奖励金币为：' + getLebel.value);
    }
    /**关卡数显示，有两种情况，一种是显示当前真实关卡，一种是重玩以前的关卡*/
    LvNumDisplay(): void {
        if (lwg.Admin.openLevelNum >= lwg.Global._gameLevel) {
            this.LvNum.value = lwg.Global._gameLevel.toString();
        } else {
            this.LvNum.value = lwg.Admin.openLevelNum.toString();
        }
    }

    btnOnClick(): void {
        ADManager.TAPoint(TaT.BtnShow, 'ADrewardbt_success');
        ADManager.TAPoint(TaT.BtnShow, 'Share_success');
        ADManager.TAPoint(TaT.BtnShow, 'nextword_success');
        ADManager.TAPoint(TaT.BtnShow, 'ADticketbt_success');


        lwg.Click.on(lwg.Enum.ClickType.largen, null, this.BtnLast, this, null, null, this.btnLastUp, null);
        lwg.Click.on(lwg.Enum.ClickType.largen, null, this.BtnGoldAdv, this, null, null, this.btnGoldAdvUp, null);
        lwg.Click.on(lwg.Enum.ClickType.largen, null, this.self['BtnBack'], this, null, null, this.btnBackUp, null);
        lwg.Click.on(lwg.Enum.ClickType.largen, null, this.self['BtnShare'], this, null, null, this.btnShareUp, null);
    }

    /**需要判断当前的关卡是否和当前关卡相等，不相等说明打开的是以前的关卡*/
    btnLastUp() {
        ADManager.TAPoint(TaT.BtnClick, 'nextword_success');

        if (lwg.Global._execution < 2) {
            lwg.Admin._openScene('UIExecutionHint', null, null, null);
        } else {
            if (Number(this.LvNum.value) >= 3) {
                lwg.Admin._openScene('UIPassHint', null, null, null);
            } else {

                lwg.Global._execution -= 2;
                lwg.Global._createHint(lwg.Enum.HintType.consumeEx);
                lwg.Global.createConsumeEx(null);
                lwg.LocalStorage.addData();

                lwg.LocalStorage.addData();
                if (lwg.Admin.openLevelNum >= lwg.Global._gameLevel) {
                    lwg.Admin._closeCustomScene();
                    lwg.Global._gameLevel++;
                    lwg.Admin._openGLCustoms();
                } else {
                    lwg.Admin._closeCustomScene();
                    lwg.Admin.openLevelNum++;
                    lwg.Admin._openLevelNumCustom();
                }
                lwg.Global._goldNum += 25;
            }
            // console.log(lwg.Admin.openLevelNum, lwg.Global._gameLevel);
            lwg.LocalStorage.addData();
            this.self.close();
        }
    }

    // 三倍领取
    btnGoldAdvUp(event): void {
        ADManager.TAPoint(TaT.BtnClick, 'ADrewardbt_success');

        event.currentTarget.scale(1, 1);
        ADManager.ShowReward(() => {
            this.btnGoldAdvUpFunc();
            lwg.PalyAudio.playMusic(lwg.Enum.voiceUrl.bgm, 0, 1000);
        })
    }
    btnGoldAdvUpFunc(): void {
        if (lwg.Global._execution < 2) {
            lwg.Admin._openScene('UIExecutionHint', null, null, null);
        } else {
            lwg.Admin._closeCustomScene();

            lwg.Global._execution -= 2;
            lwg.Global._createHint(lwg.Enum.HintType.consumeEx);
            lwg.Global.createConsumeEx(null);
            lwg.LocalStorage.addData();

            if (lwg.Admin.openLevelNum >= lwg.Global._gameLevel) {
                lwg.Global._gameLevel++;
                lwg.Admin._openGLCustoms();
            } else {
                lwg.Admin.openLevelNum++;
                lwg.Admin._openLevelNumCustom();
            }
            lwg.Global._goldNum = lwg.Global._goldNum + 25 * 3;
        }
        // console.log(lwg.Admin.openLevelNum, lwg.Global._gameLevel);
        lwg.LocalStorage.addData();
        this.self.close();
    }

    btnBackUp(event): void {
        ADManager.TAPoint(TaT.BtnClick, 'ADticketbt_success');

        lwg.Admin._openScene('UIStart', null, null, null);
        lwg.Admin._closeCustomScene();
        lwg.Global._goldNum += 25;
        lwg.LocalStorage.addData();
        this.self.close();

        // event.currentTarget.scale(1, 1);
        // ADManager.ShowReward(() => {
        //     this.btnExAdvUpFunc();
        // })
    }
    btnExAdvUpFunc(): void {
        lwg.Global._execution += 3;
        let num = lwg.Global.ExecutionNumNode.getChildByName('Num') as Laya.FontClip;
        num.value = (Number(num.value) + 3).toString();
        lwg.LocalStorage.addData();
    }

    btnShareUp(event): void {
        ADManager.TAPoint(TaT.BtnClick, 'Share_success');

        event.currentTarget.scale(1, 1);
        RecordManager._share(() => {
            this.btnShareUpFunc();
        })
    }

    btnShareUpFunc(): void {
        // 分享可以获得奖励
        lwg.Global._goldNum += 125;
    }


    onDisable(): void {
    }
}