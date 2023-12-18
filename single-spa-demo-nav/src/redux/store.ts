import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { userSlice } from './slice/user.slice'
import { pokemonApi } from '../services/pokemon';
import type { PreloadedState } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  userState: userSlice.reducer,
  [pokemonApi.reducerPath]: pokemonApi.reducer,
})

const store = configureStore({
  // reducer: {
  //   userState: userSlice.reducer,
  //   [pokemonApi.reducerPath]: pokemonApi.reducer,
  // },
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
      // adding the api middleware enables caching, invalidation, polling and other features of `rtk-query`
      getDefaultMiddleware().concat(pokemonApi.middleware)
});

type RootState = ReturnType<typeof store.getState>;

export {
  store,
  RootState
}