import { useGameStore } from "@stores/useGameStore";
import { dice } from "@utils/index";
import type { Type_currentPlayer } from "@customTypes/game";
import { useLogStore } from "@/stores/useLogStore";

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
    console.log("---insertwrong, 1. targetIndices : ", targetIndices);
    const copyIndices = [...targetIndices];
    const filteredArray = cards_owner.reduce<number[]>((acc, current, index) => {
        if(current === null && !targetIndices.includes(index)){
            acc.push(index);
        }
        return acc;
    }, [])
    console.log("---insertwrong, 2. filteredArray : ", filteredArray);
    
    const randomRange = Math.floor(Math.random() * targetIndices.length) + 1;

    for(let i = 0; i < randomRange; i++){
        const randomOrder = Math.floor(Math.random() * filteredArray.length);
        copyIndices[i] = filteredArray.splice(randomOrder, 1)[0];
    }
    console.log("---insertwrong, 3. returnArray : ", copyIndices);
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
    const currentOpenedRatio = cards_memory.filter(value => value !== null).length / cards_opened.length * 100;
    
    const {difficultyDetails} = useGameStore.getState();
    const {updateLogEntries} = useLogStore.getState();

    if(cards_selected.length === 1){

        // console.log("1. 두 번째 선택");
        updateLogEntries("mainLog", `두 번째 카드 선택 (첫번째 카드 | 번호: ${cards_memory[cards_selected[0]]}, 위치: ${cards_selected[0]} )`);

        if(pairSecondIndex !== null){
            // console.log("1-1. 첫번째 선택한 카드의 짝의 위치를 알고 있음");
            updateLogEntries("subLog1", "먼저 선택한 카드의 짝을 확정선택");
            const behaviorChance = dice();

            if(behaviorChance < difficultyDetails.opt_pairSecondIndex){

                // console.log("  1-1-1: 행동확률 통과, (90%)");
                let returnIdx = pairSecondIndex;              
                updateLogEntries("subLog2", `로직 실행 | dice(${behaviorChance}) < ${difficultyDetails.opt_pairSecondIndex})`);
                
                const mistakeChance = dice();
                if(mistakeChance < difficultyDetails.opt_mistake){
                    // console.log("  1-1-1m: 실수 발생");
                    updateLogEntries("subLog3", `실수 발생 | dice(${mistakeChance}) < ${difficultyDetails.opt_mistake})`);
                    returnIdx = pickRandomAll(cards_opened, cards_owner);
                }

                // console.log("return idx : ", returnIdx);
                updateLogEntries("returnLog", `로직 결과 - 선택할 카드의 위치 : ${returnIdx}`);
                return {comState : "lucky", comIdx : returnIdx} as const;

            }else{
                updateLogEntries("subLog2", `로직 스킵 (${behaviorChance}% > ${difficultyDetails.opt_pairSecondIndex}%)`);
            }

        }

        // console.log("  case 1-2: 랜덤 선택");
        updateLogEntries("subLog1", "랜덤 선택");

        if(knownIndices.length > 1 && difficultyDetails.opt_OpenedRatio > currentOpenedRatio){ 

            // console.log("case 1-2-1: 열어본 적 있는 카드 배열에서 랜덤 선택 ");
            updateLogEntries("subLog2", `이미 열어본 적 있는 카드배열에서 랜덤 선택 | 현재 오픈된 카드 비율(${currentOpenedRatio}%) < ${difficultyDetails.opt_OpenedRatio}%`);

            const behaviorChance = dice();
            if(behaviorChance < difficultyDetails.opt_knownIndices){

                updateLogEntries("subLog3", `로직 실행 | dice(${behaviorChance}) < ${difficultyDetails.opt_knownIndices})`);
                let returnIndices = pickRandomIndexFromArray(knownIndices, 1);

                const mistakeChance = dice();
                if(mistakeChance < difficultyDetails.opt_mistake){
                    // console.log("    case 1-2-1-m: 실수 발생");
                    updateLogEntries("subLog4", `실수 발생 | dice(${mistakeChance}) < ${difficultyDetails.opt_mistake})`);
                    returnIndices = insertWrongIndex([...returnIndices], cards_owner)
                }
                console.log("return idx : ", returnIndices)
                updateLogEntries("returnLog", `로직 결과 - 선택할 카드의 위치 : ${returnIndices[0]}, ${returnIndices[1]}`);
                return {comState : "tricky", comIdx : returnIndices} as const;
            }else{
                updateLogEntries("subLog3", `로직 스킵 (${behaviorChance}% > ${difficultyDetails.opt_OpenedRatio}%)`);
                // console.log("    case 1-2-1: 열어본 적 있는 카드 배열에서 랜덤 선택하려 했으나 확률 실패 ");
            }
        }

        updateLogEntries("subLog2", `열어본 적 없는 카드배열에서 랜덤 선택`);

        const behaviorChance = dice();
        if(behaviorChance < difficultyDetails.opt_unknownIndices){

            // console.log("    case 1-2-2: 열어본 적 없는 카드 배열에서 랜덤 선택 ");
            updateLogEntries("subLog3", `로직 실행 | dice(${behaviorChance}) < ${difficultyDetails.opt_unknownIndices})`);
            let returnIndices = pickRandomIndexFromArray(unknownIndices, 1);

            const mistakeChance = dice();
            if(mistakeChance < difficultyDetails.opt_mistake){
                // console.log("    case 1-2-2-m: 실수 발생 ");
                updateLogEntries("subLog4", `실수 발생 | dice(${mistakeChance}) < ${difficultyDetails.opt_mistake})`);
                returnIndices = insertWrongIndex([...returnIndices], cards_owner);
            }
            // console.log("return idx : ", returnIndices)

            updateLogEntries("returnLog", `로직 결과 - 선택할 카드의 위치 : ${returnIndices[0]}, ${returnIndices[1]}`);
            return { comState : "thinking", comIdx : returnIndices } as const;
        }else{
            // console.log("    case 1-2-2: 열어본 적 없는 카드 배열에서 랜덤 선택하려 했으나 확률 실패 ");
            updateLogEntries("subLog3", `로직 스킵 (${behaviorChance} > ${difficultyDetails.opt_unknownIndices})`);
        }
        
        
    }

    if(cards_selected.length === 0){
        // console.log("case 2. 첫번째 카드 선택");
        updateLogEntries("mainLog", `첫 번째 카드 선택`);

        if(pairIndices !== null ){
            // console.log("case 2-1. 공개된 페어의 위치를 알고 있음");
            updateLogEntries("subLog1", `알고있는 카드 짝 중에서 선택`);
            const behaviorChance = dice();

            if(behaviorChance < difficultyDetails.opt_pairIndices){
                // console.log("  case 2-1-1: 행동확률 충족");

                updateLogEntries("subLog3", `로직 실행 | dice(${behaviorChance}) < ${difficultyDetails.opt_pairIndices})`);
                let returnIndices = pairIndices;
                const mistakeChance = dice();
                
                if(mistakeChance < difficultyDetails.opt_mistake){
                    // console.log("  case 2-1-1-m: 실수 발생");
                    updateLogEntries("subLog4", `실수 발생 | dice(${mistakeChance}) < ${difficultyDetails.opt_mistake})`);
                    returnIndices = insertWrongIndex([...returnIndices], cards_owner);
                }
                // console.log("return idx : ", returnIndices)
                updateLogEntries("returnLog", `로직 결과 - 선택할 카드의 위치 : ${returnIndices[0]}, ${returnIndices[1]}`);
                return {comState : "knowCorrect", comIdx : returnIndices} as const;

            }else{
                // console.log("  case 2-1-2: 행동확률 실패");
                updateLogEntries("subLog3", `로직 스킵 (${behaviorChance} > ${difficultyDetails.opt_pairIndices})`);
            }
            
        }

        // console.log("  case 2-2: 임의 선택");
        updateLogEntries("subLog1", `랜덤 선택`);
        if(knownIndices.length > 1 && difficultyDetails.opt_OpenedRatio > currentOpenedRatio){

            // updateLogEntries("subLog2", `랜덤 선택`);
            updateLogEntries("subLog2", `이미 열어본 적 있는 카드배열에서 랜덤 선택 | 현재 오픈된 카드 비율(${currentOpenedRatio}%) < ${difficultyDetails.opt_OpenedRatio}%`);

            const behaviorChance = dice();
            if(behaviorChance < difficultyDetails.opt_knownIndices){
                // console.log("    case 2-2-1: 열어본 적 있는 카드 배열에서 랜덤 선택 ");
                updateLogEntries("subLog3", `로직 실행 | dice(${behaviorChance}) < ${difficultyDetails.opt_knownIndices})`);
                let returnIndices = pickRandomIndexFromArray(knownIndices, 2);

                const mistakeChance = dice();
                updateLogEntries("subLog3", `실수확률 | difficultyDetails.opt_mistake : ${difficultyDetails.opt_mistake}, mistakeChance: ${mistakeChance}`);
                if(mistakeChance < difficultyDetails.opt_mistake){
                    // console.log("    case 2-2-1-m: 실수 발생");
                    updateLogEntries("subLog4", `실수 발생 | dice(${mistakeChance}) < ${difficultyDetails.opt_mistake})`);
                    returnIndices = pickRandomIndexFromArray(knownIndices, 2);
                }

                // console.log("return idx : ", returnIndices)
                updateLogEntries("returnLog", `로직 결과 - 선택할 카드의 위치 : ${returnIndices[0]}, ${returnIndices[1]}`);
                
                return {comState : "tricky", comIdx : returnIndices} as const;
            }else{
                // console.log("    case 2-2-1: 열어본 적 있는 카드 배열에서 랜덤 선택하려 했으나 확률 실패");
                updateLogEntries("subLog3", `로직 스킵 (${behaviorChance} > ${difficultyDetails.opt_knownIndices})`);
            }
        }
        
        updateLogEntries("subLog2", `열어본 적 없는 카드배열에서 랜덤 선택`);
        const behaviorChance = dice();
        if(behaviorChance < difficultyDetails.opt_unknownIndices){
            updateLogEntries("subLog3", `로직 실행 | dice(${behaviorChance}) < ${difficultyDetails.opt_unknownIndices})`);

            let returnIndices = pickRandomIndexFromArray(unknownIndices, 2);

            // console.log("    case 2-2-2: 열어본 적 없는 카드 배열에서 랜덤 선택 ");
            const mistakeChance = dice();
            updateLogEntries("subLog3", `실수확률 | difficultyDetails.opt_mistake : ${difficultyDetails.opt_mistake}, mistakeChance: ${mistakeChance}`);
            if(mistakeChance < difficultyDetails.opt_mistake){
                // console.log("    case 2-2-2-m: 실수 발생");
                updateLogEntries("subLog4", `실수 발생 | dice(${mistakeChance}) < ${difficultyDetails.opt_mistake})`);
                returnIndices = insertWrongIndex([...returnIndices], cards_owner);
            }
            // console.log("return idx : ", returnIndices)
            updateLogEntries("returnLog", `로직 결과 - 선택할 카드의 위치 : ${returnIndices[0]}, ${returnIndices[1]}`);
            return {comState : "thinking", comIdx : returnIndices } as const;

        }else{
            // console.log("    case 2-2-2: 열어본 적 없는 카드 배열에서 랜덤 선택하려 했으나 확률 실패 ");
            updateLogEntries("subLog3", `로직 스킵 (${behaviorChance} > ${difficultyDetails.opt_unknownIndices})`);
        }

        
    
        
    }

    // console.log("case 3. 완전 랜덤 선택");
    updateLogEntries("mainLog", `완전 랜덤 선택`);
    const randomIndices = pickRandomAll(cards_opened, cards_owner)
    // console.log("return idx : ", randomIndices)
    updateLogEntries("returnLog", `로직 결과 - 선택할 카드의 위치 : ${randomIndices[0]}`);
    return {comState : "thinking", comIdx : randomIndices} as const;
}
``