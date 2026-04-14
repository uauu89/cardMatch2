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


// 미사용
/*
const aiCase_pick_matchingSecondCard = (
    cards_selected: number[],
    cards_memory : (number | null)[],
) => {

    const selectedCardNumber = cards_memory[cards_selected[0]];
    const pairIndex = cards_memory.findIndex((value, index) => {
        value === selectedCardNumber && index !== cards_selected[0];
    })
    return pairIndex;
}
const aiCase_pick_knownPair = (
    cards_memory : (number | null)[],
    cards_owner: ("single" | "player" | "com" | null)[]
) => {
    const memoryMap: number[][] = Array.from({length: cards_memory.length / 2 + 1}, () => []);

    cards_memory.forEach((value, index) => {
        if(value !== null && cards_owner[index] === null){
            memoryMap[value].push(index);
            if(memoryMap[value].length === 2){
                return memoryMap[value][0];
            }
        }
    })

    return null;
}
const aiCase_random_fromUnknownArray = (
    cards_memory : (number | null)[],
) => {
    const filteredArray = cards_memory.reduce<number[]>((acc, current, index) => {
        if (current === null) {
            acc.push(index);
        }
        return acc;
    }, []);

    const com_index = Math.floor(Math.random() * filteredArray.length) ;
    return filteredArray[com_index];
}
const aiCase_random_fromKnownArray = (
    cards_opend: boolean[],
    cards_memory : (number | null)[],
    cards_owner: ("single" | "player" | "com" | null)[]
) => {
    const filteredArray = cards_memory.reduce<number[]>((acc, current, index) => {
        if (current !== null && cards_opend[index] === false, cards_owner[index] === null) {
            acc.push(index);
        }
        return acc;
    }, []);

    const com_index = Math.floor(Math.random() * filteredArray.length) ;
    return filteredArray[com_index];
}
*/
// 미사용




/*

com_idx 값을 배열로 전달,
정답을 아는 카드일 경우 두 개의 idx를 리턴

cardClick을 반복문으로 실행,

com_idx의 개수가 한개일 경우 comAlgorithm을 한번 더 실행

return값으로 알고리즘의 케이스도 같이 전달(실수여부는 제외)한 후 
checkMatch에서 알고리즘 케이스에 따라 정답 반응 다르게

예) 카드의 정답을 전부 아는 경우 "확신" 상태를 전달 / 실수 발생해서 잘못된 idx 값 전달
    - 확신 상태에서 정답 > 당연/당당 등의 이모지 출력
    - 확신 상태에서 오답 > 놀람(부정 의미)/당황등의 이모지 출력

    카드의 정답을 모르는 경우 "고민" 상태를 전달
    - 고민 상태에서 정답 > 놀람(긍정 의미)/신남 등의 이모지 출력
    - 고민 상태에서 오답 > 아쉬움(감정표현이 크지 않은) 등의 이모지 출력
*/

const dice = () => {
    return Math.floor(Math.random() * 100);
}

const behaviorChance = 100;
const mistakeChance = 10;


const classifyAvailableCards = (
    cards_memory : (number | null)[],
    cards_opend: boolean[],
    cards_owner: ("single" | "player" | "com" | null)[]
) => {
    const knownIndices: number[] = [];
    const unknownIndices: number[] = [];
    
    cards_memory.forEach((value, index) => {
        if(!cards_opend[index] && cards_owner[index] === null){
            if(value !== null){
                knownIndices.push(index);
            }else{
                unknownIndices.push(index)
            }
        }
    });
    return [knownIndices, unknownIndices];
}

const findMatchingCardIndex = (
    firstCardIndex: number | null,
    firstCardNumber:number | null,
    cards_memory: (number | null)[]
) => {
    if(firstCardIndex === null || firstCardNumber === null) return null;

    const firstIndex = cards_memory.indexOf(firstCardNumber);
    const lastIndex = cards_memory.lastIndexOf(firstCardNumber);
    if(firstIndex === lastIndex) return null;

    return firstIndex === firstCardIndex? lastIndex : firstIndex;
}
const getPairIndices = (
    cards_memory : (number | null)[],
    cards_owner: ("single" | "player" | "com" | null)[]
) => {
    const result: number[][] = Array.from({length: cards_memory.length / 2 + 1}, () => []);

    // cards_memory.forEach((value, index) => {
    //     if(value !== null && cards_owner[index] === null){
    //         result[value].push(index);
    //         if(result[value].length === 2){
    //             const randomIndex = Math.floor(Math.random() * 2);
    //             return result[value][randomIndex];
    //         }
    //     }
    // })
    for(let i = 0; i < cards_memory.length; i++){
        const value = cards_memory[i];
        if(value !== null && cards_owner[i] === null){
            result[value].push(i);
            if(result[value].length === 2){
                const randomIndex = Math.floor(Math.random() * 2);
                return result[value][randomIndex];
            }
        }
    }

    return null;
}


