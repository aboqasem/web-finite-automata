import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum Route {
  Home = '/home',

  'Finite Automata' = '/fa',
  Nfa = '/fa/nfa',
  Dfa = '/fa/dfa',
  'Min Dfa' = '/fa/min-dfa',
  Test = '/fa/test',
  Rg = '/fa/rg',

  Help = '/help',
}

export const topLevelRoutes = Object.entries(Route).filter(
  ([_, route]) => route.lastIndexOf('/') === 0,
) as [keyof typeof Route, Route][];

const faSectionRouteRegex = new RegExp(Route['Finite Automata'] + '/.+');

export const faSectionsRoutes = Object.entries(Route).filter(([_, route]) =>
  faSectionRouteRegex.test(route),
) as [keyof typeof Route, Route][];

interface RoutesState {
  route: Route;
}

const initialState: RoutesState = {
  route: Route.Home,
};

export const routesSlice = createSlice({
  name: 'routes',
  initialState,
  reducers: {
    setRoute: (_, action: PayloadAction<RoutesState['route']>) => {
      return { route: action.payload };
    },
  },
});

export const routesActions = routesSlice.actions;

export const routesReducer = routesSlice.reducer;
