import { useEffect, useState } from "react";
import "./Timer.css"
import { useGameStore } from "../../stores/useGameStore";


interface TimerProps{
    duration: number;
    onTimeOut: () => void;
}

const Timer = ({duration, onTimeOut}: TimerProps) => {
    
    const [timeRemaining, setTimeRemaining] = useState(duration);
    const turnTransition = useGameStore(state => state.turnTransition);
    const setTurnState = useGameStore(state => state.setTurnState);

    useEffect(()=>{
        const TimerID = window.setInterval(() => {
            setTimeRemaining(prev => (prev > 0 ? prev - 1 : 0));
        }, 1000);

        return () => window.clearInterval(TimerID);            
    }, []);

    useEffect(()=>{
        if(timeRemaining === 0) {
            // setTurnState("transition");
            onTimeOut();
            turnTransition();
        }
    }, [timeRemaining])

    return(
        <div className="Timer">
            {timeRemaining}
        </div>
    )
}

export default Timer;