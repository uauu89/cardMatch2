import { useEffect, useRef, useState, type Dispatch, type SetStateAction } from "react";

import Card from "./Card";
import "./gameBoard.css"
import { useCardsStore } from "../../stores/useCardsStore";
import { useShallow } from "zustand/shallow";
import { useGameStore } from "../../stores/useGameStore";
import { checkGameVersion, syncDelay } from "../../utils";
import { useScoreStore } from "../../stores/useScoreStore";
import { comAlgorithm } from "../../utils/comAlgorithm";

export default function GameBoard(){

    const timer_dealingAnimation = useRef<number | null>(null);

    const cards_value = useCardsStore(state => state.cards_value);
    const cards_opend = useCardsStore(state => state.cards_opend);
    const cards_memory = useCardsStore(state => state.cards_memory);
    const cards_owner = useCardsStore(state => state.cards_owner);

    const cards_selected = useCardsStore(state => state.cards_selected);

    const {
        clearCards,
        // shuffleCards,
        openCards,
        markCardOwner,
        resetOpenedCards
    } = useCardsStore(useShallow(state => ({
        clearCards: state.clearCards,
        // shuffleCards: state.shuffleCards,
        openCards: state.openCards,
        markCardOwner: state.markCardOwner,
        resetOpenedCards: state.resetOpenedCards,
    })));

    

    const correctScore = useScoreStore(state => state.correctScore);
    const wrongScore = useScoreStore(state => state.wrongScore);

    const gameMode = useGameStore(state => state.gameMode);
    const gamePhase = useGameStore(state => state.gamePhase);
    const turnState = useGameStore(state => state.turnState);
    const cardChecking = useGameStore(state => state.cardChecking);
    const opt_continueTurn = useGameStore(state => state.opt_continueTurn);

    const currentPlayer = useGameStore(state => state.currentPlayer);

    const setGamePhase = useGameStore(state => state.setGamePhase);
    const setTurnState = useGameStore(state => state.setTurnState);
    const endTurn_doneCardSelect = useGameStore(state => state.endTurn_doneCardSelect);
    const setCardChecking = useGameStore(state => state.setCardChecking);
    const setNextPlayer = useGameStore(state => state.setNextPlayer);

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
        resetOpenedCards();
        await syncDelay(500); if(checkGameVersion(gameVersion)) return;
        setCardChecking("ready");
        setTurnState("active");
    }
    const caseCorrect = (currentPlayer : "single" | "player" | "com") => {
        markCardOwner(currentPlayer);
        correctScore(currentPlayer);
        const {cards_owner,} = useCardsStore.getState();
        if(cards_owner.every(owner => owner !== null)){
            caseGameOver();
            return;
        }
        if(!opt_continueTurn) {
            setNextPlayer();
        }
    }
    const caseWrong = (currentPlayer : "single" | "player" | "com") => {
        wrongScore(currentPlayer);
        setNextPlayer();
    }
    const caseGameOver = () => {
        clearCards();
        setGamePhase("gameOver");
    }

    // const skipTurn = async () => {
    //     // await syncDelay(100);
    //     resetOpenedCards();
    //     await syncDelay(700);
    //     setNextPlayer();
    //     setCardChecking("ready");
    //     setTurnState("active");
    // }


    const comProcess = async (
        cards_selected: number[],
        cards_opend: boolean[],
        cards_memory : (number | null)[],
        cards_owner: ("single" | "player" | "com" | null)[]
    ) => {
        if(cards_selected.length === 0){
            await syncDelay(500); 
            const com_idx = comAlgorithm(cards_selected, cards_opend, cards_memory, cards_owner);
            // await syncDelay(1000); 
            console.log("### first com_idx : ", com_idx);
            cardClick(com_idx);
            // console.log("com_idx : ", com_idx);
        }else if(cards_selected.length === 1){
            await syncDelay(500); 
            const com_idx = comAlgorithm(cards_selected, cards_opend, cards_memory, cards_owner);
            // await syncDelay(1000); 
            console.log("### second com_idx : ", com_idx);
            cardClick(com_idx);
            // console.log("com_idx : ", com_idx);
        }
    }



    useEffect(() => {
        if(gamePhase !== "playing") return;
        if(turnState === "transition"){
            if(cardChecking === "checking"){
                // checkMatch(cards_selected);
            }
            if(cardChecking === "timeout"){
                // skipTurn();
            }
        }
    }, [gamePhase, turnState, cardChecking])

    useEffect(() => {
        if(gamePhase !== "playing") return;
        if(currentPlayer !== "com") return;
        if(turnState === "active"){
            const {cards_selected} = useCardsStore.getState();
            if(cards_selected.length < 2){
                comProcess(cards_selected, cards_opend, cards_memory, cards_owner)
            }
        }


    }, [gamePhase, currentPlayer, turnState, cards_selected])

    return(

        <div className="gameBoard">
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