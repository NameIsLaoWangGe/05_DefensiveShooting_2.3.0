import { lwg } from "../Lwg_Template/lwg";
import RecordManager from "../../TJ/RecordManager";
import ADManager, { TaT } from "../../TJ/Admanager";
import UIMain_Enemy from "./UIMain_Enemy";
import UIMain_Protagonist from "./UIMain_Protagonist";
import UIMain_Bullet from "./UIMain_Bullet";

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
            case lwg.Enum.bulletType.yellow:
                pic.skin = lwg.Enum.bulletSkin.yellow;
                bullet['UIMain_Bullet'].bulletType = lwg.Enum.bulletType.yellow;
                break;
            case lwg.Enum.bulletType.bule:
                pic.skin = lwg.Enum.bulletSkin.bule;
                bullet['UIMain_Bullet'].bulletType = lwg.Enum.bulletType.bule;
                break;
            case lwg.Enum.bulletType.green:
                pic.skin = lwg.Enum.bulletSkin.green;
                bullet['UIMain_Bullet'].bulletType = lwg.Enum.bulletType.green;

                break;

            default:
                break;
        }
        return bullet;
    }

    btnOnClick(): void {
        lwg.Click.on(lwg.Click.Type.noEffect, null, this.self['BtnYellow'], this, this.clickDwon, null, null, null);
        lwg.Click.on(lwg.Click.Type.noEffect, null, this.self['BtnBlue'], this, this.clickDwon, null, null, null);
        lwg.Click.on(lwg.Click.Type.noEffect, null, this.self['BtnGreen'], this, this.clickDwon, null, null, null);
    }

    touchColor: Laya.Sprite;
    clickDwon(e: Laya.Event): void {
        this.touchColor = e.currentTarget;
        console.log(this.touchColor);
        switch (this.touchColor.name) {
            case 'BtnYellow':
                this.launchType = lwg.Enum.bulletType.yellow;
                this.self['BtnYellow'].scale(1.1, 1.1);
                this.self['BtnBlue'].scale(1, 1);
                this.self['BtnGreen'].scale(1, 1);
                break;
            case 'BtnBlue':
                this.launchType = lwg.Enum.bulletType.bule;
                this.self['BtnYellow'].scale(1, 1);
                this.self['BtnBlue'].scale(1.1, 1.1);
                this.self['BtnGreen'].scale(1, 1);
                break;
            case 'BtnGreen':
                this.launchType = lwg.Enum.bulletType.green;
                this.self['BtnYellow'].scale(1, 1);
                this.self['BtnBlue'].scale(1, 1);
                this.self['BtnGreen'].scale(1.1, 1.1);
                break;

            default:
                break;
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
                // 赋予方向向量
                let movePoint = new Laya.Point(x - this.touchColor.x, y - this.touchColor.y);
                movePoint.normalize();
                // console.log(movePoint);
                bullet.getComponent(UIMain_Bullet).movePoint = movePoint;
                console.log(bullet.getComponent(UIMain_Bullet).movePoint);
            }
            this.touchColor = null;
        }



    }


    timer: number = 0;
    lwgOnUpdate(): void {
        if (lwg.Global._gameStart) {
            this.timer++;
            if (this.timer % 180 === 0) {
                this.createEnemy();
            }
        }
    }

}