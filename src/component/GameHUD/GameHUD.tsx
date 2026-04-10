import Score from "./Score";
import GameButton from "../ui/GameButton";
import StatusDisplay from "./StatusDisplay";
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