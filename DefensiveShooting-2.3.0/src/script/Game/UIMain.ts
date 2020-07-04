import { lwg } from "../Lwg_Template/lwg";
import RecordManager from "../../TJ/RecordManager";
import ADManager, { TaT } from "../../TJ/Admanager";

export default class UIMain extends lwg.Admin.Scene {
    /** @prop {name:Enemy, tips:"敌人", type:Prefab, default:true}*/
    public Enemy: Laya.Prefab;

    constructor() {
        super();
    }
    lwgInit(): void {
        this.timer = 0;
        console.log(lwg.Admin._sceneControl);
    }
    createEnemy(): void {
        let enemy: Laya.Sprite;
        enemy = Laya.Pool.getItemByCreateFun('enemy', this.Enemy.create, this.Enemy);
        this.self.addChild(enemy);
        let randX = enemy.width / 2 + (Laya.stage.width - enemy.width / 2 * 2) * Math.random();
        enemy.pos(randX, 0);
        enemy.zOrder = 0;
    }
    timer: number = 0;
    lwgOnUpdate(): void {
        if (lwg.Global._gameLevel) {
            this.timer++;
            if (this.timer % 60 === 0) {
                // this.createEnemy();
            }
        }
    }

}