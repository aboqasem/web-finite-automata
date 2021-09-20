import React, { ReactNode } from 'react';
import DfaSection from '../components/sections/Dfa';
import MinDfaSection from '../components/sections/MinDfa';
import NfaSection from '../components/sections/Nfa';
import RgSection from '../components/sections/Rg';
import TestSection from '../components/sections/Test';
import { FaMode } from '../lib/types/common';

export interface FiniteAutomataPageProps {
  faMode: FaMode;
}

const sections: { [k in FaMode]: ReactNode } = {
  NFA: <NfaSection />,
  DFA: <DfaSection />,
  'Min DFA': <MinDfaSection />,
  Test: <TestSection />,
  RG: <RgSection />,
};

export default function FiniteAutomataPage({ faMode }: FiniteAutomataPageProps) {
  return <div className="flex-1 w-full">{sections[faMode]}</div>;
}