/*
    ② pickRandomFromArray 함수 내의 filter 로직
    pickRandomFromArray 함수 내부에서 targetArray를 다시 reduce로 필터링하고 있는데, 이때 index를 사용하고 있습니다.
    오류: targetArray는 인덱스들의 배열(예: [3, 5, 8])입니다. reduce의 index는 0, 1, 2 순으로 올라가므로, cards_opend[index]는 엉뚱한 카드의 오픈 여부를 체크하게 됩니다.
    수정: cards_opend[current](실제 카드 위치)를 체크해야 합니다.
*/

const pickRandomFromArray = (targetArray : number[]) => {
    const randomIndex = Math.floor(Math.random() * targetArray.length);
    return targetArray[randomIndex];
}
const pickRandomAll = (
    cards_opend: boolean[],
    cards_owner: ("single" | "player" | "com" | null)[]
) => {
    const filteredArray = cards_opend.reduce<number[]>((acc, isOpen, index) => {
        if (!isOpen && cards_owner[index] === null) {
            acc.push(index);
        }
        return acc;
    }, []);

    const com_index = Math.floor(Math.random() * filteredArray.length) ;
    return filteredArray[com_index];
}

export const comAlgorithm = (
    cards_selected: number[],
    cards_opend: boolean[],
    cards_memory : (number | null)[],
    cards_owner: ("single" | "player" | "com" | null)[]
) => {
    
    const firstCardIndex = cards_selected[0] ?? null;
    const firstCardNumber = firstCardIndex !== null ? cards_memory[firstCardIndex] : null;

    const pairSecondIndex = findMatchingCardIndex(firstCardIndex, firstCardNumber, cards_memory);
    const pairIndexArray = getPairIndices(cards_memory, cards_owner);
    
    const [knownIndices, unknownIndices] = classifyAvailableCards(cards_memory, cards_opend, cards_owner)

    const count_denominator = cards_owner.filter(owner => owner === null).length;
    const ratio_knownIndices = (knownIndices.length / count_denominator) * 100;
    
    if(cards_selected.length === 1){    // 먼저 선택한 카드가 있는 경우
        if(pairSecondIndex !== null && behaviorChance > dice()){
            if(mistakeChance < dice()){
                console.log("먼저 선택한 카드의 위치를 아는 경우 / 실수 X");
                return pairSecondIndex;
            }else{
                console.log("먼저 선택한 카드의 위치를 아는 경우 / 실수 O");
                return pickRandomAll(cards_opend, cards_owner);
            }
        }
    }
    
    if(pairIndexArray !== null && behaviorChance > dice()){ // 짝이 맞는 카드의 위치를 아는 경우
        if(mistakeChance < dice()){
            console.log("정답 위치를 아는 경우 / 실수 X");
            return pairIndexArray;
        }else{
            console.log("정답 위치를 아는 경우 / 실수 O");
            return pickRandomAll(cards_opend, cards_owner);
        }
    }

    if(knownIndices.length > 1 && ratio_knownIndices < 30 && count_denominator > 6 && behaviorChance > dice()){  // 남은 카드 비율이 조건을 충족하는 경우
        if(mistakeChance < dice()){
            console.log("선택한 적 있는 카드 배열에서 선택 / 실수 X");
            return pickRandomFromArray(knownIndices);
        }else{
            console.log("선택한 적 있는 카드 배열에서 선택 / 실수 O");
            return pickRandomAll(cards_opend, cards_owner);
        }
    }

    if(behaviorChance > dice()){
        if(mistakeChance < dice()){
            console.log("선택한 적 없는 카드 배열에서 선택 / 실수 X");
            return pickRandomFromArray(unknownIndices);
        }else{
            console.log("선택한 적 없는 카드 배열에서 선택 / 실수 O");
            return pickRandomAll(cards_opend, cards_owner);
        }
    }
    console.log("완전 랜덤 선택");
    return pickRandomAll(cards_opend, cards_owner);
}

