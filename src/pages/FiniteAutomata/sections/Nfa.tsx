import React, { useState } from 'react';
import TextField from '../../../components/forms/TextField';
import { useAppSelector } from '../../../lib/store';

export default function NfaSection() {
  const validFaData = useAppSelector((state) => state.faData)!;

  const [formTransitions, setFormTransitions] = useState(() =>
    validFaData.states.reduce((transitions, state) => {
      validFaData.alphabet.forEach((char) => {
        transitions[`${state}:${char}`] = '';
      });

      return transitions;
    }, {} as { [K in `${string}:${string}`]: string }),
  );
  const [_validFormTransitions, setValidFormTransitions] = useState(() => formTransitions);

  return (
    <div className="h-full">
      {validFaData && (
        <div className="mx-auto">
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
                          <sup>δ</sup>NFA
                        </th>

                        {validFaData.alphabet.map((char) => (
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
                      {validFaData.states.map((state) => (
                        <tr key={state} className="divide-x">
                          <th
                            scope="row"
                            className="px-6 py-4 text-sm font-medium text-gray-500 border-r bg-gray-50 whitespace-nowrap"
                          >
                            {state === validFaData.initialState && '⇨ '}
                            {validFaData.finalStates.includes(state) && '* '}
                            {state}
                          </th>

                          {validFaData.alphabet.map((char) => {
                            const transition = formTransitions[`${state}:${char}`];

                            return (
                              <td
                                key={char}
                                className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap"
                              >
                                <div className="flex items-center justify-center">
                                  <span className="pr-1 text-2xl font-extralight">
                                    {transition.trim() ? '{' : ''}
                                  </span>

                                  <TextField
                                    className="w-20 text-center invalid:text-red-900 invalid:placeholder-red-300 invalid:border-red-300 focus:invalid:ring-red-500 focus:invalid:border-red-500"
                                    label=""
                                    placeholder="Ø"
                                    title="Unique comma separated state strings (e.g. q1,q2,q3)"
                                    pattern={`^(?!,)(?:(?:^|,)((${validFaData.states.join(
                                      '|',
                                    )})+)(?!.*\\b\\1\\b))+$`}
                                    onChange={(e) => {
                                      setFormTransitions((transitions) => ({
                                        ...transitions,
                                        [`${state}:${char}`]: e.target.value,
                                      }));

                                      if (e.target.validity.valid) {
                                        setValidFormTransitions((transitions) => ({
                                          ...transitions,
                                          [`${state}:${char}`]: e.target.value,
                                        }));
                                      }
                                    }}
                                    value={transition}
                                  />

                                  <span className="pl-1 text-2xl font-extralight">
                                    {transition.trim() ? '}' : ''}
                                  </span>
                                </div>
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
        </div>
      )}
    </div>
  );
}
