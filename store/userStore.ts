import { create } from 'zustand';
import { Account } from '@/d.types';

interface UserStore {
  userAccounts: Account[] | null;
  selectedAccount: Account | null;
  setAccount: (account: Account) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  userAccounts: null,
  selectedAccount: null,
  setAccount: (account: Account) => set((state) => ({ selectedAccount: account })),
}));
