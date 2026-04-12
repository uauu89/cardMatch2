import { useEffect, useState } from "react";
import "./Timer.css"
import { useGameStore } from "../../stores/useGameStore";


interface TimerProps{
    duration: number;
    handleTimeOut: () => void;
}

const Timer = ({duration, handleTimeOut}: TimerProps) => {
    
    const [timeRemaining, setTimeRemaining] = useState(duration);
    const endTurn_timeOut = useGameStore(state => state.endTurn_timeOut);

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
        }
    }, [timeRemaining])

    return(
        <div className="Timer">
            {timeRemaining}
        </div>
    )
}

export default Timer;