import { useEffect, useRef, useState } from "react";
import "./Timer.css"

interface TimerProps {
    opt_timer: number;
    gamePhase: "init" | "ready" | "dealing" | "playing";
}

const Timer = ({gamePhase, opt_timer} : TimerProps)=>{

    const [time, setTime] = useState(opt_timer);
    const timerRef = useRef<number | null>(null);
    const [timerRunning, setTimerRunning] = useState(true);



    useEffect(()=>{
        if(gamePhase === "playing"){
            setTimerRunning(true);
        }
    }, [gamePhase])




    useEffect(()=>{
        if(!timerRunning) return;
        timerRef.current = setInterval(()=>{
            setTime(prev=>{
                if(prev <= 1){
                    setTimerRunning(false);
                    return 0
                }
                return prev -1;
            });
            
        }, 1000);

        return ()=>{
            if(timerRef.current !== null) {
                clearInterval(timerRef.current);
                setTime(opt_timer);
            };
        };

    }, [timerRunning])


    // useEffect(()=>{
    //     if(endRendering){
    //         console.log("timer Excute");
    //     }
    // }, [endRendering])

    return(
        <div className="Timer">

            {timerRunning && gamePhase==="playing" && time}
        </div>
    )
}

export default Timer;