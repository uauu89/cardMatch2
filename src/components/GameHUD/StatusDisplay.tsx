import { useCallback, useEffect, useState } from "react";
import { useGameStore } from "@stores/useGameStore";
import Timer from "./Timer"
import ComStatus from "./ComStatus";

import "./StatusDisplay.css"
import Spinner from "@svg/Spinner";
import Infinity from "@svg/Infinity";

const StatusDisplay = () => {
    const gamePhase = useGameStore(state => state.gamePhase);
    const turnState = useGameStore(state => state.turnState);
    const currentPlayer = useGameStore(state => state.currentPlayer);

    const opt_timerDuration = useGameStore(state => state.opt_timerDuration);
    const opt_timerNoLimit = useGameStore(state => state.opt_timerNoLimit);

    const [timerOn, setTimerOn] = useState(false);
    const handleTimeOut = useCallback(() => setTimerOn(false), []);
    
    useEffect(()=>{
        if(
            gamePhase === "playing"
            && turnState === "active"
            && currentPlayer !== "com"
            && !opt_timerNoLimit
        ){
            setTimerOn(true);
        }else{
            setTimerOn(false);
        }
    }, [gamePhase, turnState, currentPlayer]);
    
    return (
        <div className="StatusDisplay">
            {
                gamePhase === "playing" 
                    ? currentPlayer === "com"
                        ? <ComStatus />
                        : turnState === "active"
                            ? opt_timerNoLimit
                                ? <Infinity />
                                : timerOn && <Timer duration={opt_timerDuration} handleTimeOut={handleTimeOut}/>
                            : turnState === "transition" && <Spinner id={"transitionLoading"} type={"loading"} strokeColor={[]} r={20} strokeWidth={3}/>
                    : "" // 게임결과 상태
            }
            
            
        </div>
    )
}

export default StatusDisplay


