import { create } from "zustand";

interface CardsProps{

    cards_value: number[];
    cards_opend: boolean[];
    cards_memory: (number | null)[];
    cards_owner: ("single" | "user" | "com" | null)[];
    cards_selected: number[];


    shuffleCards: (number: number) => void;
    openCards: (index: number, number: number) => void;
    markingCardOwner: (owner: ("single" | "user" | "com")) => void;
    resetOpendCards: ()=> void;

}

/* 
    cards_value : 게임에 배치되는 카드 배열. 옵션에서 설정한 카드 수 * 2를 랜덤으로 재배치 
    cards_opend : 현재 열려있는 카드 상태 표시
     -- cards_matched: 짝을 맞춘 카드 표시, cards_value의 값을 음수로 바꾸는 것으로 기능 병합
    cards_memory : 한 번 이상 열어봤던 카드 기록 용
    cards_selected: 선택한 두 개의 카드가 정답인지 체크,

    
    
    1차기획 : cards_opend를 boolean으로 저장해서 카드 열려있는 상태 전달
    2차기획 : 컴퓨터가 열어본 적이 있는 카드 배열을 참조하기 위해 cards_opend를 값으로 저장하고 cards_selected의 값을 실제 카드의 값과 비교해서 열린 상태를 표시하려고 하였으나,
            그러면 해당 값의 카드 중 앞쪽에 있는 카드인지 뒤쪽에 있는 카드인지 알 수 있는 방법이 없음
    3차기획 : 2차의 이유로 cards_memory 배열을 하나 더 추가해야 할 것으로 보임, 단 cards_matched는 cards_value를 음수로 바꾸는 것으로 표시할 수 있지 않을까 고민 중
            정답자 표시 위해 cards_owner 추가
            gpt 제안으로 cards_selected에 저장되는 값을 카드 value 말고 index로 변경 (예정)
*/

export const useCardsStore = create<CardsProps>(set =>({

    cards_value: [],
    cards_opend: [],
    cards_memory: [],
    cards_owner: [],
    cards_selected: [],


    shuffleCards : (number) => {
        const doubleArray = Array.from({ length: number }, (_, i) => i + 1)
                                .flatMap(x=>[x, x]);

        for (let i = doubleArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [doubleArray[i], doubleArray[j]] = [doubleArray[j], doubleArray[i]];
        }

        set({
            cards_value: doubleArray,
            cards_opend: new Array(doubleArray.length).fill(false),
            cards_memory: new Array(doubleArray.length).fill(null),
        })
    },


    openCards : (index, number) => {
        set(state => {
            const copy_opend = [...state.cards_opend];
            copy_opend[index] = true;

            const copy_memory = [...state.cards_memory];
            if(copy_memory[index] === null) copy_memory[index] = number;

            const copy_selected = [...state.cards_selected, index];
            return {
                cards_opend: copy_opend,
                cards_memory: copy_memory,
                cards_selected: copy_selected,
            }
        })
    },

    markingCardOwner: (owner)=>{
        set(state => {
            const [card1, card2] = state.cards_selected;
            const copy_owner = [...state.cards_owner];
            copy_owner[card1] = owner;
            copy_owner[card2] = owner;

            return {cards_owner: copy_owner};
        })
    },

    resetOpendCards: ()=>{
        set(state => ({
            cards_opend: new Array(state.cards_value.length).fill(false),
            cards_selected: [],
        }))
    }

}))