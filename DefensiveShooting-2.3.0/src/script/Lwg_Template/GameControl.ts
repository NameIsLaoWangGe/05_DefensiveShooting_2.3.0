/**全局方法,全局变量，每个游戏不一样*/
export module GameControl {
    /**游戏中用到的枚举*/
    export module GEnum {
        /**子弹类型*/
        export enum bulletType {
            yellow = 'yellow',
            bule = 'bule',
            green = 'green',
        }
        /**子弹图片地址*/
        export enum bulletSkin {
            yellow = 'Frame/UI/ui_square_011.png',
            bule = 'Frame/UI/ui_square_002.png',
            green = 'Frame/UI/ui_square_009.png',
        }


        /**子弹状态*/
        export enum BulletState {
            attack = 'attack',
            rebound = 'rebound',
            stone = 'stone'
        }

        /**敌人类型*/
        export enum enemyType {
            yellow = 'yellow',
            bule = 'bule',
            green = 'green',
        }

        /**敌人图片地址*/
        export enum enemySkin {
            yellow = 'Frame/UI/ui_square_011.png',
            bule = 'Frame/UI/ui_square_002.png',
            green = 'Frame/UI/ui_square_009.png',
        }

        /**敌人的状态*/
        export enum enemyState {
            move = 'move',
            stone = 'stone',
            await = 'stone',
        }

        /**敌人的状态*/
        export enum enemyMoveDir {
            up = 'up',
            left = 'left',
            down = 'down',
            right = 'right',
            stay = 'stay'
        }

    }
    /**控制游戏的全局变量*/
    export module G {
        /**子弹发射的数量*/
        export let bulletNum: number = 0;
    }
}

export let G = GameControl.G;
export let GEnum = GameControl.GEnum;

