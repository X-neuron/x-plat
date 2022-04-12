import { atom,selector } from 'recoil';
import defaultAccess from '@/config/access';
import { loginStateAtom } from './login';


export const accessAtom = selector({
  key: 'accessAtom',
  get: ({ get }) => get(loginStateAtom).permission,
  set: ({set,get}, newValue) => set(loginStateAtom, {
    ...get(loginStateAtom),
    ...newValue
  }),
});
