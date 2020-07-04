import { lwg } from "../Lwg_Template/lwg";
import RecordManager from "../../TJ/RecordManager";
import ADManager, { TaT } from "../../TJ/Admanager";

export default class UIMain extends lwg.Admin.Scene {
    constructor() {
        super();
    }
    lwgInit(): void {
        console.log(lwg.Admin._sceneControl);
    }

}