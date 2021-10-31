import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useCallback } from 'react';
import { HiMenu, HiX } from 'react-icons/hi';
import FaIcon from '../assets/svgs/FaIcon';
import { useToggle } from '../lib/hooks/use-toggle';
import { Route, routesActions, topLevelRoutes, useAppDispatch, useAppSelector } from '../lib/store';

export interface AppShellProps {
  children: React.ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  const currentRoute = useAppSelector((state) => state.routes.route);
  const dispatch = useAppDispatch();
  const [isMobileMenuOpen, toggleIsMobileMenuOpen] = useToggle(false);

  const setCurrentRoute = useCallback(
    (route: Route) => {
      if (currentRoute === route) {
        return;
      }
      dispatch(routesActions.setRoute(route));
    },
    [currentRoute],
  );

  const navClickHandler = useCallback(
    (route: Route) => () => {
      setCurrentRoute(route);
      toggleIsMobileMenuOpen(false);
    },
    [currentRoute],
  );

  return (
    <div className="flex flex-col min-h-screen overflow-hidden bg-gray-100">
      {/* Top nav*/}
      <header className="relative flex items-center flex-shrink-0 h-16 bg-white">
        <div className="absolute inset-y-0 left-0 md:static md:flex-shrink-0">
          <a
            className={
              'flex items-center justify-center w-16 h-16 md:p-4 cursor-pointer focus:outline-none md:w-28'
            }
            onClick={() => setCurrentRoute(Route.Home)}
          >
            <FaIcon />
          </a>
        </div>

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
              {topLevelRoutes.map(([name, route]) => (
                <a
                  key={route}
                  onClick={navClickHandler(route)}
                  className={`text-sm font-medium text-gray-900 cursor-pointer ${
                    currentRoute.startsWith(route) ? 'text-indigo-600' : 'text-gray-900'
                  }`}
                >
                  {name}
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
                  {topLevelRoutes.map(([name, route]) => (
                    <Fragment key={route}>
                      <a
                        className={`block px-3 py-2 text-base font-medium rounded-md hover:bg-gray-100 cursor-pointer ${
                          currentRoute.startsWith(route) ? 'text-indigo-600' : 'text-gray-900'
                        }`}
                        onClick={navClickHandler(route)}
                      >
                        {name}
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
      <div className="flex-1 min-h-0">
        {/* Main area */}
        <main className="mx-auto">{children}</main>
      </div>
    </div>
  );
}
