import { lwg } from "../Lwg_Template/lwg";
import { GEnum } from "../Lwg_Template/GameControl";

export default class UIMain_Enemy extends lwg.Admin.Object {

    /**怪物类型*/
    enemyType: string;
    lwgInit(): void {
        let num = this.self.getChildByName('Num') as Laya.Label;
        num.text = (Math.floor(Math.random() * 3) + 1).toString();

        let pic = this.self.getChildByName('Pic') as Laya.Image;
        let rand = Math.floor(Math.random() * 3);

        switch (rand) {
            case 0:
                pic.skin = GEnum.enemySkin.yellow;
                this.enemyType =GEnum.enemyType.yellow;
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

    lwgOnUpdate(): void {
        this.self.y += 1;
        if (this.self.y >= this.selfScene['Protagonist'].y) {
            this.self.removeSelf();
        }
    }
}