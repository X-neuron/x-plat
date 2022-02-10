import { atom } from 'recoil';

export const loginStateAtom = atom({
  key: 'loginStateAtom',
  default: {
    role: null,
    id: null,
    name: localStorage.getItem('accountName'),
    account: localStorage.getItem('account'),
    accessToken: localStorage.getItem('xplat-token'),
    ssKey: null,
  },
});
