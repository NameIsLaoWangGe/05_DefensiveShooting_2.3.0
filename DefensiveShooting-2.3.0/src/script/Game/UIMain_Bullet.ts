import { lwg, EventAdmin } from "../Lwg_Template/lwg";
import { GEnum, G } from "../Lwg_Template/Global";


export default class UIMain_Bullet extends lwg.Admin.Object {

    /**当前锁定的目标*/
    targetEnemy: Laya.Sprite = new Laya.Sprite();
    /**子弹状态*/
    bulletState: string;
    /**子弹类型*/
    bulletType: string;
    /**移动方向的单位向量*/
    movePoint: Laya.Point;

    lwgOnEnable(): void {
        this.bulletState = GEnum.BulletState.attack;
     
    }

    onTriggerEnter(other: Laya.BoxCollider, self: Laya.BoxCollider): void {
        switch (other.label) {
            case 'enemy':
                this.bulletAndEnemy(other, self);
                break;
            case 'stone':
                this.bulletAndStone(other, self);
                break;
            default:
                break;
        }
    }

    bulletAndEnemy(other: Laya.BoxCollider, self: Laya.BoxCollider): void {
        let otherOwner = other.owner;
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
            this.accelerated = 0;

            this.reboundRotae = Math.floor(Math.random() * 2) === 1 ? Math.random() * this.speed / 3 + 10 : - Math.random() * this.speed / 3 + 10;
        }
    }

    bulletAndStone(other: Laya.BoxCollider, self: Laya.BoxCollider): void {
        this.bulletState = GEnum.BulletState.rebound;
        this.accelerated = 0;

        this.reboundRotae = Math.floor(Math.random() * 2) === 1 ? Math.random() * this.speed / 3 + 10 : - Math.random() * this.speed / 3 + 10;
    }

    /**旋转方向*/
    reboundRotae: number = 0;
    /**加速度*/
    accelerated: number = 0;
    /**移动速度*/
    speed: number = 80;
    lwgOnUpdate(): void {
        if (this.bulletState === GEnum.BulletState.attack) {
            for (let index = 0; index < (this.selfScene['EnemyParent'] as Laya.Sprite).numChildren; index++) {
                const element = (this.selfScene['EnemyParent'] as Laya.Sprite).getChildAt(index) as Laya.Sprite;
                if (element) {
                    let len = lwg.Tools.twoObjectsLen_2D(this.self, element);
                    if (len < 50) {
                        this.self.removeSelf();
                        element.removeSelf();
                        return;
                    }
                }
            }

            if (this.accelerated >= this.speed) {
                this.accelerated = 0;
                return;
            } else {
                this.accelerated -= 2;
            }

            this.self.x -= (this.speed + this.accelerated) * this.movePoint.x;
            this.self.y -= (this.speed + this.accelerated) * this.movePoint.y;
            if (this.self.y < -100 || this.self.y > Laya.stage.height || this.self.x > Laya.stage.width || this.self.x < 0) {
                this.self.removeSelf();
            }

        } else if (this.bulletState === GEnum.BulletState.rebound) {

            if (this.speed / 2 + this.accelerated <= 0) {
                this.self.alpha -= 0.05;
                if (this.self.alpha <= 0) {
                    this.self.removeSelf();
                }
            } else {
                this.self.rotation += this.reboundRotae;
                this.accelerated -= 2;
                this.self.x += (this.speed / 2 + this.accelerated) * this.movePoint.x;
                this.self.y += (this.speed / 2 + this.accelerated) * this.movePoint.y;
            }
        }


    }


}
