import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface CardsProps{

    cards_value: number[];
    cards_opend: boolean[];
    cards_memory: (number | null)[];
    cards_owner: ("single" | "player" | "ai" | null)[];
    cards_selected: number[];

    clearCards: () => void;

    shuffleCards: (cardsRange: number) => void;
    openCards: (index: number) => void;
    // recordOpenedCards: (index: number) => void;
    markCardOwner: (owner: ("single" | "player" | "ai")) => void;
    resetOpenedCards: () => void;

}

export const useCardsStore = create<CardsProps>()(
    devtools(
        set =>({
            cards_value: [],
            cards_opend: [],
            cards_memory: [],
            cards_owner: [],
            cards_selected: [],

            clearCards: () => {
                set({
                    cards_value: [],
                    cards_opend: [],
                    cards_memory: [],
                    cards_owner: [],
                    cards_selected: [],
                })
            },

            shuffleCards : (cardsRange) => {
                const doubleArray = Array.from({ length: cardsRange }, (_, i) => i + 1)
                                        .flatMap(x=>[x, x]);

                for (let i = doubleArray.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [doubleArray[i], doubleArray[j]] = [doubleArray[j], doubleArray[i]];
                }

                set({
                    cards_value: doubleArray,
                    cards_opend: new Array(doubleArray.length).fill(false),
                    cards_memory: new Array(doubleArray.length).fill(null),
                    cards_owner: new Array(doubleArray.length).fill(null),
                })
            },

            openCards : (index) => {
                set(state => {
                    const selectedCardNumber = state.cards_value[index];
                    const copy_opend = [...state.cards_opend];
                    copy_opend[index] = true;

                    const copy_memory = [...state.cards_memory];
                    if(copy_memory[index] === null) copy_memory[index] = selectedCardNumber;

                    const copy_selected = [...state.cards_selected, index];
                    return {
                        cards_opend: copy_opend,
                        cards_memory: copy_memory,
                        cards_selected: copy_selected,
                    }
                })
            },

            markCardOwner: (owner)=>{
                set(state => {
                    const [card1, card2] = state.cards_selected;
                    const copy_owner = [...state.cards_owner];
                    copy_owner[card1] = owner;
                    copy_owner[card2] = owner;

                    return {cards_owner: copy_owner};
                })
            },

            resetOpenedCards: ()=>{
                set(state => ({
                    cards_opend: new Array(state.cards_value.length).fill(false),
                    cards_selected: [],
                }))
            }
        }),

        {name: "useCardsStore"}
    )
)