import { useCallback, useEffect, useState } from "react";
import { useGameStore } from "../../stores/useGameStore";
import "./StatusDisplay.css"
import Timer from "./Timer"

/*
    gamePhase가 ready일 때
        1. 환영합니다 관련 아이콘 출력

    gamePhase가 dealing일 때
        1. 카드 아이콘이나 프로세스 진행 등의 아이콘 출력

    gamePhase가 playing일 때
        turnState가 transition일 때
            1. 스피너 출력
        turnState가 active일 때
            currentPlayer가 ai 일 때
            
                1. ai 상황 별 이모지 출력 (기획은 나중에)
                
            currentPlayer가 ai가 아닐 때
                opt_timerNoLimit가 true일 때
                    1. infinity icon 출력
                opt_timerNoLimit가 false일 때
                    1. 타이머 출력
    
    gamePhase가 gameOver일 때
        gameMode가 vs일 때
            1. score 비교해서 승리 / 패배 / 무승부 아이콘 출력
        gameMode가 single일 때
            1. 게임 완료 아이콘 (승리 아이콘을 동일하게 쓰거나 checker flag 아이콘)
*/


const StatusDisplay = () => {
    const gamePhase = useGameStore(state => state.gamePhase);
    const turnState = useGameStore(state => state.turnState);
    const currentPlayer = useGameStore(state => state.currentPlayer);

    const opt_timerDuration = useGameStore(state => state.opt_timerDuration);
    const opt_timerNoLimit = useGameStore(state => state.opt_timerNoLimit);

    const [timerOn, setTimerOn] = useState(false);
    const handleTimeOut = useCallback(() => setTimerOn(false), []);
    
    useEffect(()=>{
        if(
            gamePhase === "playing"
            && turnState === "active"
            && currentPlayer !== "ai"
            && !opt_timerNoLimit
        ){
            setTimerOn(true);
        }else{
            setTimerOn(false);
        }
    }, [gamePhase, turnState, currentPlayer]);
    
    return (
        <div className="StatusDisplay">
            { timerOn && <Timer duration={opt_timerDuration} handleTimeOut={handleTimeOut}/> }
        </div>
    )
}

export default StatusDisplay


