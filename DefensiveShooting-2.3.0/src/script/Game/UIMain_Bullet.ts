import { lwg, EventAdmin } from "../Lwg_Template/lwg";
import { G, GEnum } from "../Lwg_Template/GameControl";

export default class UIMain_Bullet extends lwg.Admin.Object {

    /**当前锁定的目标*/
    targetEnemy: Laya.Sprite = new Laya.Sprite();
    /**子弹状态*/
    bulletState: string;
    /**子弹类型*/
    bulletType: string;

    /**移动方向的单位向量*/
    movePoint: Laya.Point;
    lwgInit(): void {
        let enemy = (this.selfScene['EnemyParent'] as Laya.Sprite).getChildAt(0) as Laya.Sprite;
        if (enemy) {
            this.targetEnemy = enemy;
        };

        this.bulletState = GEnum.BulletState.attack;
    }
    onTriggerEnter(other: Laya.BoxCollider, self: Laya.BoxCollider): void {
        let otherOwner = other.owner as Laya.Sprite;
        if (other.label === 'enemy') {
            let num = otherOwner.getChildByName('Num') as Laya.Label;
            if (otherOwner['UIMain_Enemy'].enemyType === this.bulletType) {
                if (this.bulletState === GEnum.BulletState.attack) {
                    num.text = (Number(num.text) - 2).toString();
                    if (Number(num.text) <= 0) {
                        otherOwner.removeSelf();
                    }
                    this.self.removeSelf();
                }
            } else {
                this.bulletState = GEnum.BulletState.rebound;

                // 当前方向的反向向量
                let point = new Laya.Point(otherOwner.x - this.self.x, otherOwner.y - this.self.y);
            }
        }
    }


    /**反弹动画*/
    rebound(): void {

    }


    /**加速度*/
    accelerated: number = 0;
    /**移动速度*/
    speed: number = 70;
    lwgOnUpdate(): void {
        if (this.bulletState === GEnum.BulletState.attack) {
            if (this.accelerated >= this.speed) {
                this.accelerated = 0;
                return;
            } else {
                this.accelerated -= 1;
            }
            this.self.x -= (this.speed + this.accelerated) * this.movePoint.x;
            this.self.y -= (this.speed + this.accelerated) * this.movePoint.y;
            if (this.self.y < -100 || this.self.y > Laya.stage.height || this.self.x > Laya.stage.width || this.self.x < 0) {
                this.self.removeSelf();
            }
        } else if (this.bulletState === GEnum.BulletState.rebound) {
        }
    }
}
