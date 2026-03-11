import Score from "./Score";
import Timer from "./Timer";

import "./GameHUD.css";

const GameHUD = ()=>{

    return (
        <div className="GameHUD">
            <Score />
            <Timer />
            <div className="temp">
                option button
            </div>
            
        </div>
    )
}

export default GameHUD;