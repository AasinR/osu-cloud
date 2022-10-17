/* eslint-disable import/prefer-default-export */
import { createContext } from 'react';

export const TokenContext = createContext<(() => Promise<string>) | null>(null);
