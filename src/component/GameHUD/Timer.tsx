import { useEffect, useState } from "react";
import "./Timer.css"
import { useGameStore } from "../../stores/useGameStore";
import { useCardsStore } from "../../stores/useCardsStore";
import { checkGameVersion, syncDelay } from "../../utils";


interface TimerProps{
    duration: number;
    handleTimeOut: () => void;
}

const Timer = ({duration, handleTimeOut}: TimerProps) => {
    
    const [timeRemaining, setTimeRemaining] = useState(duration);
    const endTurn_timeOut = useGameStore(state => state.endTurn_timeOut);
    const setNextPlayer = useGameStore(state => state.setNextPlayer);

    const resetOpenedCards= useCardsStore(state => state.resetOpenedCards);
    const setCardChecking = useGameStore(state => state.setCardChecking);
    const setTurnState = useGameStore(state => state.setTurnState);

    const skipTurn = async () => {
        // await syncDelay(100);
        const {gameVersion} = useGameStore.getState();
        
        resetOpenedCards();

        await syncDelay(500);
        if(checkGameVersion(gameVersion)) return;

        setNextPlayer();
        setCardChecking("ready");
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