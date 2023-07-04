import { createAsyncThunk } from "@reduxjs/toolkit";
import http from "../../config/http.config";

const addUser = (state, data: any) => {
  state.users = [...state.users, data.payload];
}

const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (thunkAPI) => {
    const res = http.get('https://dummyjson.com/users').then(res => res.data);
    return res;
  });

const fetchUserById = createAsyncThunk(
  'users/fetchUserById',
  async (param: { id: number }, thunkAPI) => {
    const res = await fetch(`https://dummyjson.com/users/${param.id}`).then(
      (data) => data.json()
    )
    return res
  });

export const userReducers = {
  addUser
};

export {
  fetchUsers,
  fetchUserById
};