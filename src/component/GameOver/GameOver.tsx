import { useShallow } from "zustand/shallow";
import { useGameStore } from "../../stores/useGameStore";
import { useScoreStore } from "../../stores/useScoreStore";
import GameButton from "../ui/GameButton";
import "./GameOver.css"

const getResultMessage = (gameMode: "single" | "vs", playerScore: number, comScore: number) => {
    if(gameMode === "single"){
        return {
            result: "게임 종료",
            score: `최종점수 : ${playerScore}점`
        }
    }

    if(playerScore > comScore){
        return {
            result: "승리",
            score: `${playerScore}점 : ${comScore}점으로 승리했습니다.`
        }
    }

    if(playerScore < comScore){
        return {
            result: "패배",
            score: `${playerScore}점 : ${comScore}점으로 패배했습니다.`
        }
    }
    
    return{
        result: "무승부",
        score: `${playerScore}점 : ${comScore}점으로 무승부입니다.`
    }
    
}

const GameOver = ()=>{
    const {gamePhase, gameMode} = useGameStore(useShallow(state => ({
        gamePhase: state.gamePhase,
        gameMode: state.gameMode,
    })));
    const {playerScore, comScore} = useScoreStore(useShallow(state => ({
        playerScore: state.playerScore,
        comScore: state.comScore,
    })));

    if(gamePhase === "welcome") {
        return (
            <div className="GameOver__bg">
                <div className="GameOver__window">
                    <div className="GameOver_welcomePrompt">
                        <p>환영합니다</p>
                        새 게임 버튼으로 게임을 시작할 수 있습니다.
                    </div>
                    <div className="GameButtonWrap">
                        <GameButton inputGameMode="single"/>
                        <GameButton inputGameMode="vs"/>
                    </div>
                </div>
            </div>
        )

    }
  
    const {result, score} = getResultMessage(gameMode, playerScore, comScore);

    return (
        <div className="GameOver__bg">
            <div className="GameOver__window">
                <h2 className="GameOver__result">{result}</h2>
                <p>{score}</p>
                
                <div className="GameOver_restartPrompt">
                    <p>게임이 끝났습니다.</p>
                    <p>새 게임 버튼으로 새로운 게임을 시작할 수 있습니다.</p>
                </div>

                <div className="GameButtonWrap">
                    <GameButton inputGameMode="single"/>
                    <GameButton inputGameMode="vs"/>
                </div>
            </div>


        </div>

    )
}

export default GameOver;