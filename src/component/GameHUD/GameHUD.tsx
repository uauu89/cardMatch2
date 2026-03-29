import Score from "./Score";
import Timer from "./Timer";
import GameButton from "../ui/GameButton";

import "./GameHUD.css";


interface HudProps{
    // modal_settings: boolean;
    // setModal_settings: React.Dispatch<React.SetStateAction<boolean>>;
    endRendering: boolean;
    opt_timer: number;
}

const GameHUD = ({endRendering, opt_timer} : HudProps)=>{

    return (
        <div className="GameHUD">
            <Score />
            <Timer endRendering={endRendering} opt_timer={opt_timer}/>
            <div className="GameButton__container">
                <GameButton gameMode="single"/>
                <GameButton gameMode="vs"/>
            </div>

           

            
        </div>
    )
}

export default GameHUD;