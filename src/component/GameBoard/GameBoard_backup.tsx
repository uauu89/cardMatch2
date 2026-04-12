import { useEffect, useRef, useState, type Dispatch, type SetStateAction } from "react";

import Card from "./Card";
import "./gameBoard.css"
import { useCardsStore } from "../../stores/useCardsStore";
import { useShallow } from "zustand/shallow";
import { useGameStore } from "../../stores/useGameStore";
import { syncDelay } from "../../utils";
import { useScoreStore } from "../../stores/useScoreStore";
import { aiAlgorithm } from "../../utils/aiAlgorithm";

export default function GameBoard(){

    const timer_dealingAnimation = useRef<number | null>(null);

    const cards_value = useCardsStore(state => state.cards_value);
    const cards_opend = useCardsStore(state => state.cards_opend);
    // const cards_memory = useCardsStore(state => state.cards_memory);
    const cards_owner = useCardsStore(state => state.cards_owner);

    const cards_selected = useCardsStore(state => state.cards_selected);

    const {
        clearCards,
        // shuffleCards,
        openCards,
        recordOpenedCards,
        markCardOwner,
        resetOpenedCards
    } = useCardsStore(useShallow(state => ({
        clearCards: state.clearCards,
        // shuffleCards: state.shuffleCards,
        openCards: state.openCards,
        recordOpenedCards: state.recordOpenedCards,
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
    const turnTransition = useGameStore(state => state.turnTransition);
    const setCardChecking = useGameStore(state => state.setCardChecking);
    const setNextPlayer = useGameStore(state => state.setNextPlayer);

    const gameStarted = ["dealing", "playing"].includes(gamePhase);

    const checkMatch = async (cards_selected: number[]) => {
        // await syncDelay(500);
        
        const [card1, card2] = cards_selected;
        if(cards_value[card1] === cards_value[card2]){
            await syncDelay(300);
            caseCorrect(currentPlayer);
        }else{
            caseWrong(currentPlayer);
        }
        
        setCardChecking("done");

    }
    const NextTurn = async () => {
        resetOpenedCards();
        setCardChecking("ready");
        setTurnState("active");
        // await syncDelay(300);
    }

    const caseCorrect = (currentPlayer : "single" | "player" | "ai") => {
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
    const caseWrong = (currentPlayer : "single" | "player" | "ai") => {
        wrongScore(currentPlayer);
        setNextPlayer();
    }
    const caseGameOver = () => {
        clearCards();
        setGamePhase("gameOver");
    }

    const cardClick = (index: number)=>{
        openCards(index);
        recordOpenedCards(index);

        const {cards_selected, cards_opend} = useCardsStore.getState();
        if(cards_selected.length === 2){
            turnTransition();
        };
    };

    const handle_endDealingAnimation = () => {
        setGamePhase("playing");
        if(timer_dealingAnimation.current) clearTimeout(timer_dealingAnimation.current);
        timer_dealingAnimation.current = window.setTimeout(()=>setTurnState("active"), 500);
    }

    const aiProcess = async (
        cards_selected: number[],
        cards_opend: boolean[],
        cards_memory : (number | null)[],
        cards_owner: ("single" | "player" | "ai" | null)[]
    ) => {
        await syncDelay(1000); 
        const com_idx = aiAlgorithm(cards_selected, cards_opend, cards_memory, cards_owner);
        console.log("com_idx : ", com_idx);
        cardClick(com_idx);
    }

    useEffect(() => {
        // const {currentPlayer} = useGameStore.getState();
        // console.log("useEffect currentPlayer");

        if(currentPlayer !== "ai") return;
        // console.log("--- useEffect currentPlayer case ai");

        const {cards_selected, cards_opend, cards_memory, cards_owner} = useCardsStore.getState();

        if(cards_selected.length < 2 ){
            console.log("---ai turn")
            // aiProcess(cards_selected, cards_opend, cards_memory, cards_owner)
        }

    }, [currentPlayer, cards_selected])

    useEffect(()=>{
        if(gamePhase !== "playing") return;
        // console.log("useEffect playing")

        if(turnState === "transition"){
            if(cardChecking === "checking"){
                checkMatch(cards_selected);
            }else if(cardChecking === "done"){
                NextTurn();
                
            }
        }
        

    }, [gamePhase, turnState, cardChecking])

    
    
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