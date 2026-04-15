import type { Type_currentPlayer } from "../types/game";

const behaviorChance = 100;
const mistakeChance = 40;

const dice = () => {
    return Math.floor(Math.random() * 100);
}

const classifyAvailableCards = (
    cards_memory : (number | null)[],
    cards_opend: boolean[],
    cards_owner: (Type_currentPlayer | null)[]
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

    return [firstIndex === firstCardIndex? lastIndex : firstIndex];
}
const getPairIndices = (
    cards_memory : (number | null)[],
    cards_owner: (Type_currentPlayer | null)[]
) => {
    // 최초 filter = [(1번카드)[카드인덱스, 카드인덱스], (2번카드)[인덱스, 인덱스]...]
    const result: number[][] = Array.from({length: cards_memory.length / 2 + 1}, () => []);

    for(let i = 0; i < cards_memory.length; i++){
        const value = cards_memory[i];
        if(value !== null && cards_owner[i] === null){
            result[value].push(i);
            if(result[value].length === 2) return result[value]
        }
    }

    return null;
}
const insertWrongIndex = (
    targetIndices: number[],
    cards_owner: (Type_currentPlayer | null)[]
) => {
    const copyIndices = [...targetIndices];
    const filteredArray = cards_owner.reduce<number[]>((acc, current, index) => {
        if(current === null && !targetIndices.includes(index)){
            acc.push(index);
        }
        return acc;
    }, [])
    
    const randomRange = Math.floor(Math.random() * targetIndices.length) + 1;

    for(let i = 0; i < randomRange; i++){
        const randomOrder = Math.floor(Math.random() * filteredArray.length);
        copyIndices[i] = filteredArray.splice(randomOrder, 1)[0];
    }
    return copyIndices;
}

const pickRandomIndexFromArray = (targetArray : number[], count: 1 | 2) => {
    const copyTargetArray = [...targetArray]
    const returnArray = [];
    for(let i = 0; i < count; i++){
        const randomIndex = Math.floor(Math.random() * copyTargetArray.length);
        returnArray.push(...copyTargetArray.splice(randomIndex, 1));
    }
    return returnArray;
}
const pickRandomAll = (
    cards_opend: boolean[],
    cards_owner: (Type_currentPlayer | null)[]
) => {
    const filteredArray = cards_opend.reduce<number[]>((acc, isOpen, index) => {
        if (!isOpen && cards_owner[index] === null) {
            acc.push(index);
        }
        return acc;
    }, []);

    const com_index = Math.floor(Math.random() * filteredArray.length) ;
    return [filteredArray[com_index]];
}

export const comAlgorithm = (
    cards_selected: number[],
    cards_opend: boolean[],
    cards_memory : (number | null)[],
    cards_owner: (Type_currentPlayer | null)[]
) => {
    const firstCardIndex = cards_selected[0] ?? null;
    const firstCardNumber = firstCardIndex !== null ? cards_memory[firstCardIndex] : null;

    const pairSecondIndex = findMatchingCardIndex(firstCardIndex, firstCardNumber, cards_memory);
    const pairIndices = getPairIndices(cards_memory, cards_owner);
    
    const [knownIndices, unknownIndices] = classifyAvailableCards(cards_memory, cards_opend, cards_owner)

    const count_denominator = cards_owner.filter(owner => owner === null).length;
    const ratio_knownIndices = (knownIndices.length / count_denominator) * 100;
    

    // < dice() : 실수 X

    if(cards_selected.length === 1){    // 먼저 선택한 카드가 있는 경우
        if(pairSecondIndex !== null && behaviorChance > dice()){    // 짝 카드의 위치를 알 때 behavior = pairIndex
            return {
                comState : "lucky", 
                comIdx : mistakeChance < dice() 
                    ? pairSecondIndex
                    : pickRandomAll(cards_opend, cards_owner)
            } as const;
        }else{  //짝 카드의 위치를 모를 때
            if(knownIndices.length > 1 && ratio_knownIndices < 30 && count_denominator > 6 && behaviorChance > dice()){ // 열어본 카드가 몇장 없을 때 behavior = known
                const returnIndices = pickRandomIndexFromArray(knownIndices, 1);
                return {
                    comState : "tricky",
                    comIdx : mistakeChance < dice()
                        ? returnIndices
                        : insertWrongIndex(knownIndices, cards_owner)
                } as const;
                
            }
            if(behaviorChance > dice()){    //behavior = unknown
                const returnIndices = pickRandomIndexFromArray(unknownIndices, 1);
                return {
                    comState : "thinking",
                    comIdx : mistakeChance < dice()
                        ? returnIndices
                        : insertWrongIndex(unknownIndices, cards_owner)
                } as const;
            }
        }
    }
    
    if(pairIndices !== null && behaviorChance > dice()){ // 짝이 맞는 카드의 위치를 둘 다 아는 경우
        return {
            comState : "knowCorrect",
            comIdx : mistakeChance < dice() 
            ? pairIndices
            : insertWrongIndex(pairIndices, cards_owner)
        } as const;
    }

    if(knownIndices.length > 1 && ratio_knownIndices < 30 && count_denominator > 6 && behaviorChance > dice()){  // 남은 카드 비율이 조건을 충족하는 경우
        const returnIndices = pickRandomIndexFromArray(knownIndices, 2);
        return {
            comState : "tricky",
            comIdx : mistakeChance < dice()
                ? returnIndices
                : insertWrongIndex(knownIndices, cards_owner)
        } as const;
    }

    if(behaviorChance > dice()){
        const returnIndices = pickRandomIndexFromArray(unknownIndices, 2);

        return {
            comState : "thinking",
            comIdx : mistakeChance < dice()
                ? returnIndices
                : insertWrongIndex(unknownIndices, cards_owner)
        } as const;
    }

    return {
        comState : "thinking",
        comIdx : pickRandomAll(cards_opend, cards_owner)
    } as const;
}

