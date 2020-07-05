import { lwg } from "../Lwg_Template/lwg";

export default class UIMain_Bullet extends lwg.Admin.Object {

    lwgOnUpdate(): void {
        this.self.y -= 10;
        if (this.self.y < -100) {
            this.self.removeSelf();
        }
    }
}