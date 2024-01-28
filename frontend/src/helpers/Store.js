import { create } from 'zustand';

const store = (set) => ({
    filterValues: {
        globaloperator: "AND",
        callType: [],
        callDuration: "",
        callDurationFrom: undefined,
        callDurationTo: undefined,
        startTimeFrom: undefined,
        startTimeTo: undefined,
        startTime: "",
        endTimeFrom: undefined,
        endTimeTo: undefined,
        endTime: "",
        callFrom: [],
        callTo: []
    },
    setFilterValues: (newValue) => set({ filterValues: newValue })
})

export const useStore = create(store);