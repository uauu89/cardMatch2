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
    const [timerOn, setTimerOn] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState(opt_timerDuration);

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
        
        // timerRef.current = window.setInterval(()=>{
        //     setTimeRemaining(prev=>{
        //         if(prev <= 1){
        //             clearInterval(timerRef.current!);
        //             timerRef.current = null;
        //             resetOpenedCards();
        //             setTimerOn(false);
        //             setTurnState("transition");
        //             return 0;
        //         }
        //         return prev -1;
        //     });
        // }, 1000);

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
            // 타이머 중지
            if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }

            // 상태 변경 로직을 렌더링 사이클 밖에서 실행 (안전함)
            resetOpenedCards();
            setTimerOn(false);
            setTurnState("transition");

            // 비동기 처리도 여기서 수행
            // const handleTransition = async () => {
            //     await syncDelay(500);
            //     setTurnState("active");
            // };
            // handleTransition();
        }
    }, [timeRemaining, timerOn]); // timeRemaining이 0이 되는 순간을 감시

    return(
        <div className="Timer">
            {timerOn && gamePhase==="playing" && timeRemaining}
        </div>
    )
}

export default Timer;