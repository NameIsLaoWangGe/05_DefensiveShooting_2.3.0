/**全局方法,全局变量，每个游戏不一样*/
export module Global {

    /**控制游戏的全局变量*/
    export module GVariate {
        /**子弹发射的总数*/
        export let _bulletNum: number = 0;
        /**当前血量*/
        export let _currentBlood: number = 100;
        /**总血量*/
        export let _sumBlood: number = 100;
        /**当前关卡等级*/
        export let _gameLevel: number = 1;
        /**当前剩余体力*/
        export let _execution: number = 50;
        /**当前金币数量*/
        export let _goldNum: number = 50;
    }

    /**本地信息存储*/
    export module GData {
        let storageData: any;
        /**上传本地数据到缓存,一般在游戏胜利后和购买皮肤后上传*/
        export function addData(): void {
            storageData = {
                '_gameLevel': GVariate._gameLevel,
                '_execution': GVariate._execution,
                '_sumBlood': GVariate._sumBlood,
                '_goldNum': GVariate._goldNum,

            }
            // 转换成字符串上传
            let data: string = JSON.stringify(storageData);
            Laya.LocalStorage.setJSON('storageData', data);
        }

        /**获取本地数据，在onlode场景获取*/
        export function getData(): any {
            let storageData: string = Laya.LocalStorage.getJSON('storageData');
            if (storageData) {
                // 将字符串转换成json
                let data: any = JSON.parse(storageData);
                return data;
            } else {
                // 如果没有获取到则第一次上传的默认值
                GVariate._gameLevel = 1;
                GVariate._execution = 20;
                GVariate._sumBlood = 100;
                GVariate._goldNum = 0;
                return null;
            }
        }

        /**清除本地数据*/
        export function clearData(): void {
            Laya.LocalStorage.clear();
        }
    }


    /**游戏中用到的枚举*/
    export module GEnum {
        /**子弹颜色*/
        export enum bulletColor {
            yellow = 'yellow',
            bule = 'bule',
            green = 'green',
        }

        /**子弹特殊效果*/
        export enum bulletBuff {

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

        /**是谁发射的子弹,或者是子弹从什么物体上发出,目前的作用是防止反复与自己碰撞*/
        export enum BulletWhoFired {
            protagonist = 'protagonist',
            split = 'split',
            tree = 'tree',
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

        /**敌人的状态，用在承受特殊攻击的时候*/
        export enum enemyState {
            move = 'move',
            stone = 'stone',
            await = 'stone',
        }

        /**敌人的移动方向*/
        export enum enemyMoveDir {
            up = 'up',
            left = 'left',
            down = 'down',
            right = 'right',
            stay = 'stay'
        }

        /**敌人的移动方向*/
        export enum SpecialObj {
            /**石头*/
            stone = 'Stone',
            /**普通分裂装置*/
            commonSplit = 'CommonSplit',
            /**树*/
            tree = 'Tree',
            /**炸弹*/
            bomb = 'Bomb'
        }

        /**事件类型*/
        export enum EventType {
            createBullet = 'createBullet',
            createEnemy = 'createEnemy',
        }

    }
}
export let GVariate = Global.GVariate;
export let GEnum = Global.GEnum;
export let GData = Global.GData;
