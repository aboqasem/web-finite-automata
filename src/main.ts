import { html, render } from 'uhtml';
import { Dashboard } from './dashboard';
import { store } from './store';
import './style.css';

const App = () => {
  return html`${Dashboard()}`;
};

const app = document.querySelector<HTMLDivElement>('#app')!;

render(app, App);

store.subscribe(() => render(app, App));
