import React, { ReactNode, useCallback } from 'react';
import DropdownList from '../../../components/forms/DropdownList';
import {
  faSectionsRoutes,
  Route,
  routesActions,
  useAppDispatch,
  useAppSelector,
} from '../../../lib/store';
import DfaSection from './Dfa';
import MinDfaSection from './MinDfa';
import NfaSection from './Nfa';
import RgSection from './Rg';
import TestSection from './Test';

const sections = {
  [Route.Nfa]: <NfaSection />,
  [Route.Dfa]: <DfaSection />,
  [Route['Min Dfa']]: <MinDfaSection />,
  [Route.Test]: <TestSection />,
  [Route.Rg]: <RgSection />,
} as { [R in typeof faSectionsRoutes[number][1]]: ReactNode };

const tabs = [
  { name: 'My Account', href: '#', current: false },
  { name: 'Company', href: '#', current: false },
  { name: 'Team Members', href: '#', current: true },
  { name: 'Billing', href: '#', current: false },
];

export default function FaSection() {
  const dispatch = useAppDispatch();
  const currentRoute = useAppSelector((state) => state.routes.route);
  const validFaData = useAppSelector((state) => state.faData);

  const onRouteChange = useCallback((r: Route) => dispatch(routesActions.setRoute(r)), []);

  return (
    <div className="my-6 bg-white sm:mx-6 lg:mx-8">
      <div className="flex justify-center pt-5">
        <div className="w-full px-6 sm:hidden">
          <DropdownList
            label="Select a tab"
            srOnlyLabel
            selections={faSectionsRoutes}
            value={currentRoute}
            onSelectionChange={onRouteChange}
          />
        </div>

        <div className="hidden sm:block">
          <nav className="flex space-x-4" aria-label="Tabs">
            {faSectionsRoutes.map(([name, route]) => (
              <button
                key={name}
                onClick={() => onRouteChange(route)}
                className={`${
                  route === currentRoute
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-500 hover:text-gray-700'
                } px-3 py-2 font-semibold text-sm rounded-md disabled:opacity-50 disabled:pointer-events-none uppercase`}
                disabled={route !== currentRoute && !validFaData?.transitions}
                aria-current={route === currentRoute ? 'page' : undefined}
              >
                {name}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className="pt-4 sm:p-6 lg:p-8">{sections[currentRoute]}</div>
    </div>
  );
}
