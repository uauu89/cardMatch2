import Score from "./Score";
import Timer from "./Timer";

import "./GameHUD.css";
import GameButton from "../../ui/GameButton";

const GameHUD = ()=>{

    return (
        <div className="GameHUD">
            <Score />
            <Timer />
            <div className="GameButton__container">
                <GameButton gameMode="single"/>
                <GameButton gameMode="vs"/>
            </div>

            <button type="button" className="SettingButton"></button>
            
        </div>
    )
}

export default GameHUD;