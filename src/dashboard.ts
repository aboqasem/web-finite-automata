import { html } from 'uhtml';
import { CurrentPage } from './components/current-page';
import { Navbar } from './components/navbar';

export const Dashboard = () => {
  return html`<div>
    ${Navbar()}

    <main>
      <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 ">${CurrentPage()}</div>
    </main>
  </div>`;
};
