import { useEffect, useRef } from "react";

import { useGameStore } from "@/stores/useGameStore";
import { useCardsStore } from "@/stores/useCardsStore";
import { useScoreStore } from "@/stores/useScoreStore";

import { comAlgorithm } from "@utils/comAlgorithm_v2";
import { checkGameVersion, getDelayByState, syncDelay } from "@/utils";
import type { Type_ComState, Type_currentPlayer } from "@/types/game";
import { useOptionStore } from "@/stores/useOptionStore";

export const useGameBoardLogic = () => {
    const cards_value = useCardsStore(state => state.cards_value);
    const cards_opened = useCardsStore(state => state.cards_opened);
    const cards_owner = useCardsStore(state => state.cards_owner);
    const clearCards = useCardsStore(state => state.clearCards);
    const openCards = useCardsStore(state => state.openCards);
    const markCardOwner = useCardsStore(state => state.markCardOwner);
    const resetOpenedCards = useCardsStore(state => state.resetOpenedCards);

    const currentPlayer = useGameStore(state => state.currentPlayer);
    const gamePhase = useGameStore(state => state.gamePhase);
    const turnState = useGameStore(state => state.turnState);
    const opt_continueTurn = useGameStore(state => state.opt_continueTurn);
    const opt_skipComState = useGameStore(state => state.opt_skipComState);

    const setGamePhase = useGameStore(state => state.setGamePhase);
    const setTurnState = useGameStore(state => state.setTurnState);
    const endTurn_doneCardSelect = useGameStore(state => state.endTurn_doneCardSelect);
    const setNextPlayer = useGameStore(state => state.setNextPlayer);
    const setComState = useGameStore(state => state.setComState);

    const correctScore = useScoreStore(state => state.correctScore);
    const wrongScore = useScoreStore(state => state.wrongScore);

    const opt_cardSize = useOptionStore(state => state.opt_cardSize);
    const setOpt_cardSize = useOptionStore(state => state.setOpt_cardSize);
    const opt_cardSizeResponsive = useOptionStore(state => state.opt_cardSizeResponsive);

    
    const gameBoardRef = useRef<HTMLDivElement>(null);
    const timer_dealingAnimation = useRef<number | null>(null);
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

        if(currentPlayer === "com") await syncDelay(500);
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
    const caseGameOver = async () => {
        clearCards();
        setGamePhase("gameOver");
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

    const comStateCaseCorrect = (comState: Type_ComState) => {
        switch(comState){
            case "noEmotion" :  return "noEmotion";
            case "knowCorrect" : return "correct";
            case "thinking" : return "lucky";
            case "tricky" : return "confusion";
            default : return "default";
        }
    }
    const comStateCaseWrong = (comState: Type_ComState) => {
        switch(comState){
            case "knowCorrect" : return "mistake";
            case "thinking" : return "wrong";
            case "noEmotion" : return "noEmotion";
            case "tricky" : return "tease";
            default : return "default";
        }
    }

    
    const comProcess = async () => {
        const {gameVersion} = useGameStore.getState();
        const { cards_selected, cards_opened, cards_memory, cards_owner } = useCardsStore.getState();
        if (cards_selected.length >= 2) return;

        const {comState, comIdx } = comAlgorithm(cards_selected, cards_opened, cards_memory, cards_owner);
        
        for (const card of comIdx) {
            if(!opt_skipComState){
                setComState(comState);
            }
            await syncDelay(getDelayByState(comState)); if(checkGameVersion(gameVersion)) return;
            cardClick(card);
        }

        const updatedSelected = useCardsStore.getState().cards_selected;
        if (updatedSelected.length < 2) {
            // console.log("카드 클릭 2개 미만, 컴퓨터알고리즘 재 실행")
            await comProcess(); 
        }
    }


    const gameStarted = ["dealing", "playing"].includes(gamePhase);

    const styleAttr = {
        "--cardSize_ratio" : opt_cardSize,
    } as React.CSSProperties;

    useEffect(() => {
        if (!opt_cardSizeResponsive || !gameBoardRef.current) return;

        const handleGameBoardResize = new ResizeObserver(entries => {
            for(let entry of entries){
                const boardWidth = entry.contentRect.width;
                
                let newSize = 1;

                if (boardWidth < 459) newSize = 0.6;
                else if(boardWidth < 700) newSize = 0.8;
                else newSize = 1;
                
                if(useOptionStore.getState().opt_cardSize !== newSize) setOpt_cardSize(newSize);
            }
        })
        handleGameBoardResize.observe(gameBoardRef.current);
        
        return () => {
            handleGameBoardResize.disconnect();
        };
        
    }, [opt_cardSizeResponsive, setOpt_cardSize]);

    useEffect(() => {
        if(gamePhase === "playing" && currentPlayer === "com" &&  turnState === "active"){
            comProcess()
        }
    }, [gamePhase, currentPlayer, turnState]);

    return {
        gameBoardRef,
        cards_value,
        cards_opened,
        cards_owner,
        styleAttr,
        gameStarted,
        cardClick,
        handle_endDealingAnimation,
    }

}