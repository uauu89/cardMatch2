import Card from "./Card";
import { useGameBoardLogic } from "./useGameBoardLogic";

import "./gameBoard.css"

export default function GameBoard(){
    const {
        gameBoardRef,
        cards_value,
        cards_opened,
        cards_owner,
        styleAttr,
        gameStarted,
        cardClick,
        handle_endDealingAnimation,
    } = useGameBoardLogic();

    return(

        <div className="gameBoard" ref={gameBoardRef} style={styleAttr}>
            {(gameStarted && cards_value.length > 0) &&
                cards_value.map((number, index)=>(
                    <Card
                        key={index}
                        order={index}
                        cardNumber={number}
                        cardsCount={cards_value.length}
                        opened={cards_owner[index] !== null || cards_opened[index]}
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