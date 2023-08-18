import { createAsyncThunk } from "@reduxjs/toolkit";
import http from "../../config/http.config";
import { createApiAsyncThunk } from "../redux-utils";

const addUser = (state, data: any) => {
  state.users = [...state.users, data.payload];
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
  onSuccess: (callback, res) => {
    return callback(res.data);
  }
})

const fetchUserById = createAsyncThunk(
  'users/fetchUserById',
  async (payload: { id: number }, thunkAPI) => {
    const res = await fetch(`https://dummyjson.com/users/${payload.id}`).then(
      (data) => data.json()
    )
    return res
  });

export const userReducers = {
  addUser
};

export {
  fetchUsers,
  fetchUserById,
  fetchAsyncUsers
};