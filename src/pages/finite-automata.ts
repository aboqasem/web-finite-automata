import { html } from 'uhtml';
import { CurrentFaSection } from '../components/current-fa-section';
import { element } from '../lib/utils';
import { dispatch, getState } from '../store';
import {
  faSectionsActions,
  FA_SECTIONS,
} from '../store/finite-automata-sections/finiteAutomataSectionsSlice';

const styles = {
  menuItem: {
    desktop: {
      current: 'bg-gray-900 text-white text-lg',
      normal: 'text-gray-300 hover:bg-gray-700 hover:text-white text-lg',
    },
    mobile: {
      current: 'bg-gray-900 text-white text-base',
      normal: 'text-gray-300 hover:bg-gray-700 hover:text-white text-base',
    },
  },
};

export const FiniteAutomata = () => {
  const { currentFaSection } = getState().faSection;

  const toggleMobileSidebar = () => {
    const sidebar = element('mobile-fa-sidebar');

    sidebar?.classList.toggle('hidden');
    sidebar?.classList.toggle('flex');
  };

  const menuItemsOf = (platform: 'desktop' | 'mobile') => {
    return FA_SECTIONS.map((section) => {
      const isCurrent = section === currentFaSection;
      const type = isCurrent ? 'current' : 'normal';

      return html`<a
        disabled=${isCurrent ? true : undefined}
        class="${'cursor-pointer flex rounded-md px-2 py-2 items-center font-medium ' +
        styles.menuItem[platform][type]}"
        onclick=${() => {
          if (!isCurrent) {
            dispatch(faSectionsActions.to(section));
          }
          if (platform === 'mobile') {
            toggleMobileSidebar();
          }
        }}
        aria-current="${isCurrent ? 'true' : undefined}"
      >
        ${section}
      </a>`;
    });
  };

  return html`<div class="flex flex-grow overflow-hidden">
    <!-- Mobile -->
    <div
      id="mobile-fa-sidebar"
      class="fixed inset-0 hidden z-40 md:hidden"
      role="dialog"
      aria-modal="true"
    >
      <div class="fixed inset-0 bg-gray-600 bg-opacity-75" aria-hidden="true"></div>

      <div class="relative flex-1 flex flex-col max-w-xs w-full bg-gray-800">
        <div class="absolute top-0 right-0 -mr-12 pt-2">
          <button
            type="button"
            onclick="${toggleMobileSidebar}"
            class="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
          >
            <span class="sr-only">Close sidebar</span>
            <svg
              class="h-6 w-6 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div class="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
          <nav class="mt-5 px-2 space-y-1">${menuItemsOf('mobile')}</nav>
        </div>
      </div>

      <div class="flex-shrink-0 w-14">
        <!-- Force sidebar to shrink to fit close icon -->
      </div>
    </div>

    <!-- Desktop -->
    <div class="hidden md:flex md:flex-shrink-0">
      <div class="flex flex-col w-64">
        <div class="flex-1 flex flex-col min-h-0 bg-gray-800">
          <div class="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <nav class="mt-5 flex-1 px-2 bg-gray-800 space-y-1">${menuItemsOf('desktop')}</nav>
          </div>
        </div>
      </div>
    </div>

    <div class="flex flex-col w-0 flex-1 overflow-hidden">
      <!-- Mobile sidebar button -->
      <div class="md:hidden pl-4 pt-1 sm:pl-6 lg:px-8 sm:pt-3">
        <button
          type="button"
          onclick="${toggleMobileSidebar}"
          class="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
        >
          <span class="sr-only">Open sidebar</span>
          <svg
            class="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      <main class="flex-1 overflow-y-auto focus:outline-none">${CurrentFaSection()}</main>
    </div>
  </div>`;
};
