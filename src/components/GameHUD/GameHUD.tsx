
import Score from "./Score";
import StatusDisplay from "./StatusDisplay";
import GameButton from "@components/ui/GameButton";

import "./GameHUD.css";

const GameHUD = ()=>{

    
    return (
        <div className="GameHUD">
            <Score />
            <StatusDisplay />
            
            <div className="GameButton__container">
                <GameButton inputGameMode="single"/>
                <GameButton inputGameMode="vs"/>
            </div>
        </div>
    )
}

export default GameHUD;