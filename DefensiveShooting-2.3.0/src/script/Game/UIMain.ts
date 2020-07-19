import { lwg, EventAdmin, Click } from "../Lwg_Template/lwg";
import RecordManager from "../../TJ/RecordManager";
import ADManager, { TaT } from "../../TJ/Admanager";
import UIMain_Enemy from "./UIMain_Enemy";
import UIMain_Bullet from "./UIMain_Bullet";
import { GEnum, GVariate } from "../Lwg_Template/Global";

export default class UIMain extends lwg.Admin.Scene {
    /** @prop {name:Enemy, tips:"敌人", type:Prefab, default:true}*/
    public Enemy: Laya.Prefab;
    /** @prop {name:Bullet, tips:"敌人", type:Prefab, default:true}*/
    public Bullet: Laya.Prefab;

    /**
     * 当前发射子弹类型
     */
    launchColor: string;

    selfNode(): void {

    }

    lwgOnEnable(): void {
        this.bulletNum = 0;
        this.self['GuideLine'].alpha = 0;
        this.touchColor = null;
        lwg.Admin._gameStart = true;
        GVariate._currentBlood = GVariate._sumBlood;
        this.addBlood(0);

        EventAdmin.EventClass.reg(EventAdmin.EventType.gameOver, this, () => {
            this.GameOver();
        });

        EventAdmin.EventClass.reg(GEnum.EventType.createEnemy, this, () => {
            this.createEnemy();
        });

        EventAdmin.EventClass.reg(GEnum.EventType.createBullet, this, (whoFired, color, buff, x, y, movePoint, speed) => {
            this.createBullet(whoFired, color, buff, x, y, movePoint, speed);
        });

        Laya.timer.frameLoop(60, this, f => {
            if (!lwg.Admin._gameStart) {
                return;
            }
            EventAdmin.EventClass.notify(GEnum.EventType.createEnemy);
        });
    }

    /**游戏失败*/
    GameOver(): void {
        lwg.Admin._gameStart = false;
        this.btnOffClick();
    }

    /**
    * 血量变化
    * @param number 血量变化值，负数则减少血量
   */
    addBlood(number: number): void {
        GVariate._currentBlood += number;
        if (GVariate._currentBlood <= 0) {
            EventAdmin.EventClass.notify(EventAdmin.EventType.gameOver, );
        }
        let numStr = GVariate._currentBlood + '/' + GVariate._sumBlood;
        let Num = this.self['Blood'].getChildByName('Num') as Laya.Label;
        Num.text = numStr;
    }


    createEnemy(): Laya.Sprite {
        let enemy: Laya.Sprite;
        enemy = Laya.Pool.getItemByCreateFun('enemy', this.Enemy.create, this.Enemy);
        this.self['EnemyParent'].addChild(enemy);
        let randX = enemy.width / 2 + (Laya.stage.width - enemy.width / 2 * 2) * Math.random();
        enemy.addComponent(UIMain_Enemy);
        enemy.pos(randX, 0);
        enemy.zOrder = 0;
        return enemy;
    }

    /**子弹数量*/
    bulletNum: number;
    /**
     * 创建一个子弹
     * @param whoFired 谁发射的子弹
     * @param color 子弹颜色
     * @param buff 特殊效果
     * @param x 初始位置X
     * @param y 初始位置Y
     * @param movePoint 移动方向向量
     * @param speed 初始移动速度
     */
    createBullet(whoFired: string, color: string, buff: string, x: number, y: number, movePoint: Laya.Point, speed: number): Laya.Sprite {
        let bullet: Laya.Sprite;
        bullet = Laya.Pool.getItemByCreateFun('bullet', this.Bullet.create, this.Bullet);
        this.self['BulletParent'].addChild(bullet);
        bullet.pos(x, y);
        bullet.zOrder = 0;

        let script = bullet.addComponent(UIMain_Bullet);
        script.whoFired = whoFired;
        script.movePoint = movePoint;
        script.speed = speed;

        bullet.rotation = lwg.Tools.vector_Angle(movePoint.x, movePoint.y);

        let pic = bullet.getChildByName('Pic') as Laya.Image;
        switch (color) {
            case GEnum.bulletColor.yellow:
                pic.skin = GEnum.bulletSkin.yellow;
                script.bulletColor = GEnum.bulletColor.yellow;
                break;
            case GEnum.bulletColor.bule:
                pic.skin = GEnum.bulletSkin.bule;
                script.bulletColor = GEnum.bulletColor.bule;
                break;
            case GEnum.bulletColor.green:
                pic.skin = GEnum.bulletSkin.green;
                script.bulletColor = GEnum.bulletColor.green;

                break;

            default:
                break;
        }
        GVariate._bulletNum++;
        return bullet;
    }

