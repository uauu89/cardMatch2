import { useEffect, useRef, useState, type Dispatch, type SetStateAction } from "react";

import Card from "./Card";
import "./gameBoard.css"
import { useCardsStore } from "../../stores/useCardsStore";
import { useShallow } from "zustand/shallow";
import { useGameStore } from "../../stores/useGameStore";
import { syncDelay } from "../../utils";
import { useScoreStore } from "../../stores/useScoreStore";

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
    const opt_continueTurn = useGameStore(state => state.opt_continueTurn);

    const currentPlayer = useGameStore(state => state.currentPlayer);

    const setGamePhase = useGameStore(state => state.setGamePhase);
    const setTurnState = useGameStore(state => state.setTurnState);
    const setCurrentPlayer = useGameStore(state => state.setCurrentPlayer);

    const gameStarted = ["dealing", "playing"].includes(gamePhase);

    const checkMatch = async () => {
        // const {cards_selected} = useCardsStore.getState();
        // if( cards_selected.length !== 2 ) return;
        await syncDelay(500);
        if( cards_selected.length === 2 ){
            const [card1, card2] = cards_selected;
            // const {currentPlayer} = useGameStore.getState();

            if(cards_value[card1] === cards_value[card2]){
                markCardOwner(currentPlayer);
                correctScore(currentPlayer);
                const {cards_owner,} = useCardsStore.getState();
                if(cards_owner.every(owner => owner !== null)){
                    clearCards();
                    setGamePhase("gameOver");
                    return;
                }
                if(gameMode === "vs" && !opt_continueTurn) {
                    setCurrentPlayer(getNextPlayer(currentPlayer));
                }
            }else{
                wrongScore(currentPlayer);
                setCurrentPlayer(getNextPlayer(currentPlayer));
            }
        }
        
        resetOpenedCards();
        setTurnState("active");
        // setTimeout(()=>{
        // }, 500)
        
    }
    
    const getNextPlayer = (player: "single" | "player" | "ai") => player === "player" ? "ai" : "player";

    const cardClick = (index: number)=>{
        openCards(index);
        recordOpenedCards(index);
        // checkMatch();

        const {cards_selected} = useCardsStore.getState();
        if(cards_selected.length === 2) setTurnState("transition");
    };

    const handle_endDealingAnimation = () => {
        setGamePhase("playing");
        if(timer_dealingAnimation.current) clearTimeout(timer_dealingAnimation.current);
        timer_dealingAnimation.current = window.setTimeout(()=>setTurnState("active"), 500);
    }


    useEffect(()=>{
        if(gamePhase === "playing" && turnState === "transition"){
            checkMatch();
        }

    }, [gamePhase, turnState])
    
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