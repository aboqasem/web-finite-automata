import { Listbox, Transition } from '@headlessui/react';
import React, { Fragment } from 'react';
import { HiCheck, HiSelector } from 'react-icons/hi';

export interface DropdownListProps<T> {
  label: string;
  value: T;
  selections: readonly [name: string, value: T][];
  onSelectionChange: (value: T) => void;
  srOnlyLabel?: boolean;
}

export default function DropdownList<T>({
  label,
  selections,
  value,
  onSelectionChange,
  srOnlyLabel,
}: DropdownListProps<T>) {
  return (
    <Listbox value={value} onChange={onSelectionChange}>
      {({ open }) => (
        <>
          <Listbox.Label
            className={`block text-sm font-medium text-gray-700 ${srOnlyLabel && 'sr-only'}`}
          >
            {label}
          </Listbox.Label>

          <div className="relative mt-1">
            <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white border border-gray-300 rounded-md shadow-sm cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              <span className="block truncate">
                {selections.find(([_, v]) => v === value)?.[0]}
              </span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <HiSelector className="w-5 h-5 text-gray-400" aria-hidden="true" />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {selections.map(([name, value]) => (
                  <Listbox.Option
                    key={name as unknown as string}
                    className={({ active }) =>
                      `${
                        active ? 'text-white bg-indigo-600' : 'text-gray-900'
                      } cursor-default select-none relative py-2 pl-3 pr-9`
                    }
                    value={value}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`${selected ? 'font-semibold' : 'font-normal'} block truncate`}
                        >
                          {name}
                        </span>

                        {selected ? (
                          <span
                            className={`${
                              active ? 'text-white' : 'text-indigo-600'
                            } absolute inset-y-0 right-0 flex items-center pr-4`}
                          >
                            <HiCheck className="w-5 h-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
}
