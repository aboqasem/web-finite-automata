import React from 'react';
import { FaMode } from '../lib/types/common';

export interface FiniteAutomataPageProps {
  faMode: FaMode;
}

export default function FiniteAutomataPage({ faMode }: FiniteAutomataPageProps) {
  return (
    <div className="flex items-center justify-center">
      <p className="text-4xl md:text-6xl">Finite Automata ({faMode})</p>
    </div>
  );
}
