import { create } from "zustand";


interface UIProps{
    modal_settings: boolean;
    setModal_settings: () => void;
}
export const useUIStore = create<UIProps>(set=>({
    modal_settings: false,
    setModal_settings: () => set(state=>({modal_settings: !state.modal_settings})),
}))