    btnOnClick(): void {
        lwg.Click.on(Click.ClickType.noEffect, null, this.self['BtnYellow'], this, this.clickDwon, null, null, null);
        lwg.Click.on(Click.ClickType.noEffect, null, this.self['BtnBlue'], this, this.clickDwon, null, null, null);
        lwg.Click.on(Click.ClickType.noEffect, null, this.self['BtnGreen'], this, this.clickDwon, null, null, null);
    }
    btnOffClick(): void {
        lwg.Click.off(Click.ClickType.noEffect, this.self['BtnYellow'], this, this.clickDwon, null, null, null);
        lwg.Click.off(Click.ClickType.noEffect, this.self['BtnBlue'], this, this.clickDwon, null, null, null);
        lwg.Click.off(Click.ClickType.noEffect, this.self['BtnGreen'], this, this.clickDwon, null, null, null);
    }

    touchColor: Laya.Sprite;
    clickDwon(e: Laya.Event): void {
        this.touchColor = e.currentTarget;
        // console.log(this.touchColor);
        switch (this.touchColor.name) {
            case 'BtnYellow':
                this.launchColor = GEnum.bulletColor.yellow;
                this.self['BtnYellow'].scale(1.1, 1.1);
                this.self['BtnBlue'].scale(1, 1);
                this.self['BtnGreen'].scale(1, 1);

                this.self['GuideLine'].x = this.self['BtnYellow'].x;
                this.self['GuideLine'].y = this.self['BtnYellow'].y;
                this.self['GuideLine'].alpha = 1;
                break;
            case 'BtnBlue':
                this.launchColor = GEnum.bulletColor.bule;
                this.self['BtnYellow'].scale(1, 1);
                this.self['BtnBlue'].scale(1.1, 1.1);
                this.self['BtnGreen'].scale(1, 1);

                this.self['GuideLine'].x = this.self['BtnBlue'].x;
                this.self['GuideLine'].y = this.self['BtnBlue'].y;
                this.self['GuideLine'].alpha = 1;

                break;
            case 'BtnGreen':
                this.launchColor = GEnum.bulletColor.green;
                this.self['BtnYellow'].scale(1, 1);
                this.self['BtnBlue'].scale(1, 1);
                this.self['BtnGreen'].scale(1.1, 1.1);

                this.self['GuideLine'].x = this.self['BtnGreen'].x;
                this.self['GuideLine'].y = this.self['BtnGreen'].y;
                this.self['GuideLine'].alpha = 1;

                break;

            default:
                break;
        }
    }

    onStageMouseMove(e: Laya.Event): void {
        if (this.touchColor !== null) {
            let x = e.stageX;
            let y = e.stageY;
            let point = new Laya.Point(x, y);

            // 赋予方向向量
            let len = point.distance(this.touchColor.x, this.touchColor.y);
            let line = this.self['GuideLine'].getChildByName('Line') as Laya.Image;
            line.height = len;

            let movePoint = new Laya.Point(x - this.touchColor.x, y - this.touchColor.y);
            this.self['GuideLine'].rotation = lwg.Tools.vector_Angle(movePoint.x, movePoint.y);
            this.touchColor.rotation = this.self['GuideLine'].rotation;

            this.self[this.touchColor.name]
        }
    }

    onStageMouseUp(e: Laya.Event): void {
        let x = e.stageX;
        let y = e.stageY;
        let point = new Laya.Point(x, y);
        // console.log(point);
        if (this.touchColor !== null) {
            let distance = point.distance(this.touchColor.x, this.touchColor.y);
            if (distance > 100) {
                let movePoint = new Laya.Point(x - this.touchColor.x, y - this.touchColor.y);
                movePoint.normalize();
                EventAdmin.EventClass.notify(GEnum.EventType.createBullet, [GEnum.BulletWhoFired.protagonist, this.launchColor, null, this.touchColor.x, this.touchColor.y, movePoint, 70]);
            }
        }
        this.self['GuideLine'].alpha = 0;
        // this.touchColor.rotation = 0;
        this.touchColor = null;
    }

    lwgOnUpdate(): void {

    }
}