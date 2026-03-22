import IconRoateRight from "../../assets/icons/IconRoateRight";
import "./GameButton.css"


interface GameButtonProps {
    gameMode: string;
}



const GameButton = ({gameMode} : GameButtonProps)=>{

    return(
        <button type="button" className="GameButton">
            <IconRoateRight size={20} />
            <span className="btn__name">새 게임</span>
            <span className="btn__gameMode">
                {gameMode==="single"? "혼자" : "대전"}
            </span>
        </button>

    )
}


export default GameButton;