import { useGameStore } from "@stores/useGameStore";
import { dice } from "@utils/index";
import type { Type_currentPlayer } from "@customTypes/game";

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
    cards_opened: boolean[],
    cards_owner: (Type_currentPlayer | null)[]
) => {
    const filteredArray = cards_opened.reduce<number[]>((acc, isOpen, index) => {
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
    cards_opened: boolean[],
    cards_memory : (number | null)[],
    cards_owner: (Type_currentPlayer | null)[]
) => {
    const firstCardIndex = cards_selected[0] ?? null;
    const firstCardNumber = firstCardIndex !== null ? cards_memory[firstCardIndex] : null;
    const pairSecondIndex = findMatchingCardIndex(firstCardIndex, firstCardNumber, cards_memory);
    const pairIndices = getPairIndices(cards_memory, cards_owner);
    const [knownIndices, unknownIndices] = classifyAvailableCards(cards_memory, cards_opened, cards_owner)
    const {difficultyDetails} = useGameStore.getState();
    const currentOpenedRatio = cards_memory.filter(value => value !== null).length / cards_opened.length * 100;

    if(cards_selected.length === 1){

        console.log("case 1. 두 번째 선택")

        if(pairSecondIndex !== null){
            console.log("첫번째 선택한 카드의 위치를 알고 있음")
            if(difficultyDetails.opt_pairSecondIndex > dice()){

                console.log("  case 1-1: 행동확률 충족, (90%)");

                let returnIdx = pairSecondIndex;

                

                if(difficultyDetails.opt_mistake > dice()){

                    console.log("  case 1-1-m: 실수 발생");
                    returnIdx = pickRandomAll(cards_opened, cards_owner);
                }
                console.log("return idx : ", returnIdx)

                return {
                    comState : "lucky", 
                    comIdx : returnIdx,
                } as const;

            }else{

                console.log("  case 1-1: 첫번째 선택한 카드의 짝의 위치를 알고 있으나 확률 실패");

            }

        }

        console.log("  case 1-2: 랜덤 선택");

        if(knownIndices.length > 1 && difficultyDetails.opt_OpenedRatio > currentOpenedRatio){ 
            if(difficultyDetails.opt_knownIndices > dice()){

                console.log("    case 1-2-1: 열어본 적 있는 카드 배열에서 랜덤 선택 ");

                let returnIndices = pickRandomIndexFromArray(knownIndices, 1);
                if(difficultyDetails.opt_mistake > dice()){

                    console.log("    case 1-2-1-m: 실수 발생");
                    returnIndices = insertWrongIndex(knownIndices, cards_owner)
                }
                console.log("return idx : ", returnIndices)

                return {
                    comState : "tricky",
                    comIdx : returnIndices
                        
                } as const;
            }else{
                console.log("    case 1-2-1: 열어본 적 있는 카드 배열에서 랜덤 선택하려 했으나 확률 실패 ");
            }
        }else{
            if(difficultyDetails.opt_unknownIndices > dice()){
                console.log("    case 1-2-2: 열어본 적 없는 카드 배열에서 랜덤 선택 ");

                let returnIndices = pickRandomIndexFromArray(unknownIndices, 1);

                if(difficultyDetails.opt_mistake > dice()){
                    console.log("    case 1-2-2-m: 실수 발생 ");
                    returnIndices = insertWrongIndex(unknownIndices, cards_owner);
                }
                console.log("return idx : ", returnIndices)

                return {
                    comState : "thinking",
                    comIdx : returnIndices
                } as const;
            }else{
                console.log("    case 1-2-2: 열어본 적 없는 카드 배열에서 랜덤 선택하려 했으나 확률 실패 ");
            }
        }
            
        
    }else{
        console.log("case 2. 첫번째 선택");

        if(pairIndices !== null ){
            if(difficultyDetails.opt_pairIndices > dice()){
                console.log("  case 2-1: 짝이 맞는 카드의 위치를 알고 있을 때");

                let returnIndices = pairIndices;
                if(difficultyDetails.opt_mistake > dice()){
                    console.log("  case 2-1-m: 실수 발생");
                    returnIndices = insertWrongIndex(pairIndices, cards_owner);
                }
                console.log("return idx : ", returnIndices)
                return {
                    comState : "knowCorrect",
                    comIdx : returnIndices
                } as const;
            }else{
                console.log("  case 2-1: 짝이 맞는 카드의 위치를 알고 있지만 확률 실패");
            }
            

            
        }else{

            console.log("  case 2-2: 짝이 맞는 카드의 위치를 모를 때");

            if(knownIndices.length > 1 && difficultyDetails.opt_OpenedRatio > currentOpenedRatio){
                
                if(difficultyDetails.opt_knownIndices > dice()){
                    console.log("    case 2-2-1: 열어본 적 있는 카드 배열에서 랜덤 선택 ");
                    let returnIndices = pickRandomIndexFromArray(knownIndices, 2);
                    if(difficultyDetails.opt_mistake > dice()){
                        console.log("    case 2-2-1-m: 실수 발생");
                    }
                    console.log("return idx : ", returnIndices)
                    
                    return {
                        comState : "tricky",
                        comIdx : returnIndices
                    } as const;
                }else{
                    console.log("    case 2-2-1: 열어본 적 있는 카드 배열에서 랜덤 선택하려 했으나 확률 실패");
                }
            }else{
                if(difficultyDetails.opt_unknownIndices > dice()){
                    let returnIndices = pickRandomIndexFromArray(unknownIndices, 2);
    
                    console.log("    case 2-2-2: 열어본 적 없는 카드 배열에서 랜덤 선택 ");

                    if(difficultyDetails.opt_mistake > dice()){
                        returnIndices = insertWrongIndex(unknownIndices, cards_owner);
                        console.log("    case 2-2-2-m: 실수 발생");
                    }
                    console.log("return idx : ", returnIndices)
                    return {
                        comState : "thinking",
                        comIdx : returnIndices
                    } as const;
        
                }else{
                    console.log("    case 2-2-2: 열어본 적 없는 카드 배열에서 랜덤 선택하려 했으나 확률 실패 ");
                }

            }
    
        }
    }

    console.log("case 3. 완전 랜덤 선택");
    const randomIndices = pickRandomAll(cards_opened, cards_owner)
    console.log("return idx : ", randomIndices)
    return {
        comState : "thinking",
        comIdx : randomIndices
    } as const;
}
