import { lwg } from "../Lwg_Template/lwg";
import ADManager, { TaT } from "../../TJ/Admanager";

export default class UIPuase extends lwg.Admin.Scene {
    /**会主界面按钮*/
    BtnUIStart: Laya.Sprite;
    /**继续游戏按钮*/
    BtnContinue: Laya.Sprite;
    lwgInit(): void {
        this.BtnUIStart = this.self['BtnUIStart'];
        this.BtnContinue = this.self['BtnContinue'];
    }
    adaptive(): void {
        this.self['SceneContent'].y = Laya.stage.height / 2;
    }
    btnOnClick(): void {
        ADManager.TAPoint(TaT.BtnShow, 'home_pause');
        ADManager.TAPoint(TaT.BtnShow, 'continue_pause');

        lwg.Click.on(lwg.Enum.ClickType.largen, null, this.BtnUIStart, this, null, null, this.BtnUIStartUp, null);
        lwg.Click.on(lwg.Enum.ClickType.largen, null, this.BtnContinue, this, null, null, this.BtnContinueUp, null);
    }
    BtnUIStartUp(): void {
        ADManager.TAPoint(TaT.BtnClick, 'home_pause');

        lwg.Admin._openScene('UIStart', null, this.self, null);
        lwg.Admin._closeCustomScene();
    }
    BtnContinueUp(): void {
        ADManager.TAPoint(TaT.BtnClick, 'continue_pause');

        this.self.close();
    }
}