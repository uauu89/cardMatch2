import { useShallow } from "zustand/shallow";
import IconRoateRight from "../../assets/icons/IconRoateRight";
import "./GameButton.css"
import { useGameStore } from "../../stores/useGameStore";
import { useCardsStore } from "../../stores/useCardsStore";
import { syncDelay } from "../../utils";
import { useScoreStore } from "../../stores/useScoreStore";
import { useUIStore } from "../../stores/useUIStore";


interface GameButtonProps {
    inputGameMode: "single" | "vs";
}



const GameButton = ({inputGameMode} : GameButtonProps)=>{

    const { setGameMode, setGamePhase, setTurnState, setCardChecking, applyGameOption, determineFirstPlayer } = useGameStore(useShallow(state => ({
        setGameMode: state.setGameMode,
        setGamePhase: state.setGamePhase,
        setTurnState: state.setTurnState,
        setCardChecking: state.setCardChecking,
        applyGameOption: state.applyGameOption,
        determineFirstPlayer: state.determineFirstPlayer,
    })));

    const shuffleCards = useCardsStore(state=>state.shuffleCards);
    const clearCards = useCardsStore(state=>state.clearCards);

    const clearScore = useScoreStore(state => state.clearScore);

    const close_modalSettings = useUIStore(state => state.close_modalSettings);


    const process_gameStart = async () => {
        close_modalSettings();
        clearCards();
        clearScore();
        applyGameOption();
        setGameMode(inputGameMode);
        setGamePhase("gameStart");
        setCardChecking("ready");
        determineFirstPlayer();

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