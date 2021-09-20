import React from 'react';

const people = [
  {
    name: 'Mohammed Hagwan',
    id: '1181302549',
    role: 'Leader',
    imageUrl: 'https://github.com/Hagwan.png',
    contribution: '25%',
  },
  {
    name: 'Mohammad Al Zouabi',
    id: '1171302986',
    role: 'Member',
    imageUrl: 'https://github.com/aboqasem.png',
    contribution: '25%',
  },
  {
    name: 'Mohammad Hussein',
    id: '1191302262',
    role: 'Member',
    imageUrl: 'https://github.com/DIJAVU.png',
    contribution: '25%',
  },
  {
    name: 'Ammar Habib',
    id: '1171302563',
    role: 'Member',
    imageUrl: 'https://github.com/xiAvalon.png',
    contribution: '25%',
  },
];

export default function HomePage() {
  return (
    <div className="mx-auto my-6 bg-white max-w-7xl sm:mx-6 lg:mx-8 lg:flex">
      <div className="px-4 py-12 mx-auto text-center xl:mx-16 max-w-7xl sm:px-6 lg:px-8 lg:py-24">
        <div className="space-y-12">
          <div className="space-y-5 sm:mx-auto sm:max-w-xl sm:space-y-4 lg:max-w-5xl">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Web Finite Automata
            </h2>
            <p className="text-xl text-gray-500">
              A group-based assignment done for the{' '}
              <span className="font-bold">Theory of Computation (TIC2151)</span> course taught by{' '}
              <a
                className="font-bold text-indigo-500 hover:text-indigo-400"
                href="https://mmuexpert.mmu.edu.my/nbhan"
                rel="noreferrer"
                target="_blank"
              >
                Dr. Nbhan D. Salih
              </a>{' '}
              at{' '}
              <a
                className="font-bold text-indigo-500 hover:text-indigo-400"
                href="https://www.mmu.edu.my/"
                rel="noreferrer"
                target="_blank"
              >
                Multimedia University
              </a>
            </p>
          </div>
          <ul
            role="list"
            className="mx-auto space-y-16 sm:grid sm:grid-cols-2 sm:gap-16 sm:space-y-0 lg:grid-cols-4 lg:max-w-5xl"
          >
            {people.map((person) => (
              <li key={person.name}>
                <div className="space-y-6">
                  <img
                    className="w-40 h-40 mx-auto rounded-full xl:w-52 xl:h-52"
                    src={person.imageUrl}
                    alt={`${person.name}'s personal picture`}
                  />
                  <div className="space-y-2">
                    <div className="space-y-1 text-lg font-medium leading-6">
                      <h3>
                        {person.name} <span className="font-light text-md">{person.id}</span>
                      </h3>
                      <p className="text-indigo-600">{person.role}</p>
                    </div>
                    <p className="text-gray-500">{person.contribution} contribution</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
