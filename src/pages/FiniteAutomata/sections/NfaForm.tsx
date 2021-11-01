import React, { ChangeEventHandler, FormEventHandler, useCallback, useRef, useState } from 'react';
import TextField from '../../../components/forms/TextField';
import { enfaDataActions, Route, routesActions, useAppDispatch } from '../../../lib/store';

interface NfaFormData {
  states: string;
  alphabet: string;
  initialState: string;
  acceptingStates: string;
}

export default function NfaForm() {
  const dispatch = useAppDispatch();

  const statesInputRef = useRef<HTMLInputElement>(null);

  const [nfaFormData, setNfaFormData] = useState<NfaFormData>({
    states: '',
    alphabet: '',
    initialState: '',
    acceptingStates: '',
  });
  const [nfaDataErrors, setNfaDataErrors] = useState<Partial<NfaFormData>>({});

  const onTextFieldChange: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    setNfaFormData((curr) => ({ ...curr, [e.target.id]: e.target.value }));
  }, []);

  const onFormSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      e.preventDefault();
      setNfaDataErrors({});

      const nfaData = {
        states: nfaFormData.states.split(','),
        alphabet: nfaFormData.alphabet.split(','),
        initialState: nfaFormData.initialState,
        acceptingStates: nfaFormData.acceptingStates.split(','),
      };

      if (!nfaData.states.includes(nfaData.initialState)) {
        return setNfaDataErrors({
          initialState: 'Must be one of the provided states',
        });
      }
      if (!nfaData.acceptingStates.every((s) => nfaData.states.includes(s))) {
        return setNfaDataErrors({
          acceptingStates: 'Each must be one of the provided states',
        });
      }

      dispatch(enfaDataActions.setFaData(nfaData));
      dispatch(routesActions.setRoute(Route.Nfa));
    },
    [nfaFormData],
  );

  return (
    <div className="flex-1 w-full my-10">
      <div className="flex items-center justify-center w-full">
        <form
          className="flex-1 mx-6 space-y-6 md:mx-0 sm:w-full md:max-w-md"
          onSubmit={onFormSubmit}
        >
          <div className="mb-10">
            <h2 className="mt-6 text-3xl font-extrabold text-center text-gray-900">
              Enter NFA Data
            </h2>
          </div>

          <TextField
            inputRef={statesInputRef}
            id="states"
            label="States"
            title="Unique comma separated state strings (e.g. q1,q2,q3)"
            value={nfaFormData.states}
            onChange={onTextFieldChange}
            required
            pattern="^(?!,)(?:(?:^|,)([A-Za-z0-9]+)(?!.*\b\1\b))+$"
            error={nfaDataErrors.states}
          />

          <TextField
            id="alphabet"
            label="Alphabet (Σ)"
            title="Unique comma separated alphabet characters (e.g. 0,1,c)"
            value={nfaFormData.alphabet}
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
            value={nfaFormData.initialState}
            onChange={onTextFieldChange}
            required
            pattern="^[A-Za-z0-9]+$"
            error={nfaDataErrors.initialState}
          />

          <TextField
            id="acceptingStates"
            label="Final States"
            title="Unique comma separated state strings (e.g. q1,q2,q3)"
            value={nfaFormData.acceptingStates}
            onChange={onTextFieldChange}
            required
            pattern="^(?!,)(?:(?:^|,)([A-Za-z0-9]+)(?!.*\b\1\b))+$"
            error={nfaDataErrors.acceptingStates}
          />

          <div>
            <button
              type="submit"
              className="flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Generate Table
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
