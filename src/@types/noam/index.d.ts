declare var noam: {
  fsm: {
    parseFsmFromString(str: string): Fsm;
    serializeFsmToString(fsm: Partial<Fsm>): string;
    [k: string]: any;
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
