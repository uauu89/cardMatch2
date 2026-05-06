import { useGameStore } from "@stores/useGameStore";
import { dice } from "@utils/index";
import type { Type_currentPlayer } from "@customTypes/game";
import { useLogStore } from "@/stores/useLogStore";
import { useCardsStore } from "@/stores/useCardsStore";

const classifyAvailableCards = (
    cards_memory : (number | null)[],
    cards_opened: boolean[],
    cards_owner: (Type_currentPlayer | null)[]
) => {
    const knownIndices: number[] = [];
    const unknownIndices: number[] = [];
    
    cards_memory.forEach((value, index) => {
        if(!cards_opened[index] && cards_owner[index] === null){
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

    if(filteredArray.length === 0) return targetIndices;
    
    const randomRange = Math.floor(Math.random() * targetIndices.length) + 1;

    for(let i = 0; i < randomRange; i++){
        const randomOrder = Math.floor(Math.random() * filteredArray.length);
        copyIndices[i] = filteredArray.splice(randomOrder, 1)[0];
    }
    return copyIndices;
}


const pickRandomIndexFromArray = (targetArray : number[], count: 1 | 2) => {
    const copyTargetArray = [...targetArray];
    const returnArray = [];
    for(let i = 0; i < count; i++){
        const randomIndex = Math.floor(Math.random() * copyTargetArray.length);
        returnArray.push(...copyTargetArray.splice(randomIndex, 1));
    }
    return returnArray;
}


const pickRandomAll = (
    cards_opened: boolean[],
    cards_owner: (Type_currentPlayer | null)[]
) => {
    const filteredArray = cards_opened.reduce<number[]>((acc, isOpen, index) => {
        if (!isOpen && cards_owner[index] === null) {
            acc.push(index);
        }
        return acc;
    }, []);

    if(filteredArray.length === 0) return false;

    const com_index = Math.floor(Math.random() * filteredArray.length) ;
    return [filteredArray[com_index]];
}

export const comAlgorithm = (
    cards_selected: number[],
    cards_opened: boolean[],
    cards_memory : (number | null)[],
    cards_owner: (Type_currentPlayer | null)[]
) => {
    const firstCardIndex = cards_selected[0] ?? null;
    const firstCardNumber = firstCardIndex !== null ? cards_memory[firstCardIndex] : null;
    const pairSecondIndex = findMatchingCardIndex(firstCardIndex, firstCardNumber, cards_memory);
    const pairIndices = getPairIndices(cards_memory, cards_owner);
    const [knownIndices, unknownIndices] = classifyAvailableCards(cards_memory, cards_opened, cards_owner)
    const currentOpenedRatio = cards_memory.filter(value => value !== null).length / cards_opened.length * 100;
    
    const {cards_value} = useCardsStore.getState();
    const {difficultyDetails} = useGameStore.getState();
    const {updateLogEntries} = useLogStore.getState();

    if(cards_selected.length === 1){
        updateLogEntries("mainLog", "Case A", `두 번째 카드 선택`);

        if(pairSecondIndex !== null){
            updateLogEntries("subLog1", "Case A-1", `pairSecondIndex | v: ${cards_value[pairSecondIndex[0]]}, i: ${pairSecondIndex[0]}}`);
            const behaviorChance = dice();

            if(behaviorChance < difficultyDetails.opt_pairSecondIndex){
                let returnIdx = pairSecondIndex;              
                updateLogEntries("subLog2 excute", "Case A-1", `로직 실행 | dice: ${behaviorChance}, standard: ${difficultyDetails.opt_pairSecondIndex}`);
                
                const mistakeChance = dice();
                if(mistakeChance < difficultyDetails.opt_mistake){
                    updateLogEntries("subLog3 mistake", "Case A-1", `실수 발생 | dice: ${mistakeChance}, standard: ${difficultyDetails.opt_mistake}`);
                    const randomIdx = pickRandomAll(cards_opened, cards_owner);
                    if(randomIdx) returnIdx = randomIdx;
                }
                updateLogEntries("returnLog", "Case A-1", `return | v: ${cards_value[returnIdx[0]]}, i: ${returnIdx}`);
                return {comState : "lucky", comIdx : returnIdx} as const;
            }else{
                updateLogEntries("subLog2 skip", "Case A-1", `로직 스킵 | dice: ${behaviorChance}, standard: ${difficultyDetails.opt_pairSecondIndex}`);
            }

        }
        updateLogEntries("subLog1", "Case A-2", "랜덤 선택");

        if(knownIndices.length > 1 && difficultyDetails.opt_OpenedRatio > currentOpenedRatio){ 
            updateLogEntries("subLog2", "Case A-2-1", `Known Array | knownIndices.length: ${knownIndices.length}, OpenedRatio: ${currentOpenedRatio}, standard: ${difficultyDetails.opt_OpenedRatio}`);

            const behaviorChance = dice();
            if(behaviorChance < difficultyDetails.opt_knownIndices){

                updateLogEntries("subLog3 excute", "Case A-2-1", `로직 실행 | dice: ${behaviorChance}, standard: ${difficultyDetails.opt_knownIndices}`);
                let returnIndices = pickRandomIndexFromArray(knownIndices, 1);

                const mistakeChance = dice();
                if(mistakeChance < difficultyDetails.opt_mistake){
                    updateLogEntries("subLog4 mistake", "Case A-2-1", `실수 발생 | dice: ${mistakeChance}, standard: ${difficultyDetails.opt_mistake}`);
                    returnIndices = insertWrongIndex([...returnIndices], cards_owner)
                }
                updateLogEntries("returnLog", "Case A-2-1", `return | v: ${cards_value[returnIndices[0]]}, i: ${returnIndices[0]}`);
                return {comState : "tricky", comIdx : returnIndices} as const;
            }else{
                updateLogEntries("subLog3 skip", "Case A-2-1", `로직 스킵 | dice: ${behaviorChance}, standard: ${difficultyDetails.opt_OpenedRatio}`);
            }
        }

        updateLogEntries("subLog2", "Case A-2-2", `Unknown Array`);
        const behaviorChance = dice();
        if(unknownIndices.length > 0 && behaviorChance < difficultyDetails.opt_unknownIndices){
            updateLogEntries("subLog3 excute", "Case A-2-2", `로직 실행 | dice: ${behaviorChance}, standard: ${difficultyDetails.opt_unknownIndices}`);
            let returnIndices = pickRandomIndexFromArray(unknownIndices, 1);

            const mistakeChance = dice();
            if(mistakeChance < difficultyDetails.opt_mistake){
                updateLogEntries("subLog4 mistake", "Case A-2-2", `실수 발생 | dice: ${mistakeChance}, standard: ${difficultyDetails.opt_mistake}`);
                returnIndices = insertWrongIndex([...returnIndices], cards_owner);
            }
            updateLogEntries("returnLog", "Case A-2-2", `return | v: ${cards_value[returnIndices[0]]}, i: ${returnIndices[0]}`);
            return { comState : "thinking", comIdx : returnIndices } as const;
        }else{
            updateLogEntries("subLog3 skip", "Case A-2-2", `로직 스킵 | dice: ${behaviorChance}, standard: ${difficultyDetails.opt_unknownIndices}`);
        }
        
        
    }

    if(cards_selected.length === 0){
        updateLogEntries("mainLog", "Case B", `첫 번째 카드 선택`);

        if(pairIndices !== null ){
            updateLogEntries("subLog1", "Case B-1", `pairIndices | [v: ${cards_value[pairIndices[0]]}, i: ${pairIndices[0]}], [v: ${cards_value[pairIndices[1]]}, i: ${pairIndices[1]}]`);
            const behaviorChance = dice();

            if(behaviorChance < difficultyDetails.opt_pairIndices){
                updateLogEntries("subLog3 excute", "Case B-1", `로직 실행 | dice: ${behaviorChance}, standard: ${difficultyDetails.opt_pairIndices}`);

                let returnIndices = pairIndices;
                const mistakeChance = dice();
                if(mistakeChance < difficultyDetails.opt_mistake){
                    updateLogEntries("subLog4 mistake", "Case B-1", `실수 발생 | dice: ${mistakeChance}, standard: ${difficultyDetails.opt_mistake}`);
                    returnIndices = insertWrongIndex([...returnIndices], cards_owner);
                }
                updateLogEntries("returnLog", "Case B-1", `return | [v: ${cards_value[returnIndices[0]]}, i: ${returnIndices[0]}], [v: ${cards_value[returnIndices[1]]}, i: ${returnIndices[1]}]`);
                return {comState : "knowCorrect", comIdx : returnIndices} as const;

            }else{
                updateLogEntries("subLog3 skip", "Case B-1", `로직 스킵 | dice: ${behaviorChance}, standard: ${difficultyDetails.opt_pairIndices})`);
            }
            
        }

        updateLogEntries("subLog1", "Case B-2", `랜덤 선택`);
        if(knownIndices.length > 1 && difficultyDetails.opt_OpenedRatio > currentOpenedRatio){
            updateLogEntries("subLog2", "Case B-2-1", `Known Array | knownIndices.length: ${knownIndices.length}, OpenedRatio: ${currentOpenedRatio}, standard: ${difficultyDetails.opt_OpenedRatio}`);

            const behaviorChance = dice();
            if(behaviorChance < difficultyDetails.opt_knownIndices){
                updateLogEntries("subLog3 excute", "Case B-2-1", `로직 실행 | dice: ${behaviorChance}, standard: ${difficultyDetails.opt_knownIndices}`);
                let returnIndices = pickRandomIndexFromArray(knownIndices, 2);
                const mistakeChance = dice();
                if(mistakeChance < difficultyDetails.opt_mistake){
                    updateLogEntries("subLog4 mistake", "Case B-2-1", `실수 발생 | dice: ${mistakeChance}, standard: ${difficultyDetails.opt_mistake}`);
                    returnIndices = pickRandomIndexFromArray(knownIndices, 2);
                }
                updateLogEntries("returnLog", "Case B-2-1", `return | [v: ${cards_value[returnIndices[0]]}, i: ${returnIndices[0]}], [v: ${cards_value[returnIndices[1]]}, i: ${returnIndices[1]}]`);
                return {comState : "tricky", comIdx : returnIndices} as const;
            }else{
                updateLogEntries("subLog3 skip", "Case A-2-1", `로직 스킵 | dice: ${behaviorChance}, standard: ${difficultyDetails.opt_knownIndices}`);
            }
        }
        
        updateLogEntries("subLog2", "Case B-2-2", `열어본 적 없는 카드배열에서 랜덤 선택`);
        const behaviorChance = dice();
        if(unknownIndices.length > 1 && behaviorChance < difficultyDetails.opt_unknownIndices){
            updateLogEntries("subLog3 excute", "Case B-2-2", `로직 실행 | dice: ${behaviorChance}, standard: ${difficultyDetails.opt_unknownIndices}`);
            let returnIndices = pickRandomIndexFromArray(unknownIndices, 2);
            const mistakeChance = dice();

            if(mistakeChance < difficultyDetails.opt_mistake){
                updateLogEntries("subLog4 mistake", "Case B-2-2", `실수 발생 | dice: ${mistakeChance}, standard: ${difficultyDetails.opt_mistake}`);
                returnIndices = insertWrongIndex([...returnIndices], cards_owner);
            }
            updateLogEntries("returnLog", "Case B-2-2", `return | [v: ${cards_value[returnIndices[0]]}, i: ${returnIndices[0]}], [v: ${cards_value[returnIndices[1]]}, i: ${returnIndices[1]}]`);
            return {comState : "thinking", comIdx : returnIndices } as const;
        }else{
            updateLogEntries("subLog3 skip", "Case B-2-2", `로직 스킵 | dice: ${behaviorChance}, standard: ${difficultyDetails.opt_unknownIndices}`);
        }
        
    }
    updateLogEntries("mainLog", "Case C-1", `완전 랜덤 선택`);
    const randomIndices = pickRandomAll(cards_opened, cards_owner);


/* 임시 코드, 개선 필요 */
    if(!randomIndices) return {comState : "thinking", comIdx : [1]} as const;
    
    updateLogEntries("returnLog", "Case C-1", `return | v: ${cards_value[randomIndices[0]]}, i: ${randomIndices[0]}`);
    return {comState : "thinking", comIdx : randomIndices} as const;
    
}
``