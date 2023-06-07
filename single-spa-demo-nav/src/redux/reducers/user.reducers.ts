import { createAsyncThunk } from "@reduxjs/toolkit";

const addUser = (state, data: any) => {
  state.users = [...state.users, data.payload];
}

const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (thunkAPI) => {
    const res = await fetch('https://dummyjson.com/users').then(
    (data) => data.json()
  )
  return res
})

export const userReducers = {
  addUser
};

export {
  fetchUsers
};