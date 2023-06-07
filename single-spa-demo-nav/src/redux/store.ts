import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from './slice/user.slice'

const store = configureStore({
  reducer: {
    userState: userSlice.reducer
  },
});

type RootState = ReturnType<typeof store.getState>;

export {
  store,
  RootState
}