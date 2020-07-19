import { lwg, Admin } from "../Lwg_Template/lwg";
import { GEnum, GVariate } from "../Lwg_Template/Global";

export default class UIMain_Enemy extends lwg.Admin.Object {

    /**怪物类型*/
    enemyType: string;
    /**敌人当前的状态*/
    enemyState: string;
    /**当前是否在和石头碰撞中*/
    stoneTime: boolean = false;
    /**移动速度*/
    speed: number;

    selfNode(): void {

    }

    lwgOnEnable(): void {
        this.moveDir = GEnum.enemyMoveDir.down;
        this.enemyState = GEnum.enemyState.move;
        let num = this.self.getChildByName('Num') as Laya.Label;
        num.text = (Math.floor(Math.random() * 3) + 1).toString();

        let pic = this.self.getChildByName('Pic') as Laya.Image;
        let rand = Math.floor(Math.random() * 3);

        switch (rand) {
            case 0:
                pic.skin = GEnum.enemySkin.yellow;
                this.enemyType = GEnum.enemyType.yellow;

                break;
            case 1:
                pic.skin = GEnum.enemySkin.bule;
                this.enemyType = GEnum.enemyType.bule;

                break;
            case 2:
                pic.skin = GEnum.enemySkin.green;
                this.enemyType = GEnum.enemyType.green;

                break;
            default:
                break;
        }
    }

    onTriggerEnter(other: Laya.BoxCollider, self: Laya.BoxCollider): void {
        switch (other.label) {
            case 'bullet':
                this.enemyAndEnemy(other, self);
                break;
            case 'stone':
                this.enemyAndStone(other, self);
                break;
            case 'enemy':
                this.enemyAndEnemy(other, self);
                break;
            default:
                break;
        }
    }

    /**当两个敌人碰撞的时候，两个会停以下，然后继续走，纪录停下之前的方向*/ 
    beforDir;
    enemyAndEnemy(other: Laya.BoxCollider, self: Laya.BoxCollider) {
        this.beforDir = this.moveDir;
        this.moveDir = GEnum.enemyMoveDir.stay;
        Laya.timer.frameOnce(30, this, f => {
            this.moveDir = this.beforDir;
            if (this.moveDir === GEnum.enemyMoveDir.stay) {
                if (this.stoneTime) {
                    Math.floor(Math.random() * 2) === 1 ? this.moveDir = GEnum.enemyMoveDir.left : this.moveDir = GEnum.enemyMoveDir.right;

                } else {
                    this.moveDir = GEnum.enemyMoveDir.down;
                }
            }
        });
    }

    enemyAndStone(other: Laya.BoxCollider, self: Laya.BoxCollider): void {
        this.stoneTime = true;
        Math.floor(Math.random() * 2) === 1 ? this.moveDir = GEnum.enemyMoveDir.left : this.moveDir = GEnum.enemyMoveDir.right;
    }

    onTriggerExit(other: Laya.BoxCollider, self: Laya.BoxCollider) {
        switch (other.label) {
            case 'bullet':
                break;
            case 'stone':
                this.stoneTime = false;
                this.moveDir = GEnum.enemyMoveDir.down;
                break;
            case 'enemy':
                break;
            default:
                break;
        }
    }

    /**移动规则*/
    moveRules(): void {
        if (this.moveDir === GEnum.enemyMoveDir.left) {
            if (this.stoneTime) {
                this.self.x--;
            } else {
                this.moveDir = GEnum.enemyMoveDir.down;
            }

        } else if (this.moveDir === GEnum.enemyMoveDir.right) {
            if (this.stoneTime) {
                this.self.x++;
            } else {
                this.moveDir = GEnum.enemyMoveDir.down;
            }

        } else if (this.moveDir === GEnum.enemyMoveDir.down) {
            this.self.y++;

        } else if (this.moveDir === GEnum.enemyMoveDir.up) {

            this.self.y++;
        }
    }

    /**移动方向*/
    moveDir: string = GEnum.enemyMoveDir.down;
    lwgOnUpdate(): void {
        if (!Admin._gameStart) {
            return;
        }
        this.moveRules();
        if (this.self.y >= this.selfScene['Blood'].y) {
            this.self.removeSelf();
            this.selfScene[lwg.Admin.SceneName.UIMain].addBlood(-1);
        }
    }
}