import { useEffect, useRef, useState } from "react";
import "./Timer.css"
import { useOptionStore } from "../../stores/useOptionStore";
import { useGameStore } from "../../stores/useGameStore";

const Timer = ()=>{

    const {gamePhase, turnState, setTurnState} = useGameStore();
    const {opt_timerDuration, opt_timerNoLimit} = useOptionStore();
    
    const timerRef = useRef<number | null>(null);
    const [timerOn, setTimerOn] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(Number(opt_timerDuration));

    useEffect(()=>{
        if(gamePhase === "playing" && turnState === "active" && !opt_timerNoLimit){
            setTimerOn(true);
        }
        if(turnState === "transition"){
            setTimerOn(false);
        }
    }, [gamePhase, turnState])

    useEffect(()=>{
        if(!timerOn) return;

        timerRef.current = setInterval(()=>{
            setTimeRemaining(prev=>{
                if(prev <= 1){
                    setTimerOn(false);
                    return 0;
                }
                return prev -1;
            });
            
        }, 1000);

        return ()=>{
            if(timerRef.current !== null) {
                console.log("timer > clear interval");
                clearInterval(timerRef.current);
                setTimeRemaining(Number(opt_timerDuration));
                setTurnState("transition");

                const {gamePhase,} = useGameStore.getState();

                if(gamePhase !== "gameOver"){
                    setTimeout(()=>{
                        setTimerOn(true);
                    }, 500)
                }
            };
        };

    }, [timerOn])

    return(
    
        <div className="Timer">

            {timerOn && gamePhase==="playing" && timeRemaining}
            
        </div>
       
    )
}

export default Timer;