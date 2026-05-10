
import Score from "./Score";
import StatusDisplay from "./StatusDisplay";
import GameButton from "@components/ui/GameButton";

import "./GameHUD.css";
import IconCaretDown from "@/assets/icons/IconCaretDown";
import { useState } from "react";

const GameHUD = ()=>{
    const [isOpenButtonGroup, setIsOpenButtonGroup] = useState<boolean>(false);
    
    return (
        <div className="GameHUD">
            <Score />
            <StatusDisplay />

            <button type="button"
                className={`btnHudGameButton ${isOpenButtonGroup && "active"}`}
                onClick={() => {setIsOpenButtonGroup(prev => !prev)}}
            >
                <IconCaretDown size={"2em"}/>
            </button>

            <div className={`HudGameButton ${isOpenButtonGroup && "opend"}`}>
                {/* <div className="GameButton__container"> */}
                <div className="GameButtonWrap">
                    <GameButton inputGameMode="single"/>
                    <GameButton inputGameMode="vs"/>
                </div>
            </div>


        </div>
    )
}

export default GameHUD;