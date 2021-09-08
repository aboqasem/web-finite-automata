import { html } from 'uhtml';
import { CurrentPage } from './components/current-page';
import { Navbar } from './components/navbar';

export const Dashboard = () => {
  return html`<div class="min-h-screen flex flex-col">
    ${Navbar()}

    <main class="flex flex-col flex-grow">${CurrentPage()}</main>
  </div>`;
};
