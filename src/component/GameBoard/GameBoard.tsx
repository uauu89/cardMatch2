import { useEffect, useState, type Dispatch, type SetStateAction } from "react";

import Card from "./Card";
import "./gameBoard.css"
import { useCardsStore } from "../../stores/useCardsStore";
import { useOptionStore } from "../../stores/useOptionStore";
import { useShallow } from "zustand/shallow";
import { useGameStore } from "../../stores/useGameStore";


interface GameBoardProps {
    gameStart: boolean;
    opt_previewAnimation: boolean;
    gamePhase: "init" | "ready" | "dealing" | "playing";
    setGamePhase: Dispatch<SetStateAction<"init" | "ready" | "dealing" | "playing">>;
}

export default function GameBoard({gameStart, opt_previewAnimation, gamePhase, setGamePhase}: GameBoardProps){

    const {
        cards_value,
        cards_opend,
        cards_memory,
        cards_selected,
        shuffleCards,
        openCards,
        resetOpendCards
    } = useCardsStore(useShallow(state => ({
        cards_value: state.cards_value,
        cards_opend: state.cards_opend,
        cards_memory: state.cards_memory,
        cards_selected: state.cards_selected,
        shuffleCards: state.shuffleCards,
        openCards: state.openCards,
        resetOpendCards: state.resetOpendCards,
    })));

    // const {
    //     cardClick,
    // } = useGameStore(useShallow(state=>({
    //     cardClick: state.cardClick
    // })))

    
    const opt_cardNum = useOptionStore(state => state.opt_cardNum);

    const gameStarted = ["dealing", "playing"].includes(gamePhase);


    const checkMatch = () => {
        
        const {cards_value, cards_selected, markingCardOwner, resetOpendCards,} = useCardsStore.getState();
        const {input_lock, input_unlock} = useGameStore.getState();
        
        if(cards_selected.length !== 2) return;
        
        input_lock();
        const [card1, card2] = cards_selected;
        console.log("cards_selected : ", cards_selected);

        if(cards_value[card1] === cards_value[card2]){
            markingCardOwner("single");
        }
        setTimeout(()=>{
            input_unlock();
            resetOpendCards();
        }, 500)
        
    }
    const cardClick = (index: number, number: number)=>{
        // const checkMatch = useGameStore.getState();
        const {openCards} = useCardsStore.getState();
        openCards(index, number);
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
                        key={`${index}-${number}`}
                        order={index}
                        cardNumber={number}
                        cardsCount={cards_value.length}
                        opend={cards_opend[index]}
                        opt_previewAnimation={opt_previewAnimation}

                        isLastCard={index === cards_value.length - 1}

                        gamePhase={gamePhase}
                        setGamePhase={setGamePhase}


                        // onClick={()=>changeCardState(index)}
                        onClick={()=>cardClick(index, number)}
                    />
                )
            )}

            
        </div>
    )
}