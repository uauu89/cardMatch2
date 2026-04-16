import { useEffect, useState } from "react";
import { useCardsStore } from "@stores/useCardsStore";
import { useGameStore } from "@stores/useGameStore";
import { checkGameVersion, syncDelay } from "@utils/index";

import "./Timer.css"


interface TimerProps{
    duration: number;
    handleTimeOut: () => void;
}

const Timer = ({duration, handleTimeOut}: TimerProps) => {
    
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
            handleTimeOut();
            endTurn_timeOut();
            skipTurn();
        }
    }, [timeRemaining])

    return(
        <div className="Timer">
            {timeRemaining}
        </div>
    )
}

export default Timer;