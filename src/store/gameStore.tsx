import { create } from "zustand";

type GameState = {
    cards_value: number[];
    cards_opend: boolean[];
    cards_matched: boolean[];
    cards_selected: number[];

    changeCardState: (index: number, status: boolean) => void;


}

export const useGameStore = create<GameState>((set, get)=>({
    cards_value: [1, 2, 3, 4, 5, 6, 7, 8],
    cards_opend: [],
    cards_matched: [],
    cards_selected: [],

    changeCardState: (index, status) => {

        set(state => {
            const newState = [...state.cards_opend];
            newState[index] = status;

            return {cards_opend: newState};
        })
       
    }
}))