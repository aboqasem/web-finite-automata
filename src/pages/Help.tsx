import React from 'react';
import { Route, routesActions, useAppDispatch } from '../lib/store';

export default function HelpPage() {
  const dispatch = useAppDispatch();

  return (
    <div className="pt-6">
      <p className="text-4xl md:text-6xl">
        <div className="relative py-16 overflow-hidden bg-white">
          <div className="hidden lg:block lg:absolute lg:inset-y-0 lg:h-full lg:w-full">
            <div className="relative h-full mx-auto text-lg max-w-prose" aria-hidden="true">
              <svg
                className="absolute transform translate-x-32 top-12 left-full"
                width={404}
                height={384}
                fill="none"
                viewBox="0 0 404 384"
              >
                <defs>
                  <pattern
                    id="74b3fd99-0a6f-4271-bef2-e80eeafdf357"
                    x={0}
                    y={0}
                    width={20}
                    height={20}
                    patternUnits="userSpaceOnUse"
                  >
                    <rect
                      x={0}
                      y={0}
                      width={4}
                      height={4}
                      className="text-gray-200"
                      fill="currentColor"
                    />
                  </pattern>
                </defs>
                <rect width={404} height={384} fill="url(#74b3fd99-0a6f-4271-bef2-e80eeafdf357)" />
              </svg>
              <svg
                className="absolute transform -translate-x-32 -translate-y-1/2 top-1/2 right-full"
                width={404}
                height={384}
                fill="none"
                viewBox="0 0 404 384"
              >
                <defs>
                  <pattern
                    id="f210dbf6-a58d-4871-961e-36d5016a0f49"
                    x={0}
                    y={0}
                    width={20}
                    height={20}
                    patternUnits="userSpaceOnUse"
                  >
                    <rect
                      x={0}
                      y={0}
                      width={4}
                      height={4}
                      className="text-gray-200"
                      fill="currentColor"
                    />
                  </pattern>
                </defs>
                <rect width={404} height={384} fill="url(#f210dbf6-a58d-4871-961e-36d5016a0f49)" />
              </svg>
              <svg
                className="absolute transform translate-x-32 bottom-12 left-full"
                width={404}
                height={384}
                fill="none"
                viewBox="0 0 404 384"
              >
                <defs>
                  <pattern
                    id="d3eb07ae-5182-43e6-857d-35c643af9034"
                    x={0}
                    y={0}
                    width={20}
                    height={20}
                    patternUnits="userSpaceOnUse"
                  >
                    <rect
                      x={0}
                      y={0}
                      width={4}
                      height={4}
                      className="text-gray-200"
                      fill="currentColor"
                    />
                  </pattern>
                </defs>
                <rect width={404} height={384} fill="url(#d3eb07ae-5182-43e6-857d-35c643af9034)" />
              </svg>
            </div>
          </div>
          <div className="relative px-4 sm:px-6 lg:px-8">
            <div className="mx-auto text-lg max-w-prose">
              <h1>
                <span className="block text-base font-semibold tracking-wide text-center text-indigo-600 uppercase">
                  Usage Guide
                </span>
                <span className="block mt-2 text-3xl font-extrabold leading-8 tracking-tight text-center text-gray-900 sm:text-4xl">
                  Web Finite Automata
                </span>
              </h1>
              <p className="mt-8 text-xl leading-8 text-gray-500">
                Web Finite Automata is a tool for creating and visualizing finite automatons.
              </p>
            </div>
            <div className="mx-auto mt-6 prose prose-lg text-gray-500 prose-indigo">
              <p>
                You may start by creating a new non-deterministic automaton. You can do this by
                navigating to the{' '}
                <button
                  className="text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline"
                  onClick={() => dispatch(routesActions.setRoute(Route['Finite Automata']))}
                >
                  Finite Automata
                </button>{' '}
                page, then filling out the form.
              </p>
              <p>After you have created an automaton, you can:</p>
              <ul role="list">
                <li>View it as a deterministic automaton by clicking the "DFA" button.</li>
                <li>
                  View it as a minimized deterministic automaton by clicking the "Min-DFA" button.
                </li>
                <li>Test strings against the automaton by clicking the "Test" button.</li>
                <li>View the regular grammar of the automaton by clicking the "RG" button.</li>
              </ul>
            </div>
          </div>
        </div>
      </p>
    </div>
  );
}
