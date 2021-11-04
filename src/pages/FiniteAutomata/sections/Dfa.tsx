import React, { useMemo } from 'react';
import { useAppSelector } from '../../../lib/store';

export default function DfaSection() {
  const validEnfaData = useAppSelector((state) => state.enfaData);

  const dfaData = useMemo(
    () =>
      validEnfaData?.transitions &&
      noam.fsm.convertNfaToDfa(noam.fsm.convertEnfaToNfa(validEnfaData as Fsm)),
    [validEnfaData],
  );

  return (
    <>
      {dfaData && (
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-2">
            <div className="inline-block min-w-full py-2 align-middle sm:px-2">
              <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr className="divide-x divide-gray-200">
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold tracking-wider text-center text-gray-500"
                      >
                        <sup>δ</sup>DFA
                      </th>

                      {dfaData.alphabet.map((char) => (
                        <th
                          key={char}
                          scope="col"
                          className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500"
                        >
                          {char}
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody className="bg-white divide-y">
                    {dfaData.states.map((state) => (
                      <tr key={state} className="divide-x">
                        <th
                          scope="row"
                          className="px-6 py-4 text-sm font-medium text-gray-500 border-r bg-gray-50 whitespace-nowrap"
                        >
                          {state === dfaData.initialState && '⇨ '}
                          {dfaData.acceptingStates.includes(state) && '* '}
                          {state}
                        </th>

                        {dfaData.alphabet.map((char) => {
                          const transition =
                            dfaData.transitions.find(
                              ({ fromState, symbol }) => fromState === state && symbol === char,
                            )?.toStates[0] ?? '';

                          return (
                            <td
                              key={char}
                              className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap"
                            >
                              <div className="w-20 text-center">{transition}</div>
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
