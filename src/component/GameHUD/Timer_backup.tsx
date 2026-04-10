import { useEffect, useRef, useState } from "react";
import { useGameStore } from "../../stores/useGameStore";
import { useCardsStore } from "../../stores/useCardsStore";
import "./Timer.css"


interface TimerProps{
    duration: number;
}

const Timer = ({duration}: TimerProps) => {

    const gamePhase = useGameStore(state => state.gamePhase);
    const turnState = useGameStore(state => state.turnState);
    const opt_timerDuration = useGameStore(state => state.opt_timerDuration);
    const opt_timerNoLimit = useGameStore(state => state.opt_timerNoLimit);

    const setTurnState = useGameStore(state => state.setTurnState);
    const resetOpenedCards = useCardsStore(state => state.resetOpenedCards);
    
    const timerRef = useRef<number | null>(null);
    const [timerOn, setTimerOn] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(duration);

    useEffect(()=>{
        
        if(gamePhase === "playing" && turnState === "active" && !opt_timerNoLimit){
            setTimeRemaining(opt_timerDuration);
            setTimerOn(true);
        }else{
            setTimerOn(false);
        }
    }, [gamePhase, turnState]);

    useEffect(()=>{
        if(!timerOn){
            if(timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }
            return;
        };

        timerRef.current = window.setInterval(() => {
            setTimeRemaining(prev => (prev > 0 ? prev - 1 : 0));
        }, 1000);

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }
        }
    }, [timerOn]);

    useEffect(() => {
        if (timeRemaining === 0 && timerOn) {
            if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }
            resetOpenedCards();
            setTimerOn(false);
            setTurnState("transition");
        }
    }, [timeRemaining, timerOn]);

    return(
        <div className="Timer">
            {timerOn && gamePhase==="playing" && timeRemaining}
        </div>
    )
}

export default Timer;