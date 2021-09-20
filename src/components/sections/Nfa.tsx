import React, { ChangeEventHandler, FormEventHandler, useRef, useState } from 'react';
import { GrTableAdd } from 'react-icons/gr';
import TextField from '../TextField';
import TwoColumnPane from '../TwoColumnPane';

interface NfaInputData {
  states: string;
  alphabet: string;
  initialState: string;
  finalStates: string;
}

interface NfaData {
  states: string[];
  alphabet: string[];
  initialState: string;
  finalStates: string[];
}

export default function NfaSection() {
  const statesInputRef = useRef<HTMLInputElement>(null);
  const [nfaInputData, setNfaInputData] = useState<NfaInputData>({
    states: '',
    alphabet: '',
    initialState: '',
    finalStates: '',
  });
  const [validNfaData, setValidNfaData] = useState<NfaData>();
  const [nfaDataErrors, setNfaDataErrors] = useState<Partial<typeof nfaInputData>>({});

  const onTextFieldChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setNfaInputData((curr) => ({ ...curr, [e.target.id]: e.target.value }));
  };

  const onFormSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    setNfaDataErrors({});
    const nfaData = {
      states: nfaInputData.states.split(','),
      alphabet: nfaInputData.alphabet.split(',').concat(/* Ɛ-transition */ ''),
      initialState: nfaInputData.initialState,
      finalStates: nfaInputData.finalStates.split(','),
    };

    if (!nfaData.states.includes(nfaData.initialState)) {
      return setNfaDataErrors({
        initialState: 'Must be one of the provided states',
      });
    }
    if (!nfaData.finalStates.every((s) => nfaData.states.includes(s))) {
      return setNfaDataErrors({
        finalStates: 'Each must be one of the provided states',
      });
    }

    setValidNfaData(nfaData);
  };

  return (
    <>
      <TwoColumnPane>
        <div className="flex justify-center w-full">
          <form className="flex-1 space-y-6 sm:w-full md:max-w-md" onSubmit={onFormSubmit}>
            <div className="mb-10">
              <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">
                Enter NFA data
              </h2>
            </div>

            <TextField
              inputRef={statesInputRef}
              id="states"
              label="States"
              title="Unique comma separated state strings (e.g. q1,q2,q3)"
              value={nfaInputData.states}
              onChange={onTextFieldChange}
              required
              pattern="^(?!,)(?:(?:^|,)([A-Za-z0-9]+)(?!.*\b\1\b))+$"
              error={nfaDataErrors.states}
            />

            <TextField
              id="alphabet"
              label="Alphabet (Σ)"
              title="Unique comma separated alphabet characters (e.g. 0,1,c)"
              value={nfaInputData.alphabet}
              onChange={onTextFieldChange}
              required
              maxLength={9}
              pattern="^(?!,)(?:(?:^|,)([^ ])(?!.*\1))+$"
              error={nfaDataErrors.alphabet}
            />

            <TextField
              id="initialState"
              label="Initial State"
              title="State string (e.g. A)"
              value={nfaInputData.initialState}
              onChange={onTextFieldChange}
              required
              pattern="^[A-Za-z0-9]+$"
              error={nfaDataErrors.initialState}
            />

            <TextField
              id="finalStates"
              label="Final States"
              title="Unique comma separated state strings (e.g. q1,q2,q3)"
              value={nfaInputData.finalStates}
              onChange={onTextFieldChange}
              required
              pattern="^(?!,)(?:(?:^|,)([A-Za-z0-9]+)(?!.*\b\1\b))+$"
              error={nfaDataErrors.finalStates}
            />

            <div>
              <button
                type="submit"
                className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Generate
              </button>
            </div>
          </form>
        </div>

        <div className="h-full">
          {!validNfaData && (
            <button
              type="button"
              onClick={() => statesInputRef.current?.focus()}
              className="relative hidden w-full h-full p-12 text-center border-2 border-gray-300 border-dashed rounded-lg lg:block hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <GrTableAdd className="w-12 h-12 mx-auto text-gray-400" />
              <span className="block mt-2 text-sm font-medium text-gray-900">Generate an NFA</span>
            </button>
          )}

          {validNfaData && (
            <div className="flex flex-col">
              <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <div className="overflow-hidden border-b border-gray-200 rounded-lg shadow">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr className="divide-x divide-gray-200">
                          <th
                            scope="col"
                            className="px-6 py-3 text-xs font-bold tracking-wider text-center text-gray-500"
                          >
                            <sup>δ</sup>NFA
                          </th>
                          {validNfaData.alphabet.map((char) => (
                            <th
                              key={char}
                              scope="col"
                              className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500"
                            >
                              {char === '' ? 'Ɛ' : char}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y">
                        {validNfaData.states.map((state) => (
                          <tr key={state} className="divide-x">
                            <th
                              scope="row"
                              className="px-6 py-4 text-sm font-medium text-gray-500 border-r bg-gray-50 whitespace-nowrap"
                            >
                              {state === validNfaData.initialState && '⇨ '}
                              {validNfaData.finalStates.includes(state) && '* '}
                              {state}
                            </th>
                            {validNfaData.alphabet.map((char) => (
                              <td
                                key={char}
                                className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap"
                              >
                                {'Ø'}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </TwoColumnPane>
    </>
  );
}
