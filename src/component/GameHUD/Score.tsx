import "./Score.css"

const Score = ()=>{

    return(
        <div className="Score">
            <div className="score__row">
                <div className="scoreDisplay__score">유저 : 0</div>
                <div className="scoreDisplay__combo">콤보 : 0</div>
            </div>

            <div className="score__row">
                <div className="scoreDisplay__score">컴퓨터 : 0</div>
                <div className="scoreDisplay__combo">콤보 : 0</div>
            </div>
        </div>
    )
}

export default Score;