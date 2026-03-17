import Score from "./Score";
import Timer from "./Timer";
import GameButton from "../ui/GameButton";

import "./GameHUD.css";


interface HudProps{
    modal_settings: boolean;
    setModal_settings: React.Dispatch<React.SetStateAction<boolean>>;
}

const GameHUD = ()=>{

    return (
        <div className="GameHUD">
            <Score />
            <Timer />
            <div className="GameButton__container">
                <GameButton gameMode="single"/>
                <GameButton gameMode="vs"/>
            </div>

           

            
        </div>
    )
}

export default GameHUD;