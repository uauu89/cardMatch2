import { useEffect, useRef, useState, type Dispatch, type SetStateAction } from "react";

import Card from "./Card";
import "./gameBoard.css"
import { useCardsStore } from "../../stores/useCardsStore";
import { useOptionStore } from "../../stores/useOptionStore";
import { useShallow } from "zustand/shallow";
import { useGameStore } from "../../stores/useGameStore";


interface GameBoardProps {
    gameStart: boolean;
    // opt_previewAnimation: boolean;
    // gamePhase: "ready" | "gameOver" | "dealing" | "playing";
    // setGamePhase: Dispatch<SetStateAction<"ready" | "gameOver" | "dealing" | "playing">>;
}

export default function GameBoard(){

    const timer_dealingAnimation = useRef<number | null>(null);

    const cards_value = useCardsStore(state => state.cards_value);
    const cards_opend = useCardsStore(state => state.cards_opend);
    const cards_memory = useCardsStore(state => state.cards_memory);
    const cards_owner = useCardsStore(state => state.cards_owner);

    const {
        clearCards,
        shuffleCards,
        openCards,
        recordOpenedCards,
        markCardOwner,
        resetOpenedCards
    } = useCardsStore(useShallow(state => ({
        clearCards: state.clearCards,
        shuffleCards: state.shuffleCards,
        openCards: state.openCards,
        recordOpenedCards: state.recordOpenedCards,
        markCardOwner: state.markCardOwner,
        resetOpenedCards: state.resetOpenedCards,
    })));

    const gamePhase = useGameStore(state => state.gamePhase);
    const setGamePhase = useGameStore(state => state.setGamePhase);
    const setTurnState = useGameStore(state => state.setTurnState);


    

    
    function syncDelay(ms: number) {
        return new Promise<void>(resolve => setTimeout(resolve, ms))
    }

    
    // const opt_cardNum = useOptionStore(state => state.opt_cardNum);

    const gameStarted = ["dealing", "playing"].includes(gamePhase);

    const resetGame = () => {
        clearCards();
        setGamePhase("gameOver");
    }

    

    const checkMatch = () => {

        const {cards_selected} = useCardsStore.getState();
        if(cards_selected.length !== 2) return;
        
        setTurnState("transition");
        const [card1, card2] = cards_selected;


        if(cards_value[card1] === cards_value[card2]){
            const {currentPlayer} = useGameStore.getState();
            const {cards_owner,} = useCardsStore.getState();

            markCardOwner("single");

            if(cards_owner.every(owner => owner !== null)){
                console.log("gameover");
                resetGame();
            }
            
        }
        setTimeout(()=>{
            setTurnState("active");
            resetOpenedCards();
        }, 500)
    }

    const case_correct = () => {}

    const cardClick = (index: number, number: number)=>{
        openCards(index, number);
        recordOpenedCards(index, number);
        checkMatch();
        // await syncDelay(500);
    };

    const handle_endDealingAnimation = () => {
        setGamePhase("playing");

        if(timer_dealingAnimation.current){
            clearTimeout(timer_dealingAnimation.current)
        } ;
        
        timer_dealingAnimation.current = window.setTimeout(()=>{
            setTurnState("active");
        }, 500)
    }
    
    // useEffect(()=>{
    //     if(gamePhase === "dealing"){
    //         shuffleCards(Number(opt_cardNum));
    //     }
    // }, [gamePhase]);
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
                        handler_click={()=>cardClick(index, number)}
                    />
                )
            )}

            
        </div>
    )
}