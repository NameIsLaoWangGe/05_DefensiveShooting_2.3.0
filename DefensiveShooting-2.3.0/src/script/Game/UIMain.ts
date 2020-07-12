import { lwg, EventAdmin } from "../Lwg_Template/lwg";
import RecordManager from "../../TJ/RecordManager";
import ADManager, { TaT } from "../../TJ/Admanager";
import UIMain_Enemy from "./UIMain_Enemy";
import UIMain_Protagonist from "./UIMain_Protagonist";
import UIMain_Bullet from "./UIMain_Bullet";
import { GEnum, G } from "../Lwg_Template/GameControl";

export default class UIMain extends lwg.Admin.Scene {
    /** @prop {name:Enemy, tips:"敌人", type:Prefab, default:true}*/
    public Enemy: Laya.Prefab;
    /** @prop {name:Bullet, tips:"敌人", type:Prefab, default:true}*/
    public Bullet: Laya.Prefab;

    /**
     * 当前发射子弹类型
     */
    launchType: string;
    /**记录当前应该攻击什么怪物，是离自己最近的*/

    selfVars(): void {

    }

    lwgInit(): void {
        this.timer = 0;
        this.bulletNum = 0;
        this.self['Protagonist'].addComponent(UIMain_Protagonist);
        lwg.Global._gameStart = true;
        this.self['GuideLine'].alpha = 0;
        this.touchColor = null;

    }


    /**子弹数量*/
    bulletNum: number;
    createEnemy(): Laya.Sprite {
        let enemy: Laya.Sprite;
        enemy = Laya.Pool.getItemByCreateFun('enemy', this.Enemy.create, this.Enemy);
        this.self['EnemyParent'].addChild(enemy);
        let randX = enemy.width / 2 + (Laya.stage.width - enemy.width / 2 * 2) * Math.random();
        enemy.addComponent(UIMain_Enemy);
        enemy.pos(randX, 0);
        enemy.zOrder = 0;
        this.bulletNum++;
        return enemy;
    }

    createBullet(x, y): Laya.Sprite {
        let bullet: Laya.Sprite;
        bullet = Laya.Pool.getItemByCreateFun('bullet', this.Bullet.create, this.Bullet);
        this.self['BulletParent'].addChild(bullet);
        bullet.pos(x, y);
        bullet.zOrder = 0;
        bullet.addComponent(UIMain_Bullet);

        let pic = bullet.getChildByName('Pic') as Laya.Image;
        switch (this.launchType) {
            case GEnum.bulletType.yellow:
                pic.skin = GEnum.bulletSkin.yellow;
                bullet['UIMain_Bullet'].bulletType = GEnum.bulletType.yellow;
                break;
            case GEnum.bulletType.bule:
                pic.skin = GEnum.bulletSkin.bule;
                bullet['UIMain_Bullet'].bulletType = GEnum.bulletType.bule;
                break;
            case GEnum.bulletType.green:
                pic.skin = GEnum.bulletSkin.green;
                bullet['UIMain_Bullet'].bulletType = GEnum.bulletType.green;

                break;

            default:
                break;
        }
        G.bulletNum++;
        return bullet;
    }

    btnOnClick(): void {
        lwg.Click.on(lwg.Click.ClickType.noEffect, null, this.self['BtnYellow'], this, this.clickDwon, null, null, null);
        lwg.Click.on(lwg.Click.ClickType.noEffect, null, this.self['BtnBlue'], this, this.clickDwon, null, null, null);
        lwg.Click.on(lwg.Click.ClickType.noEffect, null, this.self['BtnGreen'], this, this.clickDwon, null, null, null);
    }

    touchColor: Laya.Sprite;
    clickDwon(e: Laya.Event): void {
        this.touchColor = e.currentTarget;
        // console.log(this.touchColor);
        switch (this.touchColor.name) {
            case 'BtnYellow':
                this.launchType = GEnum.bulletType.yellow;
                this.self['BtnYellow'].scale(1.1, 1.1);
                this.self['BtnBlue'].scale(1, 1);
                this.self['BtnGreen'].scale(1, 1);

                this.self['GuideLine'].x = this.self['BtnYellow'].x;
                this.self['GuideLine'].y = this.self['BtnYellow'].y;
                this.self['GuideLine'].alpha = 1;
                break;
            case 'BtnBlue':
                this.launchType = GEnum.bulletType.bule;
                this.self['BtnYellow'].scale(1, 1);
                this.self['BtnBlue'].scale(1.1, 1.1);
                this.self['BtnGreen'].scale(1, 1);

                this.self['GuideLine'].x = this.self['BtnBlue'].x;
                this.self['GuideLine'].y = this.self['BtnBlue'].y;
                this.self['GuideLine'].alpha = 1;


                break;
            case 'BtnGreen':
                this.launchType = GEnum.bulletType.green;
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
            this.self['GuideLine'].rotation = lwg.Tools.vectorAngle(movePoint.x, movePoint.y) - 90;
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
                let bullet = this.createBullet(this.touchColor.x, this.touchColor.y) as Laya.Sprite;
                let movePoint = new Laya.Point(x - this.touchColor.x, y - this.touchColor.y);
                movePoint.normalize();
                // console.log(movePoint);
                bullet.getComponent(UIMain_Bullet).movePoint = movePoint;
                bullet.rotation = this.self['GuideLine'].rotation;
            }
        }
        this.self['GuideLine'].alpha = 0;
        // this.touchColor.rotation = 0;
        this.touchColor = null;
    }


    timer: number = 0;
    lwgOnUpdate(): void {
        if (lwg.Global._gameStart) {
            if (this.timer % 180 === 0) {
                this.createEnemy();
            }
            this.timer++;
        }
    }
}