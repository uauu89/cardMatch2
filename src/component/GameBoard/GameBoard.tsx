import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { useGameStore } from "../../store/gameStore";

import Card from "./Card";
import "./gameBoard.css"
import { useCardsStore } from "../../stores/useCardsStore";
import { useOptionStore } from "../../stores/useOptionStore";


interface GameBoardProps {
    gameStart: boolean;
    opt_previewAnimation: boolean;
    gamePhase: "init" | "ready" | "dealing" | "playing";
    setGamePhase: Dispatch<SetStateAction<"init" | "ready" | "dealing" | "playing">>;
}

export default function GameBoard({gameStart, opt_previewAnimation, gamePhase, setGamePhase}: GameBoardProps){

    const {cards_value, cards_opend, cards_memory, cards_selected, shuffleCards, openCards, resetOpendCards} = useCardsStore();
    const opt_cardNum = useOptionStore(state => state.opt_cardNum);
    
    
    // const [cards_value, setCards_value] = useState<number[]>([1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6]);
    // const [cards_opend, setCards_opend] = useState<boolean[]>([false, false, false, false, false, false, false, false, false, false, false, false]);
    // const [cards_matched, setCards_matched] = useState<boolean[]>([]);
    // const [cards_selected, setCards_selected] = useState<number[]>([]);
    
    /*
    const changeCardState = (index: number, ) => {
        setCards_opend(prev => {
            const newState = [...prev];
            newState[index] = true;
            return newState;
        })

        console.log("selected number : ", cards_value[index]);

        // setCards_selected(prev=>{

        // })

    }
    */


    // const cards_value = useGameStore(state => state.cards_value);
    // const cards_opend = useGameStore(state => state.cards_opend);
    // const changeCardState = useGameStore(state => state.changeCardState);
    
    // useEffect(() => {
    //     if (visibleCount >= cards.length) return;

    //     const timeout = setTimeout(() => {
    //         setVisibleCount(prev => prev + 1);
    //     }, 1000);

    //     return () => clearTimeout(timeout);
    // }, [visibleCount]);

    // const gameStarted = gamePhase === "dealing" || "playing";

    const gameStarted = ["dealing", "playing"].includes(gamePhase);

    
    useEffect(()=>{
        if(gamePhase === "dealing"){
            shuffleCards(opt_cardNum);
        }
    }, [gamePhase])
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
                        onClick={()=>openCards(index, number)}
                    />
                )
            )}

            
        </div>
    )
}