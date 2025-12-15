import { create } from 'zustand'

interface AppState {
    appLoading: boolean
    setAppLoading: (appLoading: boolean) => void
}

export const useAppStore = create<AppState>((set) => ({
  appLoading: true,
  setAppLoading: (appLoading:boolean) => set({ appLoading }),
}))