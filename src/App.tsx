import React from 'react';
import AppShell from './components/AppShell';
import { Route, useAppSelector } from './lib/store';
import FiniteAutomataPage from './pages/FiniteAutomata';
import HelpPage from './pages/Help';
import HomePage from './pages/Home';

export default function App() {
  const currentRoute = useAppSelector((state) => state.routes.route);

  return (
    <div className="min-h-screen">
      <AppShell>
        <section
          aria-labelledby="primary-heading"
          className="flex flex-col items-center flex-1 h-full min-w-0 lg:order-last"
        >
          <h1 id="primary-heading" className="sr-only">
            {currentRoute}
          </h1>
          {currentRoute.startsWith(Route.Home) && <HomePage />}
          {currentRoute.startsWith(Route['Finite Automata']) && <FiniteAutomataPage />}
          {currentRoute.startsWith(Route.Help) && <HelpPage />}
        </section>
      </AppShell>
    </div>
  );
}
