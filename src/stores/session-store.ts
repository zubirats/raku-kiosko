import { create } from 'zustand';

interface SessionStore {
  isAdminMode: boolean;
  lastInteractionTime: number;
  setAdminMode: (isAdmin: boolean) => void;
  updateLastInteraction: () => void;
  resetSession: () => void;
}

export const useSessionStore = create<SessionStore>()((set) => ({
  isAdminMode: false,
  lastInteractionTime: Date.now(),

  setAdminMode: (isAdmin) => {
    set({ isAdminMode: isAdmin });
  },

  updateLastInteraction: () => {
    set({ lastInteractionTime: Date.now() });
  },

  resetSession: () => {
    set({ isAdminMode: false, lastInteractionTime: Date.now() });
  },
}));
