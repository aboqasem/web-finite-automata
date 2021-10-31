import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { faDataReducer } from './fa-data/fa-data.slice';
import { routesReducer } from './routes/routes.slice';

export const store = configureStore({
  reducer: {
    faData: faDataReducer,
    routes: routesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
