import { useScoreStore } from "../../stores/useScoreStore";
import "./Score.css"

const Score = ()=>{

    const playerScore = useScoreStore(state => state.playerScore);
    const playerCombo = useScoreStore(state => state.playerCombo);
    const aiScore = useScoreStore(state => state.aiScore);
    const aiCombo = useScoreStore(state => state.aiCombo);

    return(
        <div className="Score">
            <div className="score__row">
                <div className="scoreDisplay__score">유저 : {playerScore}</div>
                <div className="scoreDisplay__combo">콤보 : {playerCombo}</div>
            </div>

            <div className="score__row">
                <div className="scoreDisplay__score">컴퓨터 : {aiScore}</div>
                <div className="scoreDisplay__combo">콤보 : {aiCombo}</div>
            </div>
        </div>
    )
}

export default Score;