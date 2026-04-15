import { useEffect, useRef} from "react";

import Card from "./Card";
import "./gameBoard.css"
import { useCardsStore } from "../../stores/useCardsStore";
import { useShallow } from "zustand/shallow";
import { useGameStore } from "../../stores/useGameStore";
import { checkGameVersion, getDelayByState, syncDelay } from "../../utils";
import { useScoreStore } from "../../stores/useScoreStore";
import { comAlgorithm } from "../../utils/comAlgorithm";
import type { Type_ComState, Type_currentPlayer } from "../../types/game";
import { useOptionStore } from "../../stores/useOptionStore";

export default function GameBoard(){

    const timer_dealingAnimation = useRef<number | null>(null);

    const cards_value = useCardsStore(state => state.cards_value);
    const cards_opend = useCardsStore(state => state.cards_opend);
    const cards_owner = useCardsStore(state => state.cards_owner);

    const {
        clearCards,
        openCards,
        markCardOwner,
        resetOpenedCards
    } = useCardsStore(useShallow(state => ({
        clearCards: state.clearCards,
        openCards: state.openCards,
        markCardOwner: state.markCardOwner,
        resetOpenedCards: state.resetOpenedCards,
    })));

    

    const correctScore = useScoreStore(state => state.correctScore);
    const wrongScore = useScoreStore(state => state.wrongScore);

    const gamePhase = useGameStore(state => state.gamePhase);
    const turnState = useGameStore(state => state.turnState);
    const opt_continueTurn = useGameStore(state => state.opt_continueTurn);
    const opt_skipComState = useGameStore(state => state.opt_skipComState);

    const currentPlayer = useGameStore(state => state.currentPlayer);

    const setGamePhase = useGameStore(state => state.setGamePhase);
    const setTurnState = useGameStore(state => state.setTurnState);
    const endTurn_doneCardSelect = useGameStore(state => state.endTurn_doneCardSelect);
    const setNextPlayer = useGameStore(state => state.setNextPlayer);
    const setComState = useGameStore(state => state.setComState);

    const opt_cardSize = useOptionStore(state => state.opt_cardSize);
    const setOpt_cardSize = useOptionStore(state => state.setOpt_cardSize);
    const opt_cardSizeResponsive = useOptionStore(state => state.opt_cardSizeResponsive);

    const gameStarted = ["dealing", "playing"].includes(gamePhase);

    const handle_endDealingAnimation = () => {
        setGamePhase("playing");
        if(timer_dealingAnimation.current) clearTimeout(timer_dealingAnimation.current);
        timer_dealingAnimation.current = window.setTimeout(() => setTurnState("active"), 500);
    }

    const cardClick = (index: number)=>{
        openCards(index);

        const {cards_selected,} = useCardsStore.getState();
        if(cards_selected.length === 2){
            endTurn_doneCardSelect();
            checkMatch(cards_selected);
        };
    };

    const checkMatch = async (cards_selected: number[]) => {
        const {gameVersion} = useGameStore.getState();
        await syncDelay(500); if(checkGameVersion(gameVersion)) return;
        const [card1, card2] = cards_selected;
        if(cards_value[card1] === cards_value[card2]){
            caseCorrect(currentPlayer);
        }else{
            caseWrong(currentPlayer);
        }
        if(currentPlayer === "com") {
            await syncDelay(500);
        }
        resetOpenedCards();
        await syncDelay(500); if(checkGameVersion(gameVersion)) return;
        setTurnState("active");
    }
    const caseCorrect = async (currentPlayer: Type_currentPlayer) => {
        const {gameVersion} = useGameStore.getState();
        markCardOwner(currentPlayer);
        correctScore(currentPlayer);
        if(currentPlayer === "com"){
            const currentComState = useGameStore.getState().comState;
            setComState(comStateCaseCorrect(currentComState));
            await syncDelay(500); if(checkGameVersion(gameVersion)) return;
        }
        const {cards_owner,} = useCardsStore.getState();
        if(cards_owner.every(owner => owner !== null)){
            await syncDelay(200);
            caseGameOver();
            return;
        }
        if(!opt_continueTurn) {
            setNextPlayer();
        }
    }
    const caseWrong = async (currentPlayer: Type_currentPlayer) => {
        const {gameVersion} = useGameStore.getState();
        wrongScore(currentPlayer);

        if(currentPlayer === "com"){
            const currentComState = useGameStore.getState().comState;
            setComState(comStateCaseWrong(currentComState));
            await syncDelay(500); if(checkGameVersion(gameVersion)) return;
        }

        setNextPlayer();
    }
    const caseGameOver = async () => {
        clearCards();
        
        setGamePhase("gameOver");
    }

    const comStateCaseCorrect = (comState: Type_ComState) => {
        switch(comState){
            case "knowCorrect" : 
                return "correct";
            case "thinking" : 
                return "correct";
            case "noEmotion" : 
                return "noEmotion";
            default :
                return "default";
        }
    }
    const comStateCaseWrong = (comState: Type_ComState) => {
        switch(comState){
            case "knowCorrect" : 
                return "mistake";
            case "thinking" : 
                return "wrong";
            case "noEmotion" : 
                return "noEmotion";
            default :
                return "default";
        }
    }

    const comProcess = async () => {
        const {gameVersion} = useGameStore.getState();
        const { cards_selected, cards_opend, cards_memory, cards_owner } = useCardsStore.getState();
        if (cards_selected.length >= 2) return;

        const {comState, comIdx } = comAlgorithm(cards_selected, cards_opend, cards_memory, cards_owner);
        
        for (const card of comIdx) {
            if(!opt_skipComState){
                setComState(comState);
            }
            await syncDelay(getDelayByState(comState)); if(checkGameVersion(gameVersion)) return;
            cardClick(card);
        }
        const updatedSelected = useCardsStore.getState().cards_selected;
        if (updatedSelected.length < 2) {
            await comProcess(); 
        }
    }


    const styleAttr = {
        "--cardSize_ratio" : opt_cardSize,
    } as React.CSSProperties;

    useEffect(() => {
        const handleWindowResize = () => {
            const windowWidth = window.innerWidth;
            if(windowWidth < 459){
                setOpt_cardSize(0.6);
            }else if(windowWidth < 700){
                setOpt_cardSize(0.8);
            }else{
                setOpt_cardSize(1);
            }
        }
        if(opt_cardSizeResponsive){
            window.addEventListener('resize', handleWindowResize);
        }
        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
        
    }, [opt_cardSizeResponsive])

    useEffect(() => {
        if(gamePhase === "playing" && currentPlayer === "com" &&  turnState === "active"){
            comProcess()
        }
    }, [gamePhase, currentPlayer, turnState])

    return(

        <div className="gameBoard" style={styleAttr}>
            {(gameStarted && cards_value.length > 0) &&
                cards_value.map((number, index)=>(
                    <Card
                        key={index}
                        order={index}
                        cardNumber={number}
                        cardsCount={cards_value.length}
                        opend={cards_owner[index] !== null || cards_opend[index]}
                        owner={cards_owner[index]}
                        isLastCard={index === cards_value.length - 1}

                        handler_animationEnd={handle_endDealingAnimation}
                        handler_click={()=>cardClick(index)}
                    />
                )
            )}

            
        </div>
    )
}