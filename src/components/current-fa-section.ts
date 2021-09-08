import { getState } from '../store';
import { DfaSection } from './finite-automata/dfa-section';
import { MinNfaSection } from './finite-automata/min-nfa-section';
import { NfaSection } from './finite-automata/nfa-section';
import { RgSection } from './finite-automata/rg-section';
import { TestSection } from './finite-automata/test-section';

export const CurrentFaSection = () => {
  const { currentFaSection } = getState().faSection;

  if (currentFaSection === 'NFA') {
    return NfaSection();
  }

  if (currentFaSection === 'DFA') {
    return DfaSection();
  }

  if (currentFaSection === 'Min DFA') {
    return MinNfaSection();
  }

  if (currentFaSection === 'Test') {
    return TestSection();
  }

  return RgSection();
};
