import { useShallow } from "zustand/shallow";
import IconRoateRight from "../../assets/icons/IconRoateRight";
import "./GameButton.css"
import { useGameStore } from "../../stores/useGameStore";


interface GameButtonProps {
    inputGameMode: "single" | "vs";
}



const GameButton = ({inputGameMode} : GameButtonProps)=>{

    const { setGameMode, setGamePhase, setTurnState } = useGameStore(useShallow(state => ({
        setGameMode: state.setGameMode,
        setGamePhase: state.setGamePhase,
        setTurnState: state.setTurnState,
    })));

    return(
        <button type="button"
            className="GameButton" onClick={()=>{
                setGameMode(inputGameMode);
                setTurnState("transition");
                setGamePhase("dealing");
                
            }}>
            <IconRoateRight size={20} />
            <span className="btn__name">새 게임</span>
            <span className="btn__gameMode">
                {inputGameMode==="single"? "혼자" : "대전"}
            </span>
        </button>

    )
}


export default GameButton;