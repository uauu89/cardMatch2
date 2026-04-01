import { create } from "zustand";


interface GamePhaseProps {
    gamePhase: "init" | "ready" | "dealing" | "playing";

    phase_dealing: () => void;
    phase_playing: () => void;
    phase_ready: () => void;
}

export const useGamePhaseStore = create<GamePhaseProps>(set=>({

    gamePhase: "init",

    phase_dealing: () => set({gamePhase : "dealing"}),
    phase_playing: () => set({gamePhase : "playing"}),
    phase_ready: () => set({gamePhase : "ready"}),

}))