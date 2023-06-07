import { createSlice } from '@reduxjs/toolkit'

export interface IUser {
  id: number;
  fname: string;
  lname: string;
}
export interface IUserState {
  users: Array<IUser>[];
}

const initialState: IUserState = {
  users: <any>[{
    id: 1,
    fname: 'John',
    lname: 'Doe'
  }, {
    id: 2,
    fname: 'Dick',
    lname: 'Smith'
  }],
}

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, data: any) => {
      state.users = [...state.users, data.payload];
    }
  },
})

// Action creators are generated for each case reducer function
export const { addUser } = userSlice.actions;