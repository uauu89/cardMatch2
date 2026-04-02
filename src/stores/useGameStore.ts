import { create } from "zustand";

interface GameProps {
    gamePhase: "init" | "ready" | "dealing" | "playing";
    
    inputLock: boolean;

    turnState: "playing" | "transition" | "paused";
    activePlayer: "single" | "player" | "ai";

    phase_dealing: () => void;
    phase_playing: () => void;
    phase_ready: () => void;

    input_lock: () => void;
    input_unlock: () => void;
}


/*
    

*/

export const useGameStore = create<GameProps>(set=>({

    gamePhase: "init",
    inputLock: true,
    turnState: "paused",
    activePlayer: "single",

    phase_dealing: () => set({gamePhase: "dealing"}),
    phase_playing: () => set({gamePhase: "playing"}),
    phase_ready: () => set({gamePhase: "ready"}),

    input_lock: () => set({inputLock: true}),
    input_unlock: () => set({inputLock: false}),



}))