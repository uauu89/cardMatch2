import { useGameStore } from "../../store/gameStore";

import Card from "./Card";

import "./gameBoard.css"

export default function GameBoard(){

    // const [cards_value, setCards_value] = useState<number[]>([1, 2, 3, 4, 5, 6]);
    // const [cards_opend, setCards_opend] = useState<boolean[]>([false, false, false, false, false, false]);
    // const [cards_matched, setCards_matched] = useState<boolean[]>([]);
    // const [cards_selected, setCards_selected] = useState<number[]>([]);

    // const openCard = (index: number) => {
    //     setCards_opend(prev => {
    //         const newState = [...prev];
    //         newState[index] = true;
    //         return newState;
    //     })

    // }


    const cards_value = useGameStore(state => state.cards_value);
    const cards_opend = useGameStore(state => state.cards_opend);

    const changeCardState = useGameStore(state => state.changeCardState);
    

    return(

        <div className="gameBoard">
           

            {cards_value.map((number, index)=>(
                
                <Card
                    key={index}
                    cardNumber={number}
                    opend={cards_opend[index]}
                    onClick={()=>changeCardState(index, true)}
                />
            )
            )}

            
        </div>
    )
}