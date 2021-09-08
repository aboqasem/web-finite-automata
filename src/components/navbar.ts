import { html } from 'uhtml';
import { element } from '../lib/utils';
import { dispatch, getState } from '../store';
import { PAGES, pagesActions } from '../store/pages/pagesSlice';

const styles = {
  menuItem: {
    desktop: {
      current: 'bg-gray-900 text-white text-xl',
      normal: 'text-gray-300 hover:bg-gray-700 hover:text-white text-xl',
    },
    mobile: {
      current: 'bg-gray-900 text-white block text-base',
      normal: 'text-gray-300 hover:bg-gray-700 hover:text-white block text-base',
    },
  },
};

export const Navbar = () => {
  const { currentPage } = getState().pages;

  const toggleMobileMenu = () => {
    const menu = element('mobile-menu');
    const menuOpenedIcon = element('menu-opened-icon');
    const menuClosedIcon = element('menu-closed-icon');

    menu?.classList.toggle('hidden');
    menuOpenedIcon?.classList.toggle('block');
    menuOpenedIcon?.classList.toggle('hidden');
    menuClosedIcon?.classList.toggle('block');
    menuClosedIcon?.classList.toggle('hidden');
  };

  const menuItemsOf = (platform: 'desktop' | 'mobile') => {
    return PAGES.map((page) => {
      const isCurrent = page === currentPage;
      const type = isCurrent ? 'current' : 'normal';

      return html`<a
        disabled=${isCurrent ? true : undefined}
        class="${'cursor-pointer rounded-md px-3 py-2 font-medium ' +
        styles.menuItem[platform][type]}"
        onclick=${() => dispatch(pagesActions.to(page))}
        aria-current="${isCurrent ? 'page' : undefined}"
      >
        ${page}
      </a>`;
    });
  };

  return html`<nav class="bg-gray-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16 lg:py-10">
        <div class="flex items-center">
          <!-- Desktop -->
          <div class="flex items-center">
            <div class="hidden md:block">
              <div class="ml-10 flex items-baseline space-x-4">${menuItemsOf('desktop')}</div>
            </div>
          </div>
          <!-- Mobile -->
          <div class="-mr-2 flex md:hidden">
            <!-- Mobile menu button -->
            <button
              type="button"
              onclick=${toggleMobileMenu}
              class="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              aria-controls="mobile-menu"
            >
              <span class="sr-only">Open main menu</span>
              <!-- Menu open: "hidden", Menu closed: "block" -->
              <svg
                id="menu-opened-icon"
                class="block h-6 w-6"
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
              <!-- Menu open: "block", Menu closed: "hidden" -->
              <svg
                id="menu-closed-icon"
                class="hidden h-6 w-6"
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
        </div>
      </div>
    </div>

    <!-- Mobile menu, show/hide based on menu state. -->
    <div class="border-gray-700 hidden md:hidden" id="mobile-menu">
      <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">${menuItemsOf('mobile')}</div>
    </div>
  </nav>`;
};
