import { createSlice } from '@reduxjs/toolkit'
import { userReducers } from '../reducers/user.reducers';

export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
}
export interface IUserState {
  users: Array<IUser>[];
  state: {
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
  state: {
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
})

// Action creators are generated for each case reducer function
export const { addUser } = userSlice.actions;