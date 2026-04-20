import { create } from "zustand";


interface UIProps{
    modal_settings: boolean;
    modal_comLogs: boolean;
    toggle_modalSettings: () => void;
    close_modalSettings: () => void;
    toggle_modalComLogs: () => void;
    close_modalComLogs: () => void;
}
export const useUIStore = create<UIProps>(set=>({
    modal_settings: false,
    modal_comLogs: false,
    toggle_modalSettings: () => set(state => ({modal_settings: !state.modal_settings})),
    close_modalSettings: () => set({modal_settings: false}),
    toggle_modalComLogs: () => set(state => ({modal_comLogs: !state.modal_comLogs})),
    close_modalComLogs: () => set({modal_comLogs: false}),
})) 