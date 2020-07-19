import { lwg, EventAdmin, Tools, Effects } from "../Lwg_Template/lwg";
import { GEnum, GVariate } from "../Lwg_Template/Global";


export default class UIMain_Bullet extends lwg.Admin.Object {

    /**子弹状态*/
    bulletState: string;
    /**子弹颜色*/
    bulletColor: string;
    /**移动方向的单位向量*/
    movePoint: Laya.Point;
    /**敌人父节点*/
    EnemyParent: Laya.Sprite;
    /**障碍物的父节点*/
    BarrierParent: Laya.Sprite;
    /**是谁发射的子弹*/
    whoFired: string;
    /**旋转方向*/
    reboundRotae: number = 0;
    /**加速度*/
    accelerated: number = 0;
    /**移动速度*/
    speed: number = 0;

    selfNode(): void {
        this.EnemyParent = this.selfScene['EnemyParent'];
        this.BarrierParent = this.selfScene['BarrierParent'];
    }
    lwgOnEnable(): void {
        this.bulletState = GEnum.BulletState.attack;
    }

    /**攻击敌人*/
    attackEnemy(): void {
        for (let index = 0; index < this.EnemyParent.numChildren; index++) {
            const enemy = this.EnemyParent.getChildAt(index) as Laya.Sprite;
            if (enemy) {
                let len = lwg.Tools.twoObjectsLen_2D(this.self, enemy);
                if (len < 50) {
                    let num = enemy.getChildByName('Num') as Laya.Label;
                    if (enemy['UIMain_Enemy'].enemyType === this.bulletColor) {
                        if (this.bulletState === GEnum.BulletState.attack) {
                            num.text = (Number(num.text) - 2).toString();
                            if (Number(num.text) <= 0) {
                                enemy.removeSelf();
                            }
                            this.self.removeSelf();
                        }
                    } else {
                        this.bulletState = GEnum.BulletState.rebound;
                        this.accelerated = 0;

                        this.reboundRotae = Math.floor(Math.random() * 2) === 1 ? Math.random() * this.speed / 3 + 10 : - Math.random() * this.speed / 3 + 10;
                    }
                    return;
                }
            }
        }
    }

    /**攻击一些特殊物体*/
    attackSpecialObj(): void {
        if (this.BarrierParent) {
            for (let index = 0; index < this.BarrierParent.numChildren; index++) {
                const specialObj = this.BarrierParent.getChildAt(index) as Laya.Sprite;;
                if (specialObj) {
                    let len = lwg.Tools.twoObjectsLen_2D(this.self, specialObj);
                    if (len < 50) {
                        switch (specialObj.name) {
                            case GEnum.SpecialObj.stone:
                                this.attackStone(specialObj);
                                break;
                            case GEnum.SpecialObj.commonSplit:
                                this.attackSplit(specialObj);
                                break;
                            case GEnum.SpecialObj.tree:
                                this.attackTree(specialObj);
                                break;
                            case GEnum.SpecialObj.bomb:
                                this.attackBomb(specialObj);
                                break;
                            default:
                                break;
                        }
                        return;
                    }
                }
            }
        }
    }

    /**
     * 和石头的碰撞
     * */
    attackStone(stone): void {
        // 石头生命值结束后会消失
        let Num = stone.getChildByName('Num') as Laya.Label;
        Num.text = (Number(Num.text) - 1).toString();
        if (Num.text <= '0') {
            stone.removeSelf();
            this.self.removeSelf();
        }
        // 改变子弹移动状态
        this.bulletState = GEnum.BulletState.rebound;
        this.accelerated = 0;

        this.reboundRotae = Math.floor(Math.random() * 2) === 1 ? Math.random() * this.speed / 3 + 10 : - Math.random() * this.speed / 3 + 10;
    }

    /**
      * 和分裂装置的碰撞
      * 碰撞之后会消失，然后分裂成数个子弹，向四周发射，威力不减
      * */
    attackSplit(split): void {
        if (this.whoFired !== GEnum.BulletWhoFired.split) {
            // 石头生命值结束后会消失
            let Num = split.getChildByName('Num') as Laya.Label;
            Num.text = (Number(Num.text) - 1).toString();
            if (Num.text <= '0') {
                split.removeSelf();
            }
            this.self.removeSelf();
            for (let index = 0; index < 4; index++) {
                EventAdmin.EventClass.notify(GEnum.EventType.createBullet, [GEnum.BulletWhoFired.split, this.bulletColor, null, split.x, split.y, Tools.angle_Vector(90 * index + 45), 45]);
            }
        }
    }

    /**
     * 和炸弹碰撞
     * 炸弹生命值变为零后，会爆炸，爆炸造成范围内大量伤害
     * */
    attackBomb(bomb): void {
        // 石头生命值结束后会消失
        let Num = bomb.getChildByName('Num') as Laya.Label;
        Num.text = (Number(Num.text) - 1).toString();
        if (Num.text <= '0') {
            Effects.createCommonExplosion(this.selfScene['EffectParent'], 20, bomb.x, bomb.y, 'star', 10, 15);
            for (let index = 0; index < this.EnemyParent.numChildren; index++) {
                const element = this.EnemyParent.getChildAt(index) as Laya.Sprite;
                let len = (new Laya.Point(bomb.x, bomb.y)).distance(element.x, element.y);
                if (len < 200) {
                    element.removeSelf();
                    index--;
                }
            }
            bomb.removeSelf();
        }
        this.self.removeSelf();
    }


    /**
      * 和分裂装置的碰撞
      * 碰撞之后会消失，然后分裂成数个子弹，向四周发射，威力不减
      * */
    attackTree(tree): void {
        if (this.whoFired !== GEnum.BulletWhoFired.tree) {
            // 石头生命值结束后会消失
            let Num = tree.getChildByName('Num') as Laya.Label;
            Num.text = (Number(Num.text) - 1).toString();
            if (Num.text <= '0') {
                tree.removeSelf();
            }
            this.whoFired = GEnum.BulletWhoFired.tree;
            this.speed /= 2;
        }

    }


    lwgOnUpdate(): void {
        if (this.bulletState === GEnum.BulletState.attack) {
            this.attackEnemy();
            this.attackSpecialObj();
            if (this.accelerated >= this.speed) {
                this.accelerated = 0;
                return;
            } else {
                // 最低速度不低于10
                if (this.speed + this.accelerated < 10) {
                } else {
                    this.accelerated -= 2;
                }
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
