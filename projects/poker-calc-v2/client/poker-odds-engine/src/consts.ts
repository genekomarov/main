export enum SUIT {'D','H','C','S'}
export enum RUNK {'_A', '_K', '_Q', '_J', '_10', '_9', '_8', '_7', '_6', '_5', '_4', '_3', '_2'}

export type TSuit = keyof typeof SUIT;
export const SUITS = Object.keys(SUIT) as TSuit[];

export type TRunk = keyof typeof RUNK;
export const RUNKS = Object.keys(RUNK) as TRunk[];