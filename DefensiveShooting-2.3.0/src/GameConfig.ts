/**This class is automatically generated by LayaAirIDE, please do not make any modifications. */
import UILoding from "./script/Game/UILoding"
import UIMain from "./script/Game/UIMain"
/*
* 游戏初始化配置;
*/
export default class GameConfig{
    static width:number=720;
    static height:number=1280;
    static scaleMode:string="fixedwidth";
    static screenMode:string="none";
    static alignV:string="top";
    static alignH:string="left";
    static startScene:any="Scene/UILoding.scene";
    static sceneRoot:string="";
    static debug:boolean=false;
    static stat:boolean=false;
    static physicsDebug:boolean=false;
    static exportSceneToJson:boolean=true;
    constructor(){}
    static init(){
        var reg: Function = Laya.ClassUtils.regClass;
        reg("script/Game/UILoding.ts",UILoding);
        reg("script/Game/UIMain.ts",UIMain);
    }
}
GameConfig.init();