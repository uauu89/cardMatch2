import Score from "./Score";
import Timer from "./Timer";
import GameButton from "../ui/GameButton";

import "./GameHUD.css";
import { useGameStore } from "../../stores/useGameStore";


interface HudProps{
    // modal_settings: boolean;
    // setModal_settings: React.Dispatch<React.SetStateAction<boolean>>;
    // endRendering: boolean;
    gamePhase: "ready" | "gameOver" | "gameStart" | "dealing" | "playing";
    opt_timer: number;
}

const GameHUD = ()=>{

    const currentPlayer = useGameStore(state => state.currentPlayer);
    return (
        <div className="GameHUD">
            <Score />
            <div>
                {currentPlayer}
            </div>
            <Timer />
            <div className="GameButton__container">
                <GameButton inputGameMode="single"/>
                <GameButton inputGameMode="vs"/>
            </div>

           

            
        </div>
    )
}

export default GameHUD;