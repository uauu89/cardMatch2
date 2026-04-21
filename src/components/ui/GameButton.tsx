import { useShallow } from "zustand/shallow";

import { useCardsStore } from "@stores/useCardsStore";
import { useGameStore } from "@stores/useGameStore";
import { useScoreStore } from "@stores/useScoreStore";
import { useUIStore } from "@stores/useUIStore";

import { syncDelay } from "@utils/index";

import "./GameButton.css"
import IconRoateRight from "@icons/IconRoateRight";


interface GameButtonProps {
    inputGameMode: "single" | "vs";
}



const GameButton = ({inputGameMode} : GameButtonProps)=>{

    const { setGamePhase, gameInitialSetup, applyGameOption} = useGameStore(useShallow(state => ({
        setGamePhase: state.setGamePhase,
        applyGameOption: state.applyGameOption,
        gameInitialSetup: state.gameInitialSetup,
    })));

    const shuffleCards = useCardsStore(state=>state.shuffleCards);
    const clearCards = useCardsStore(state=>state.clearCards);
    const clearScore = useScoreStore(state => state.clearScore);
    // const close_modalSettings = useUIStore(state => state.close_modalSettings);
    const {close_modalSettings, reset_bgGameOver} = useUIStore.getState();


    const process_gameStart = async () => {
        close_modalSettings();
        reset_bgGameOver();

        await syncDelay(10);

        clearCards();
        clearScore();

        applyGameOption();
        gameInitialSetup(inputGameMode),

        await syncDelay(10);

        const {opt_cardNum} = useGameStore.getState();
        shuffleCards(opt_cardNum);
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