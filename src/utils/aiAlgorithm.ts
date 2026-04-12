/*

1. 두 번째 선택인 경우
    1-1. 첫번째 카드의 페어의 위치를 아는 경우
        1-1-1. 실수 없이 선택
        1-1-2. 실수 발생
    1-2. 첫번째 카드의 페어의 위치를 모르는 경우
        1-2-1. 공개되지 않은 카드에서만 선택
            1-2-1-1. 실수 없이 선택
            1-2-1-2. 실수 발생
        
2. 첫 번째 선택인 경우
    2-1. 짝이 맞는 카드의 위치를 아는 경우
        2-1-1. 실수 없이 선택
        2-1-2. 실수 발생

    2-2. 짝이 맞는 카드의 위치를 모르는 경우
        2-2-1. 이미 선택했던 카드 배열에서 선택
            2-2-1-1. 실수 없이 선택
            2-2-1-2. 실수 발생

        2-2-2. 공개되지 않은 카드에서 선택
            2-2-2-1. 실수 없이 선택
            2-2-2-2. 실수 발생



        

-- 옵션 종류

1-1. 첫번째 카드의 짝 선택확률
2-1. 짝이 공개된 카드를 선택할 확률
2-2-1. 이미 선택했던 카드 배열에서만 선택할 확률
2-2-1. 2) 

*/



/*
    cards_value
    cards_opend
    cards_memory
    cards_owner
    cards_selected
*/



const aiCase_pick_matchingCard = () => {}

const aiCase_pick_fromUnknownArray = (
    cards_memory : (number | null)[],
) => {
    const filteredArray = cards_memory.reduce<number[]>((acc, current, index) => {
        if (current === null) {
            acc.push(index);
        }
        return acc;
    }, []);

    const ai_index = Math.floor(Math.random() * filteredArray.length) ;
    return filteredArray[ai_index];
}

const aiCase_pick_knownPair = () => {}

const aiCase_pick_fromKnownArray = (
    cards_opend: boolean[],
    cards_memory : (number | null)[],
    cards_owner: ("single" | "player" | "ai" | null)[]
) => {
    const filteredArray = cards_memory.reduce<number[]>((acc, current, index) => {
        if (current !== null && cards_opend[index] === false, cards_owner[index] === null) {
            acc.push(index);
        }
        return acc;
    }, []);

    const ai_index = Math.floor(Math.random() * filteredArray.length) ;
    return filteredArray[ai_index];
}

const aiCase_mistake = (
    cards_opend: boolean[],
    cards_owner: ("single" | "player" | "ai" | null)[]
) => {
    const filteredArray = cards_opend.reduce<number[]>((acc, isOpen, index) => {
        if (!isOpen && cards_owner[index] === null) {
            acc.push(index);
        }
        return acc;
    }, []);

    const ai_index = Math.floor(Math.random() * filteredArray.length) ;
    return filteredArray[ai_index];
}

export const aiAlgorithm = (
    cards_selected: number[],
    cards_opend: boolean[],
    cards_memory : (number | null)[],
    cards_owner: ("single" | "player" | "ai" | null)[]
) => {


    return aiCase_mistake(cards_opend, cards_owner);

    // return aiCase_pick_fromKnownArray(cards_opend, cards_memory, cards_owner);
    // if(cards_selected.length === 1){

    // }else{

    // }

}

