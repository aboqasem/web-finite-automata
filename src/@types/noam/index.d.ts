declare var noam: {
  fsm: {
    parseFsmFromString(str: string): Fsm;
    serializeFsmToString(fsm: Partial<Fsm>): string;
    convertEnfaToNfa(enfa: Fsm): Fsm;
    convertNfaToDfa(nfa: Fsm): Fsm;
    minimize(nfa: Fsm): Fsm;
    isStringInLanguage(fsm: Fsm, inputStream: string[]): boolean;
    grammar(fsm: Fsm): Grammar;
    [k: string]: any;
  };
  grammar: {
    printAscii(grammar: Grammar): string;
  };
  [k: string]: any;
};

declare interface Fsm {
  states: string[];
  alphabet: string[];
  initialState: string;
  acceptingStates: string[];
  transitions: { fromState: string; symbol: string; toStates: string[] }[];
}

declare interface Grammar {}
