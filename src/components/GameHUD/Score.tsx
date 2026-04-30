import { useGameStore } from "@stores/useGameStore";
import { useScoreStore } from "@stores/useScoreStore";
import "./Score.css"

const Score = ()=>{

    const gamePhase = useGameStore(state => state.gamePhase);
    const gameMode = useGameStore(state => state.gameMode);

    const playerScore = useScoreStore(state => state.playerScore);
    const playerCombo = useScoreStore(state => state.playerCombo);
    const comScore = useScoreStore(state => state.comScore);
    const comCombo = useScoreStore(state => state.comCombo);

    if(gamePhase === "welcome") return null;
    
    return(
        <div className="Score">
            <div className="score__row">
                <div className="scoreDisplay__score">유저 : {playerScore}</div>
                <div className="scoreDisplay__combo">콤보 : {playerCombo}</div>
            </div>
            {gameMode === "vs" && (
                <div className="score__row">
                    <div className="scoreDisplay__score">컴퓨터 : {comScore}</div>
                    <div className="scoreDisplay__combo">콤보 : {comCombo}</div>
                </div>
            )}
        </div>
    )
}

export default Score;