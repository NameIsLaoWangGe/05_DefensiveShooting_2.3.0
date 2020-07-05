import { lwg } from "../Lwg_Template/lwg";

export default class UIMain_Enemy extends lwg.Admin.Person {

    lwgInit(): void {
        let num = this.self.getChildByName('Num') as Laya.Label;
        num.text =( Math.floor(Math.random() * 10) + 1).toString();
    }

    lwgOnUpdate(): void {
        this.self.y += 1;
        if (this.self.y >= this.selfScene['Protagonist'].y) {
            this.self.removeSelf();
        }
    }
}