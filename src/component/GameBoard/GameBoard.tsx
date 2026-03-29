import { useState } from "react";
import { useGameStore } from "../../store/gameStore";

import Card from "./Card";
import "./gameBoard.css"


interface GameBoardProps {
    gameStart: boolean;
    opt_previewAnimation: boolean;
    endRendering: boolean;
    setEndRendering: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function GameBoard({gameStart, opt_previewAnimation, endRendering, setEndRendering}: GameBoardProps){

    
    const [cards_value, setCards_value] = useState<number[]>([1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6]);
    const [cards_opend, setCards_opend] = useState<boolean[]>([false, false, false, false, false, false, false, false, false, false, false, false]);
    const [cards_matched, setCards_matched] = useState<boolean[]>([]);
    const [cards_selected, setCards_selected] = useState<number[]>([]);
    
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

    return(

        <div className="gameBoard">
           

            {gameStart && cards_value.map((number, index)=>(
                    <Card
                        key={`${index}-${number}`}
                        order={index}
                        cardNumber={number}
                        cardsCount={cards_value.length}
                        opend={cards_opend[index]}
                        opt_previewAnimation={opt_previewAnimation}

                        isLastCard={index === cards_value.length - 1}

                        endRendering={endRendering}
                        setEndRendering={setEndRendering}

                        onClick={()=>changeCardState(index)}
                    />
                )
            )}

            
        </div>
    )
}