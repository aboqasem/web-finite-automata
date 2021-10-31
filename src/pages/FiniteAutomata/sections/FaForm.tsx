import React, { ChangeEventHandler, FormEventHandler, useCallback, useRef, useState } from 'react';
import TextField from '../../../components/forms/TextField';
import { faDataActions, Route, routesActions, useAppDispatch } from '../../../lib/store';

interface FaFormData {
  states: string;
  alphabet: string;
  initialState: string;
  finalStates: string;
}

export default function FaForm() {
  const dispatch = useAppDispatch();

  const statesInputRef = useRef<HTMLInputElement>(null);

  const [faFormData, setFaFormData] = useState<FaFormData>({
    states: '',
    alphabet: '',
    initialState: '',
    finalStates: '',
  });
  const [faDataErrors, setFaDataErrors] = useState<Partial<FaFormData>>({});

  const onTextFieldChange: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    setFaFormData((curr) => ({ ...curr, [e.target.id]: e.target.value }));
  }, []);

  const onFormSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      e.preventDefault();
      setFaDataErrors({});

      const faData = {
        states: faFormData.states.split(','),
        alphabet: faFormData.alphabet.split(',').concat(/* Ɛ-transition */ 'Ɛ'),
        initialState: faFormData.initialState,
        finalStates: faFormData.finalStates.split(','),
      };

      if (!faData.states.includes(faData.initialState)) {
        return setFaDataErrors({
          initialState: 'Must be one of the provided states',
        });
      }
      if (!faData.finalStates.every((s) => faData.states.includes(s))) {
        return setFaDataErrors({
          finalStates: 'Each must be one of the provided states',
        });
      }

      dispatch(faDataActions.setFaData(faData));
      dispatch(routesActions.setRoute(Route.Nfa));
    },
    [faFormData],
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
              Enter Finite Automaton Data
            </h2>
          </div>

          <TextField
            inputRef={statesInputRef}
            id="states"
            label="States"
            title="Unique comma separated state strings (e.g. q1,q2,q3)"
            value={faFormData.states}
            onChange={onTextFieldChange}
            required
            pattern="^(?!,)(?:(?:^|,)([A-Za-z0-9]+)(?!.*\b\1\b))+$"
            error={faDataErrors.states}
          />

          <TextField
            id="alphabet"
            label="Alphabet (Σ)"
            title="Unique comma separated alphabet characters (e.g. 0,1,c)"
            value={faFormData.alphabet}
            onChange={onTextFieldChange}
            required
            maxLength={9}
            pattern="^(?!,)(?:(?:^|,)([^ ])(?!.*\1))+$"
            error={faDataErrors.alphabet}
          />

          <TextField
            id="initialState"
            label="Initial State"
            title="State string (e.g. A)"
            value={faFormData.initialState}
            onChange={onTextFieldChange}
            required
            pattern="^[A-Za-z0-9]+$"
            error={faDataErrors.initialState}
          />

          <TextField
            id="finalStates"
            label="Final States"
            title="Unique comma separated state strings (e.g. q1,q2,q3)"
            value={faFormData.finalStates}
            onChange={onTextFieldChange}
            required
            pattern="^(?!,)(?:(?:^|,)([A-Za-z0-9]+)(?!.*\b\1\b))+$"
            error={faDataErrors.finalStates}
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
