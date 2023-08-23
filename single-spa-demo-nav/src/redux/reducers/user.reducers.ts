import { PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import http from "../../config/http.config";
import { createApiAsyncThunk } from "../redux-utils";

const addUser = (state, data: any) => {
  state.users = [...state.users, data.payload];
};

const updateUserSelect = (
  state,
  action: PayloadAction<{ id: string | number }>
) => {
  const users = state.users.reduce((acc, user: any) => {
    user.selected = user.id === action.payload.id;
    acc.push(user);
    return acc;
  }, []);
  state.users = users as any;
}

const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (payload = null, thunkAPI) => {
    const res = http.get('https://dummyjson.com/users').then(res => res.data);
    return res;
  });

const fetchAsyncUsers = createApiAsyncThunk({
  slice: 'fetchAsyncUsers',
  url: 'https://dummyjson.com/users',
  onSuccess: (callback, res) => callback(res.data)
});

const fetchUserById = createAsyncThunk(
  'users/fetchUserById',
  async (payload: { id: number }, thunkAPI) => {
    const res = await fetch(`https://dummyjson.com/users/${payload.id}`).then(
      (data) => data.json()
    )
    return res
  }
);

const fetchAsyncUserById = createApiAsyncThunk({
  slice: 'fetchAsyncUserById',
  url: 'https://dummyjson.com/users',
  onArgs: args => [args.payload.userId],
  onSuccess: (callback, res) => callback(res)
});

export const userReducers = {
  addUser
  , updateUserSelect
};

export {
  fetchUsers
  , fetchUserById
  , fetchAsyncUsers
  , fetchAsyncUserById
};