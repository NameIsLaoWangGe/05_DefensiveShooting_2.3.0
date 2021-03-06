import { lwg } from "../Lwg_Template/lwg";

export default class UISet extends Laya.Script {
    /**挂载当前脚本的节点*/
    private self: Laya.Scene;
    /**震动按钮*/
    private BtnShake: Laya.Sprite;
    /**声音按钮*/
    private BtnVoice: Laya.Sprite;
    /**关闭按钮*/
    private BtnClose: Laya.Sprite;

    constructor() { super(); }

    onEnable(): void {
        this.self = this.owner as Laya.Scene;
        this.BtnVoice = this.self['BtnVoice'];
        this.BtnShake = this.self['BtnShake'];
        this.BtnClose = this.self['BtnClose'];
        this.btnVoiceAndBtnShake();
        this.btnClickOn();
    }

    /**声音按钮和震动按钮的样式初始化*/
    btnVoiceAndBtnShake(): void {
        let voiceImg = this.BtnVoice.getChildAt(0) as Laya.Image;
        let voiceUrl1 = 'shezhi/icon_voiceon.png';
        let voiceUrl2 = 'shezhi/icon_voiceoff.png';
        if (lwg.Global._voiceSwitch) {
            voiceImg.skin = voiceUrl1;
        } else {
            voiceImg.skin = voiceUrl2;
        }

        // 震动图标初始化
        let shakeImg = this.BtnShake.getChildAt(0) as Laya.Image;
        let shakeUrl1 = 'shezhi/shake_on.png';
        let shakeUrl2 = 'shezhi/shake_off.png';
        if (lwg.Global._shakeSwitch) {
            shakeImg.skin = shakeUrl1;
        } else {
            shakeImg.skin = shakeUrl2;
        }
    }

    /**游戏开始按钮*/
    btnClickOn(): void {
        lwg.Click.on('largen', null, this.BtnVoice, this, null, null, this.btnVoiceClickUP, null);
        lwg.Click.on('largen', null, this.BtnShake, this, null, null, this.btnShakeClickUP, null);
        lwg.Click.on('largen', null, this.BtnClose, this, null, null, this.btnCloseClickUP, null);
    }

    /**声音控制按钮抬起*/
    btnVoiceClickUP(event): void {
        // 声音图标初始化
        let voiceImg = this.BtnVoice.getChildAt(0) as Laya.Image;
        let voiceUrl1 = 'shezhi/icon_voiceon.png';
        let voiceUrl2 = 'shezhi/icon_voiceoff.png';
        if (voiceImg.skin === voiceUrl1) {
            voiceImg.skin = voiceUrl2;
            lwg.Global._voiceSwitch = false;
            lwg.PalyAudio.stopMusic();
        } else if (voiceImg.skin === voiceUrl2) {
            voiceImg.skin = voiceUrl1;
            lwg.Global._voiceSwitch = true;
            lwg.PalyAudio.playMusic(lwg.Enum.voiceUrl.bgm, 0, 0);
        }
    }

    /**手机震动按钮抬起*/
    btnShakeClickUP(event): void {
        event.currentTarget.scale(1, 1);
        let img = this.BtnShake.getChildAt(0) as Laya.Image;
        let url1 = 'shezhi/shake_on.png';
        let url2 = 'shezhi/shake_off.png';
        if (img.skin === url1) {
            img.skin = url2;
            lwg.Global._shakeSwitch = false;
        } else if (img.skin === url2) {
            img.skin = url1;
            lwg.Global._shakeSwitch = true;
        }
    }

    /**设置按钮抬起*/
    btnCloseClickUP(event): void {
        event.currentTarget.scale(1, 1);
        this.self.close();
    }

    onDisable(): void {
    }
}