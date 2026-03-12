import "./GameButton.css"

const GameButton = ()=>{

    return(
        <button type="button" className="GameButton">
            <span className="btn__icon">O</span>
            <span className="btn__name">새 게임</span>
            <span className="btn__gameMode">혼자</span>
        </button>

    )
}


export default GameButton;