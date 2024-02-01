import create from 'zustand';

const store = (set) => ({
    items: [],
    setItems: (newValue) => set({ items: newValue })
})

export const useStore = create(store);