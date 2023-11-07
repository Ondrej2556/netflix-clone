import { create } from 'zustand';
import { Account } from '@/d.types';

interface UserStore {
  userAccounts: Account[] | null;
  selectedAccount: Account | null;
  setAccount: (account: Account) => void;
  setUserAccounts: (accounts: Account []) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  userAccounts: null,
  selectedAccount: null,
  setAccount: (account: Account) => set((state) => ({ selectedAccount: account })),
  setUserAccounts: (accounts: Account []) => set((state) => ({userAccounts: accounts}))
}));
