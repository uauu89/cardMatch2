import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface LogProps{
    logEntries : {
        id: number;
        class: string;
        caseID: string;
        log: string;
    }[],
    updateLogEntries: (classify: string, caseID: string, log: string) => void;
    clearLogEntries: () => void;
}

let logID = 0;

export const useLogStore = create<LogProps>()(
    devtools(
        set => ({
            logEntries: [],

            updateLogEntries: (classify, caseID, log) => {
                set(state => {
                    const copy_entries = [...state.logEntries, {id: logID++, class: classify, caseID: caseID, log: log}].slice(-200);
                    return {logEntries: copy_entries}
                })
            },

            clearLogEntries: () => set({logEntries: []}),

        })
    )
)