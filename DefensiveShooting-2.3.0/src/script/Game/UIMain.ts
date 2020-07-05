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
     * 子弹类型
     */
    bulletType: string;
    selfVars(): void {

    }

    lwgInit(): void {
        this.timer = 0;
        this.self['Protagonist'].addComponent(UIMain_Protagonist);
        lwg.Global._gameStart = true;
    }

    createEnemy(): void {
        let enemy: Laya.Sprite;
        enemy = Laya.Pool.getItemByCreateFun('enemy', this.Enemy.create, this.Enemy);
        this.self.addChild(enemy);
        let randX = enemy.width / 2 + (Laya.stage.width - enemy.width / 2 * 2) * Math.random();
        enemy.addComponent(UIMain_Enemy);
        enemy.pos(randX, 0);
        enemy.zOrder = 0;
    }

    createBullet(): void {
        let bullet: Laya.Sprite;
        bullet = Laya.Pool.getItemByCreateFun('bullet', this.Bullet.create, this.Bullet);
        this.self.addChild(bullet);
        bullet.pos(this.self['Protagonist'].x, this.self['Protagonist'].y);
        bullet.zOrder = 0;
        bullet.addComponent(UIMain_Bullet);
        console.log('创建子弹')
    }

    btnOnClick(): void {
        lwg.Click.on(lwg.Click.Type.noEffect, null, this.self['BtnYellow'], this, null, null, this.clickUp, null);
        lwg.Click.on(lwg.Click.Type.noEffect, null, this.self['BtnBlue'], this, null, null, this.clickUp, null);
        lwg.Click.on(lwg.Click.Type.noEffect, null, this.self['BtnGreen'], this, null, null, this.clickUp, null);
    }

    clickUp(e: Laya.Event): void {
        switch (e.currentTarget.name) {
            case 'BtnYellow':
                this.bulletType = lwg.Enum.bulletType.yellow;
                this.self['BtnYellow'].scale(1.1, 1.1);
                this.self['BtnBlue'].scale(1, 1);
                this.self['BtnGreen'].scale(1, 1);
                break;
            case 'BtnBlue':
                this.bulletType = lwg.Enum.bulletType.bule;
                this.self['BtnYellow'].scale(1, 1);
                this.self['BtnBlue'].scale(1.1, 1.1);
                this.self['BtnGreen'].scale(1, 1);
                break;
            case 'BtnGreen':
                this.bulletType = lwg.Enum.bulletType.green;
                this.self['BtnYellow'].scale(1, 1);
                this.self['BtnBlue'].scale(1, 1);
                this.self['BtnGreen'].scale(1.1, 1.1);
                break;

            default:
                break;
        }
    }


    timer: number = 0;
    lwgOnUpdate(): void {
        if (lwg.Global._gameStart) {
            this.timer++;
            if (this.timer % 60 === 0) {
                this.createEnemy();
            }
        }
    }

}