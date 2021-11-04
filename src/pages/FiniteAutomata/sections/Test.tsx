import React, { useState } from 'react';
import { HiCheckCircle, HiXCircle } from 'react-icons/hi';
import { useAppSelector } from '../../../lib/store';

export default function TestSection() {
  const validEnfaData = useAppSelector((state) => state.enfaData);

  const [testText, setTestText] = useState('');

  return (
    <>
      {!!validEnfaData && validEnfaData.transitions && (
        <div className="flex justify-center px-4 pb-4 sm:px-0">
          <div className="flex flex-col pt-[0.7rem] pr-4">
            {testText.split('\n').map((line, i) => {
              let isValid = false;
              try {
                isValid = noam.fsm.isStringInLanguage(validEnfaData as Fsm, line.split(''));
              } catch {}

              return (
                <div key={i} className="pb-1 text-xl sm:pb-0">
                  {isValid ? (
                    <HiCheckCircle className="text-green-500" />
                  ) : (
                    <HiXCircle className="text-red-500" />
                  )}
                </div>
              );
            })}
          </div>

          <textarea
            id="testText"
            name="testText"
            rows={Math.max(testText.split('\n').length, 6)}
            autoFocus
            wrap="off"
            autoCorrect="off"
            autoComplete="off"
            autoCapitalize="off"
            spellCheck="false"
            defaultValue={testText}
            onChange={(e) => setTestText(e.target.value)}
            className="block w-full border border-gray-300 rounded-md shadow-sm resize-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      )}
    </>
  );
}
