import { lwg } from "../Lwg_Template/lwg";

export default class UIMain_Protagonist extends lwg.Admin.Person {

    lwgInit(): void {
        console.log('我是主角！');
        this.timer = 0;
    }

    timer: number = 0;
    lwgOnUpdate(): void {
        if (lwg.Global._gameStart) {
            this.timer++;
            if (this.timer % 10 === 0) {
                if (this.selfScene['UIMain'].launchType) {
                    this.selfScene[lwg.Admin.SceneName.UIMain].createBullet();
                }
            }
        }
    }
}