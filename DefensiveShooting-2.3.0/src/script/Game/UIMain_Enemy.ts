import { lwg } from "../Lwg_Template/lwg";

export default class UIMain_Enemy extends lwg.Admin.Object {

    /**怪物类型*/
    enemyType: string;
    lwgInit(): void {
        let num = this.self.getChildByName('Num') as Laya.Label;
        num.text = (Math.floor(Math.random() * 10) + 1).toString();

        let pic = this.self.getChildByName('Pic') as Laya.Image;
        let rand = Math.floor(Math.random() * 3);

        switch (rand) {
            case 0:
                pic.skin = lwg.Enum.enemySkin.yellow;
                this.enemyType = lwg.Enum.enemyType.yellow;
                break;

            case 1:
                pic.skin = lwg.Enum.enemySkin.bule;
                this.enemyType = lwg.Enum.enemyType.bule;

                break;

            case 2:
                pic.skin = lwg.Enum.enemySkin.green;
                this.enemyType = lwg.Enum.enemyType.green;

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