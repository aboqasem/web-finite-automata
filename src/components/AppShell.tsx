import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useState } from 'react';
import { HiMenu, HiX } from 'react-icons/hi';
import FaIcon from '../assets/svgs/FaIcon';
import { useToggle } from '../lib/hooks/use-toggle';
import { FaMode, FA_MODES, Page, PAGES } from '../lib/types/common';
import DropdownList from './DropdownList';

export interface AppShellProps {
  children: (props: { currentPage: Page; currentFaMode: FaMode }) => React.ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  const [currentPage, setCurrentPage] = useState<Page>('Home');
  const [isMobileMenuOpen, toggleIsMobileMenuOpen] = useToggle(false);

  const isFa = currentPage === 'Finite Automata';
  const [currentFaMode, setCurrentFaMode] = useState<FaMode>(FA_MODES[0]);

  const navClickHandler = (page: Page) => () => {
    if (currentPage === page) {
      return;
    }
    setCurrentPage(page);
    toggleIsMobileMenuOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen overflow-hidden bg-gray-100">
      {/* Top nav*/}
      <header className="relative flex items-center flex-shrink-0 h-16 bg-white">
        <div className="absolute inset-y-0 left-0 md:static md:flex-shrink-0">
          <a
            className={`flex items-center justify-center w-16 h-16 md:p-4 cursor-pointer focus:outline-none md:w-28 ${
              isFa && 'md:bg-indigo-500'
            }`}
            onClick={() => currentPage !== 'Home' && setCurrentPage('Home')}
          >
            <FaIcon />
          </a>
        </div>
        {/* Picker area */}
        {isFa && (
          <div className="w-32 mx-auto md:hidden">
            <DropdownList
              label="Choose finite automata mode"
              selections={FA_MODES}
              selection={currentFaMode}
              onSelectionChange={setCurrentFaMode}
              srOnlyLabel={true}
            />
          </div>
        )}

        {/* Menu button area */}
        <div className="absolute inset-y-0 right-0 flex items-center pr-4 sm:pr-6 md:hidden">
          {/* Mobile menu button */}
          <button
            type="button"
            className="inline-flex items-center justify-center p-2 -mr-2 text-gray-400 rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600"
            onClick={() => toggleIsMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <HiMenu className="block w-6 h-6" aria-hidden="true" />
          </button>
        </div>

        {/* Desktop nav area */}
        <div className="hidden md:min-w-0 md:flex-1 md:flex md:items-center md:justify-end">
          <div className="flex items-center flex-shrink-0 pr-4 ml-10 space-x-10">
            <nav aria-label="Global" className="flex space-x-10">
              {PAGES.map((page) => (
                <a
                  key={page}
                  onClick={navClickHandler(page)}
                  className={`text-sm font-medium text-gray-900 cursor-pointer ${
                    currentPage === page ? 'text-indigo-600' : 'text-gray-900'
                  }`}
                >
                  {page}
                </a>
              ))}
            </nav>
          </div>
        </div>

        {/* Mobile menu, show/hide this `div` based on menu open/closed state */}
        <Transition.Root show={isMobileMenuOpen} as={Fragment}>
          <Dialog
            open={isMobileMenuOpen}
            as="div"
            className="fixed inset-0 z-40 md:hidden"
            onClose={toggleIsMobileMenuOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="hidden sm:block sm:fixed sm:inset-0 sm:bg-gray-600 sm:bg-opacity-75" />
            </Transition.Child>

            <Transition.Child
              as={Fragment}
              enter="transition ease-out duration-150 sm:ease-in-out sm:duration-300"
              enterFrom="transform opacity-0 scale-110 sm:translate-x-full sm:scale-100 sm:opacity-100"
              enterTo="transform opacity-100 scale-100  sm:translate-x-0 sm:scale-100 sm:opacity-100"
              leave="transition ease-in duration-150 sm:ease-in-out sm:duration-300"
              leaveFrom="transform opacity-100 scale-100 sm:translate-x-0 sm:scale-100 sm:opacity-100"
              leaveTo="transform opacity-0 scale-110  sm:translate-x-full sm:scale-100 sm:opacity-100"
            >
              <nav
                className="fixed inset-0 z-40 w-full h-full bg-white sm:inset-y-0 sm:left-auto sm:right-0 sm:max-w-sm sm:w-full sm:shadow-lg"
                aria-label="Global"
              >
                <div className="flex items-center justify-end h-16 px-4 sm:px-6">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center p-2 -mr-2 text-gray-400 rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                    onClick={() => toggleIsMobileMenuOpen(false)}
                  >
                    <span className="sr-only">Close main menu</span>
                    <HiX className="block w-6 h-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="px-2 py-3 mx-auto max-w-8xl sm:px-4">
                  {PAGES.map((page) => (
                    <Fragment key={page}>
                      <a
                        className={`block px-3 py-2 text-base font-medium rounded-md hover:bg-gray-100 cursor-pointer ${
                          currentPage === page ? 'text-indigo-600' : 'text-gray-900'
                        }`}
                        onClick={navClickHandler(page)}
                      >
                        {page}
                      </a>
                    </Fragment>
                  ))}
                </div>
              </nav>
            </Transition.Child>
          </Dialog>
        </Transition.Root>
      </header>

      {/* Bottom section */}
      <div className="flex flex-1 min-h-0 overflow-scroll">
        {/* Narrow sidebar*/}
        {isFa && (
          <nav
            aria-label="Sidebar"
            className="hidden md:block md:flex-shrink-0 md:bg-gray-800 md:overflow-y-auto"
          >
            <div className="relative flex flex-col items-center p-3 space-y-3 w-28">
              {FA_MODES.map((mode) => (
                <a
                  key={mode}
                  onClick={() => setCurrentFaMode(mode)}
                  className={`hover:bg-gray-700 flex-shrink-0 inline-flex items-center justify-center h-14 w-20 rounded-lg cursor-pointer ${
                    mode === currentFaMode ? 'bg-gray-900 text-white' : 'text-gray-400'
                  }`}
                >
                  <span>{mode}</span>
                </a>
              ))}
            </div>
          </nav>
        )}

        {/* Main area */}
        <main className="flex-1 mx-auto">{children({ currentPage, currentFaMode })}</main>
      </div>
    </div>
  );
}
