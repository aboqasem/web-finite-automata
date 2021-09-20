import React from 'react';
import AppShell from './components/AppShell';
import FiniteAutomataPage from './pages/FiniteAutomata';
import HelpPage from './pages/Help';
import HomePage from './pages/Home';

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <AppShell>
        {({ currentPage, currentFaMode }) => (
          <section
            aria-labelledby="primary-heading"
            className="flex flex-col items-center flex-1 h-full min-w-0 overflow-hidden lg:order-last"
          >
            <h1 id="primary-heading" className="sr-only">
              {currentPage}
            </h1>
            {currentPage === 'Home' && <HomePage />}
            {currentPage === 'Finite Automata' && <FiniteAutomataPage faMode={currentFaMode} />}
            {currentPage === 'Help' && <HelpPage />}
          </section>
        )}
      </AppShell>
    </div>
  );
}
