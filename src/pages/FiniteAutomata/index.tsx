import React from 'react';
import { faSectionsRoutes, useAppSelector } from '../../lib/store';
import FaSections from './sections';
import NfaForm from './sections/NfaForm';

export default function FiniteAutomataPage() {
  const currentRoute = useAppSelector((state) => state.routes.route);

  return (
    <div className="flex-1 w-full">
      {faSectionsRoutes.some(([_, route]) => route === currentRoute) ? <FaSections /> : <NfaForm />}
    </div>
  );
}
