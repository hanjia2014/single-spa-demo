import { createSlice } from '@reduxjs/toolkit'
import { fetchAsyncUsers, fetchUserById, fetchUsers, userReducers } from '../reducers/user.reducers';

export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
}
export interface IUserState {
  users: Array<IUser>[];
  selectedUser: IUser;
  httpState: {
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: any | null;
  }
}

const initialState: IUserState = {
  users: <any>[{
    id: 1,
    firstName: 'John',
    lastName: 'Doe'
  }, {
    id: 2,
    firstName: 'Dick',
    lastName: 'Smith'
  }],
  selectedUser: null,
  httpState: {
    status: 'idle',
    error: null
  }
}

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    ...userReducers
  },
  extraReducers: {
    [fetchUsers.pending as any]: (state) => {
      state.httpState.status = 'loading';
    },
    [fetchUsers.fulfilled as any]: (state, { payload }) => {
      state.httpState.status = 'succeeded';
      state.users = payload.users;
    },
    [fetchUsers.rejected as any]: (state) => {
      state.httpState.status = 'failed';
      state.users = [];
    },

    [fetchUserById.pending as any]: (state) => {
      state.httpState.status = 'loading';
    },
    [fetchUserById.fulfilled as any]: (state, { payload }) => {
      state.httpState.status = 'succeeded';
      state.selectedUser = { ...payload };
    },
    [fetchUserById.rejected as any]: (state) => {
      state.httpState.status = 'failed';
      state.selectedUser = null;
    }
  }
})

// Action creators are generated for each case reducer function
export const { addUser } = userSlice.actions;