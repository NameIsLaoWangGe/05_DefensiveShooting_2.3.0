import { lwg } from "../Lwg_Template/lwg";

export default class UIMain_Bullet extends lwg.Admin.Object {

    /**当前锁定的目标*/
    targetEnemy: Laya.Sprite = new Laya.Sprite();
    /**子弹状态*/
    bulletState: number;
    /**子弹类型*/
    bulletType: string;

    /**移动方向的单位向量*/
    movePoint: Laya.Point;
    lwgInit(): void {
        this.bulletState = 0;
        let enemy = (this.selfScene['EnemyParent'] as Laya.Sprite).getChildAt(0) as Laya.Sprite;
        if (enemy) {
            this.targetEnemy = enemy;
        };
    }
    onTriggerEnter(other: Laya.BoxCollider, self: Laya.BoxCollider): void {
        let otherOwner = other.owner as Laya.Sprite;
        if (other.label === 'enemy') {
            let num = otherOwner.getChildByName('Num') as Laya.Label;
            if (Number(num.text) <= 1) {
                otherOwner.removeSelf();
            } else {
                if (otherOwner['UIMain_Enemy'].enemyType === this.bulletType) {
                    num.text = (Number(num.text) - 2).toString();
                } else {
                    // num.text = (Number(num.text) - 1).toString();
                }
            }
            this.self.removeSelf();
        }
    }

    speed: number = 20;
    lwgOnUpdate(): void {
        if (this.movePoint) {
            //     let point;
            //     if (this.targetEnemy.parent) {
            //         this.bulletState = 1;
            //         point = new Laya.Point(this.self.x - this.targetEnemy.x, this.self.y - this.targetEnemy.y);
            //     } else {
            //         if (this.bulletState === 1) {
            //             point = new Laya.Point(this.selfScene['Protagonist'].x - this.self.x, this.selfScene['Protagonist'].y - this.self.y);
            //         } else {
            //             this.self.removeSelf();
            //             return;
            //         }
            //     }
            //     point.normalize();
            this.self.x -= this.speed * this.movePoint.x;
            this.self.y -= this.speed * this.movePoint.y;

            if (this.self.y < -100) {
                this.self.removeSelf();
            }
        }
    }
}