import { html } from 'uhtml';
import { Navbar } from './components/navbar';
import { store } from './store';

export const Dashboard = () => {
  const { currentPage } = store.getState().pages;

  return html`<div>
    <div class="bg-gray-800">${Navbar()}</div>

    <main>
      <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 ">
        <div class="px-4 py-4 sm:px-0 ">
          <div class="flex items-center justify-center ">
            <p class="text-4xl md:text-6xl">${currentPage}</p>
          </div>
        </div>
      </div>
    </main>
  </div>`;
};
