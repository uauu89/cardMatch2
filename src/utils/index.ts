import { useGameStore } from "../stores/useGameStore"
import type { Type_ComActionState } from "../types/game";

export function dice(){
    return Math.floor(Math.random() * 100);
}

export function syncDelay(ms: number) {
    return new Promise<void>(resolve => setTimeout(resolve, ms))
}
export function checkGameVersion(version: number){
    return version !== useGameStore.getState().gameVersion;
}

export function simpleGaussian(second: number, stdev: number) {
    // stdev 값이 클 수록 편차 커짐
    let sum = 0;
    for (let i = 0; i < 3; i++) {
        sum += Math.random();
    }
    return Math.max(100, (sum / 3 - 0.5) * stdev * 2 + second)  ;
}

export function getDelayByState(comState: Type_ComActionState){
    const parmMap = {
        "knowCorrect" : {second : 300, stdev: 100},
        "tricky" : {second : 400, stdev: 200}, 
        "thinking" : {second : 600, stdev: 600}, 
        "lucky" : {second : 300, stdev: 100}, 
    }
    if(comState === "noEmotion") return 400;
    const {second, stdev} = parmMap[comState];

    return simpleGaussian(second, stdev);
}