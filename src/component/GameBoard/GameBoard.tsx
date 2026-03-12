import { useState } from "react";
import { useGameStore } from "../../store/gameStore";

import Card from "./Card";

import "./gameBoard.css"

export default function GameBoard(){

    const [cards_value, setCards_value] = useState<number[]>([1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6]);
    const [cards_opend, setCards_opend] = useState<boolean[]>([false, false, false, false, false, false, false, false, false, false, false, false]);
    const [cards_matched, setCards_matched] = useState<boolean[]>([]);
    const [cards_selected, setCards_selected] = useState<number[]>([]);


    /*
        1. cards_value : 맞힌 카드는 -값으로 변경
            matched state는 삭제

        2-1. cards_opend에 선택한 카드의 index 값을 직접 저장 (예 : [3, 6])
            selected state는 삭제
            → com_memory state가 추가되어야 함

        2-2. cards_opend state는 유지, true가 두 개일 때 카드 비교
            → 현재 선택되어있는 카드 두 개는 식별할 수 있지만 과거 선택된 적이 있는 카드 기록은 못남김     
    */

    /*
        ※ 카드 값이 음수라면 카드 선택 함수 렌더링 안함

        카드 선택시
            1. 선택한 카드의 index를 cards_selected에 push

            2. cards_selected의 개수 검사
                - cards_selected.length === 2 라면
                    1. 카드 선택 임시 차단 
                        1. wait state = true;
                        - gameMode = vs 라면
                            1. turn state를 변경

                    2. cards_value[index1] === cards_value[index2] 검사
                        - index1 === index2 라면
                            1. cards_value[index1], cards_value[index2] 값에 *-1 로 업데이트
                            2. 정답처리 프로세스 실행
                        - index1 !== index2 라면
                            1. 오답처리 프로세스 실행

                    3. cards_selected 배열 초기화

                    4. wait state = false
            
            
            

    */
    const changeCardState = (index: number) => {
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