export const PAGES = ['Home', 'Finite Automata', 'Help'] as const;
export type Page = typeof PAGES[number];

export const FA_MODES = ['NFA', 'DFA', 'Min DFA', 'Test', 'RG'] as const;
export type FaMode = typeof FA_MODES[number];
