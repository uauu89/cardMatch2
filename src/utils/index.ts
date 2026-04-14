import { useGameStore } from "../stores/useGameStore"

export function syncDelay(ms: number) {
    return new Promise<void>(resolve => setTimeout(resolve, ms))
}


export function checkGameVersion(version: number){
    return version !== useGameStore.getState().gameVersion;
}