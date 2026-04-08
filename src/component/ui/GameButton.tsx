import { useShallow } from "zustand/shallow";
import IconRoateRight from "../../assets/icons/IconRoateRight";
import "./GameButton.css"
import { useGameStore } from "../../stores/useGameStore";
import { useCardsStore } from "../../stores/useCardsStore";
import { syncDelay } from "../../utils";
import { useScoreStore } from "../../stores/useScoreStore";


interface GameButtonProps {
    inputGameMode: "single" | "vs";
}



const GameButton = ({inputGameMode} : GameButtonProps)=>{

    const { setGameMode, setGamePhase, setTurnState, applyGameOption } = useGameStore(useShallow(state => ({
        setGameMode: state.setGameMode,
        setGamePhase: state.setGamePhase,
        setTurnState: state.setTurnState,
        applyGameOption: state.applyGameOption,
    })));

    const shuffleCards = useCardsStore(state=>state.shuffleCards);
    const clearCards = useCardsStore(state=>state.clearCards);

    const clearScore = useScoreStore(state => state.clearScore);


    const process_gameStart = async () => {
        clearCards();
        clearScore();
        applyGameOption();
        setGameMode(inputGameMode);
        setGamePhase("gameStart");

        await syncDelay(10);

        const {opt_cardNum} = useGameStore.getState();
        shuffleCards(opt_cardNum);
        setTurnState("transition");
        setGamePhase("dealing");
    }


    return(
        <button type="button"
            className="GameButton"
            onClick={process_gameStart}
        >
            <IconRoateRight size={20} />
            <span className="btn__name">새 게임</span>
            <span className="btn__gameMode">
                {inputGameMode==="single"? "혼자" : "대전"}
            </span>
        </button>

    )
}


export default GameButton;