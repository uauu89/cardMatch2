import Score from "./Score";
import Timer from "./Timer";
import GameButton from "../ui/GameButton";

import "./GameHUD.css";


interface HudProps{
    // modal_settings: boolean;
    // setModal_settings: React.Dispatch<React.SetStateAction<boolean>>;
    // endRendering: boolean;
    gamePhase: "ready" | "gameOver" | "dealing" | "playing";
    opt_timer: number;
}

const GameHUD = ()=>{

    return (
        <div className="GameHUD">
            <Score />
            <Timer />
            <div className="GameButton__container">
                <GameButton inputGameMode="single"/>
                <GameButton inputGameMode="vs"/>
            </div>

           

            
        </div>
    )
}

export default GameHUD;