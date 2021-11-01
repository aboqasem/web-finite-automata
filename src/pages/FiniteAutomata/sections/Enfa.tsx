import React, { useEffect, useMemo, useState } from 'react';
import TextField from '../../../components/forms/TextField';
import { enfaDataActions, useAppDispatch, useAppSelector } from '../../../lib/store';

export default function EnfaSection() {
  const dispatch = useAppDispatch();
  const validEnfaData = useAppSelector((state) => state.enfaData)!;

  const [formTransitions, setFormTransitions] = useState(() =>
    validEnfaData.states.reduce((transitions, state) => {
      validEnfaData.alphabet.concat(/* Ɛ-transition */ 'Ɛ').forEach((char) => {
        transitions[`${state}:${char}`] =
          validEnfaData.transitions
            ?.find(({ fromState, symbol }) => fromState === state && symbol === char)
            ?.toStates.join(',') ?? '';
      });

      return transitions;
    }, {} as { [K in `${string}:${string}`]: string }),
  );
  const [validFormTransitions, setValidFormTransitions] = useState(() => formTransitions);

  const transitions = useMemo(
    () =>
      Object.entries(validFormTransitions)
        .map(([k, v]) => {
          const [fromState, symbol] = k.split(':');
          const toStates = v.split(',');

          return { fromState, symbol, toStates };
        })
        .filter(({ toStates }) => toStates.length && toStates.every((s) => !!s)),
    [validFormTransitions],
  );

  useEffect(() => {
    try {
      dispatch(
        enfaDataActions.setTransitions(
          noam.fsm.parseFsmFromString(
            noam.fsm.serializeFsmToString({ ...validEnfaData, transitions }),
          ).transitions,
        ),
      );
    } catch (e) {
      console.error(e);
    }
  }, [transitions]);

  return (
    <div className="h-full">
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
                        <sup>δ</sup>Ɛ-NFA
                      </th>

                      {validEnfaData.alphabet.concat(/* Ɛ-transition */ 'Ɛ').map((char) => (
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
                    {validEnfaData.states.map((state) => (
                      <tr key={state} className="divide-x">
                        <th
                          scope="row"
                          className="px-6 py-4 text-sm font-medium text-gray-500 border-r bg-gray-50 whitespace-nowrap"
                        >
                          {state === validEnfaData.initialState && '⇨ '}
                          {validEnfaData.acceptingStates.includes(state) && '* '}
                          {state}
                        </th>

                        {validEnfaData.alphabet.concat(/* Ɛ-transition */ 'Ɛ').map((char) => {
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
                                  pattern={`^(?!,)(?:(?:^|,)((${validEnfaData.states.join(
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
    </div>
  );
}
