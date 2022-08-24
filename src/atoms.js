import { atom } from 'recoil';
import { getStorage } from './utils';

export const store = atom({
  key: 'store',
  default: getStorage(),
  dangerouslyAllowMutability: true,
});
