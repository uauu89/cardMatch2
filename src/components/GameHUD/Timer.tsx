import { useEffect, useState } from "react";
import { useCardsStore } from "@stores/useCardsStore";
import { useGameStore } from "@stores/useGameStore";
import { checkGameVersion, syncDelay } from "@utils/index";

import "./Timer.css"
import Spinner from "@/assets/svg/Spinner";


interface TimerProps{
    duration: number;
}

const Timer = ({duration}: TimerProps) => {
    
    const [timeRemaining, setTimeRemaining] = useState(duration);
    const endTurn_timeOut = useGameStore(state => state.endTurn_timeOut);
    const setNextPlayer = useGameStore(state => state.setNextPlayer);

    const resetOpenedCards= useCardsStore(state => state.resetOpenedCards);
    const setTurnState = useGameStore(state => state.setTurnState);

    const skipTurn = async () => {
        const {gameVersion} = useGameStore.getState();
        
        resetOpenedCards();

        await syncDelay(500);
        if(checkGameVersion(gameVersion)) return;

        setNextPlayer();
        setTurnState("active");
    }

    useEffect(()=>{
        const TimerID = window.setInterval(() => {
            setTimeRemaining(prev => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => window.clearInterval(TimerID);            
    }, []);

    useEffect(()=>{
        if(timeRemaining === 0) {
            endTurn_timeOut();
            skipTurn();
        }
    }, [timeRemaining])

    return(
        <div className="Timer">
            <Spinner
                id={"timer"}
                type={"timer"}
                // strokeColor={"#f678ac"}
                timerDuration={duration}
                r={22}
                strokeWidth={4}
            />
            <div className="TimerNumber">
                {timeRemaining}
            </div>
            
        </div>
    )
}

export default Timer;