import { useEffect, useRef, useState } from "react";
import "./Timer.css"
import { useGameStore } from "../../stores/useGameStore";
import { useCardsStore } from "../../stores/useCardsStore";

const Timer = ()=>{

    const gamePhase = useGameStore(state => state.gamePhase);
    const turnState = useGameStore(state => state.turnState);
    const opt_timerDuration = useGameStore(state => state.opt_timerDuration);
    const opt_timerNoLimit = useGameStore(state => state.opt_timerNoLimit);
    const setTurnState = useGameStore(state => state.setTurnState);

    const resetOpenedCards = useCardsStore(state => state.resetOpenedCards);
    
    const timerRef = useRef<number | null>(null);
    const turnActiveRef = useRef <number | null>(null);
    const [timerOn, setTimerOn] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(opt_timerDuration);

    useEffect(()=>{
        if(turnActiveRef.current) {
            clearTimeout(turnActiveRef.current);
            turnActiveRef.current = null;
        }

        if(gamePhase === "playing" && turnState === "active" && !opt_timerNoLimit){
            setTimeRemaining(opt_timerDuration);
            setTimerOn(true);
        }else{
            setTimerOn(false);
            if(gamePhase === "playing" && turnState === "transition"){

                turnActiveRef.current = window.setTimeout(()=>{
                    setTurnState("active");
                    turnActiveRef.current = null;
                }, 500)

            }
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
        
        timerRef.current = window.setInterval(()=>{
            setTimeRemaining(prev=>{
                if(prev <= 1){
                    clearInterval(timerRef.current!);
                    timerRef.current = null;
                    resetOpenedCards();
                    setTimerOn(false);
                    setTurnState("transition");

                    turnActiveRef.current = window.setTimeout(()=>{
                        setTurnState("active");
                        turnActiveRef.current = null;
                    }, 500)
                    
                    return 0;
                }
                return prev -1;
            });
        }, 1000);

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }
            if(turnActiveRef.current) {
                clearTimeout(turnActiveRef.current);
                turnActiveRef.current = null;
            }
        }

       

    }, [timerOn])

    return(
        <div className="Timer">
            {timerOn && gamePhase==="playing" && timeRemaining}
        </div>
    )
}

export default Timer;