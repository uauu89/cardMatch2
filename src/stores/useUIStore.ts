import { create } from "zustand";


interface UIProps{
    modalSettings_isOpen: boolean;
    comLogs_isOpen: boolean;
    bgGameOver_isVisible: boolean;
    
    toggle_modalSettings: () => void;
    close_modalSettings: () => void;

    toggle_modalComLogs: () => void;
    close_modalComLogs: () => void;

    toggle_bgGameOver: () => void;
    reset_bgGameOver: () => void;
}
export const useUIStore = create<UIProps>(set=>({
    modalSettings_isOpen: false,
    comLogs_isOpen: false,
    bgGameOver_isVisible: true,
    toggle_modalSettings: () => set(state => ({modalSettings_isOpen: !state.modalSettings_isOpen})),
    close_modalSettings: () => set({modalSettings_isOpen: false}),

    toggle_modalComLogs: () => set(state => ({comLogs_isOpen: !state.comLogs_isOpen})),
    close_modalComLogs: () => set({comLogs_isOpen: false}),

    toggle_bgGameOver: () => set(state => ({bgGameOver_isVisible: !state.bgGameOver_isVisible})),
    reset_bgGameOver: () => set({bgGameOver_isVisible: true}),
})) 