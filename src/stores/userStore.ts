import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: number;
  email: string;
  role: 'admin' | 'user';
}

interface AuthState {
  user: User | null;
  isHydrated: boolean; // 추가
  login: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isHydrated: false, // 추가
      login: (user: User) => set({ user }),
      logout: () => set({ user: null }),
    }),
    {
      name: 'auth-storage',
      onRehydrateStorage: () => (store: any) => {
        store.setState({ isHydrated: true });
      },
    }
  )
);
