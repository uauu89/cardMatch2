import { useShallow } from "zustand/shallow";
import IconRoateRight from "../../assets/icons/IconRoateRight";
import "./GameButton.css"
import { useGameStore } from "../../stores/useGameStore";
import { useCardsStore } from "../../stores/useCardsStore";
import { useOptionStore } from "../../stores/useOptionStore";


interface GameButtonProps {
    inputGameMode: "single" | "vs";
}



const GameButton = ({inputGameMode} : GameButtonProps)=>{

    const { setGameMode, setGamePhase, setTurnState } = useGameStore(useShallow(state => ({
        setGameMode: state.setGameMode,
        setGamePhase: state.setGamePhase,
        setTurnState: state.setTurnState,
    })));

    const opt_cardNum = useOptionStore(state => state.opt_cardNum);

    const shuffleCards = useCardsStore(state=>state.shuffleCards);
    const clearCards = useCardsStore(state=>state.clearCards);

    return(
        <button type="button"
            className="GameButton" onClick={()=>{
                setGameMode(inputGameMode);
                clearCards();
                setGamePhase("ready");
                
                setTimeout(()=>{
                    
                    shuffleCards(Number(opt_cardNum));
                    setTurnState("transition");
                    setGamePhase("dealing");

                }, 100)
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