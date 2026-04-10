import { create } from "zustand";


interface UIProps{
    modal_settings: boolean;
    toggle_modalSettings: () => void;
    close_modalSettings: () => void;
}
export const useUIStore = create<UIProps>(set=>({
    modal_settings: false,
    toggle_modalSettings: () => set(state => ({modal_settings: !state.modal_settings})),
    close_modalSettings: () => set({modal_settings: false}),
})) 