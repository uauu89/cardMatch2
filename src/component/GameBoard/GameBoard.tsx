import { useEffect, useState, type Dispatch, type SetStateAction } from "react";

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

    const {
        cards_value,
        cards_opend,
        cards_memory,
        // cards_selected,
        cards_owner,

        clearCards,
        shuffleCards,
        openCards,
        recordOpenedCards,
        markCardOwner,
        resetOpenedCards
    } = useCardsStore(useShallow(state => ({
        cards_value: state.cards_value,
        cards_opend: state.cards_opend,
        cards_memory: state.cards_memory,
        // cards_selected: state.cards_selected,
        cards_owner: state.cards_owner,

        clearCards: state.clearCards,
        shuffleCards: state.shuffleCards,
        openCards: state.openCards,
        recordOpenedCards: state.recordOpenedCards,
        markCardOwner: state.markCardOwner,
        resetOpenedCards: state.resetOpenedCards,
    })));

    const { gamePhase, setGamePhase, setTurnState } = useGameStore(useShallow(state=> ({
        gamePhase: state.gamePhase,
        setGamePhase: state.setGamePhase,
        setTurnState: state.setTurnState,
        
    })))

    // const {
    //     cardClick,
    // } = useGameStore(useShallow(state=>({
    //     cardClick: state.cardClick
    // })))

    
    const opt_cardNum = useOptionStore(state => state.opt_cardNum);
    const gameStarted = ["dealing", "playing"].includes(gamePhase);

    const resetGame = () => {
        clearCards();
        setGamePhase("gameOver");
    }

    const checkMatch = () => {
        
        // const {cards_value, cards_selected, markCardOwner, resetOpenedCards,} = useCardsStore.getState();
        const {cards_selected,} = useCardsStore.getState();
        if(cards_selected.length !== 2) return;
        
        setTurnState("transition");
        const [card1, card2] = cards_selected;


        if(cards_value[card1] === cards_value[card2]){
            markCardOwner("single");

            const {cards_owner,} = useCardsStore.getState();
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





    const cardClick = (index: number, number: number)=>{
        // const checkMatch = useGameStore.getState();
        // const {openCards} = useCardsStore.getState();
        openCards(index, number);
        recordOpenedCards(index, number);
        checkMatch();
    };


    
    useEffect(()=>{
        if(gamePhase === "dealing"){
            shuffleCards(opt_cardNum);
        }
    }, [gamePhase]);
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

                        onClick={()=>cardClick(index, number)}
                    />
                )
            )}

            
        </div>
    )
}