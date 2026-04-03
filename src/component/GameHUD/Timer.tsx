import { useEffect, useRef, useState } from "react";
import "./Timer.css"
import { useOptionStore } from "../../stores/useOptionStore";
import { useGameStore } from "../../stores/useGameStore";

// interface TimerProps {
//     opt_timer: number;
//     gamePhase: "init" | "ready" | "dealing" | "playing";
// }

// const Timer = ({gamePhase, opt_timer} : TimerProps)=>{
const Timer = ()=>{

    // const opt_timerDuration = useOptionStore(state => state.opt_timerDuration);

    const {gamePhase, turnState, setTurnState} = useGameStore();
    const {opt_timerDuration, opt_timerNoLimit} = useOptionStore();
    
    const [timeRemaining, setTimeRemaining] = useState(opt_timerDuration);
    const timerRef = useRef<number | null>(null);

    const [timerOn, setTimerOn] = useState(true);

    /* timeRemain */



    useEffect(()=>{
        if(gamePhase === "playing" && !opt_timerNoLimit){
            setTimerOn(true);
        }
    }, [gamePhase])




    useEffect(()=>{
        if(!timerOn) return;

        timerRef.current = setInterval(()=>{
            setTimeRemaining(prev=>{
                if(prev <= 1){
                    setTimerOn(false);
                    return 0
                }
                return prev -1;
            });
            
        }, 1000);

        return ()=>{
            if(timerRef.current !== null) {
                clearInterval(timerRef.current);
                setTimeRemaining(opt_timerDuration);
            };
        };

    }, [timerOn])


    // useEffect(()=>{
    //     if(endRendering){
    //         console.log("timer Excute");
    //     }
    // }, [endRendering])

    return(
        <div className="Timer">

            {timerOn && gamePhase==="playing" && timeRemaining}
        </div>
    )
}

export default Timer;