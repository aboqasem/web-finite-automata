import { FiniteAutomata } from '../pages/finite-automata';
import { Help } from '../pages/help';
import { Home } from '../pages/home';
import { store } from '../store';

export const CurrentPage = () => {
  const { currentPage } = store.getState().pages;

  if (currentPage === 'Home') {
    return Home();
  }

  if (currentPage === 'Finite Automata') {
    return FiniteAutomata();
  }

  return Help();
};
