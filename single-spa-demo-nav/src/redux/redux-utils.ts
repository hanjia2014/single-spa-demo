import { AsyncThunk, createAsyncThunk } from '@reduxjs/toolkit';
import http, { handlePromiseCall } from "../config/http.config";

export const createApiAsyncThunk = <T>(params: { 
  slice: string;
  url: string;
  method?: 'get' | 'post' | 'put';
  onError?: (rejectWithValue, error) => void;
  onSuccess?: (fulfilledWithValue, response) => void;
  onQueries?: (payload: any, state?: any) => any[];
  onPayloadData?: (payload: T) => any;
 }) => {
  return createAsyncThunk(params.slice, 
    async (_payload: T = null, thunkAPI) => {
      const state = thunkAPI.getState();
      const {response, error} = await handlePromiseCall(params.method == null || params.method === 'get' ? 
                                  http.get(params.url) 
                                  : http[params.method](params.url, params.onPayloadData ? params.onPayloadData(_payload) : _payload));
      if (error) {
        return params.onError ? params.onError(thunkAPI.rejectWithValue, error) : thunkAPI.rejectWithValue(error);
      }
      return params.onSuccess ? params.onSuccess(thunkAPI.fulfillWithValue, response) : thunkAPI.fulfillWithValue(response);
    }
  );
}

export const generateExtraReducer = (asyncObj, fulfilledProp): any => {
  const pendingFunc = (state, action) => {
    state.httpState.status = "loading";
  }
  const rejectedFunc = (state, action) => {
    state.httpState.status = "failed";
  }
  const fulfilledFunc = (state, action) => {
    state.httpState.status = "succeeded";
    if (fulfilledProp) {
      if (typeof asyncObj.fulfilledProp === 'string') {
        state[fulfilledProp] = action.payload;
      } else {
        fulfilledProp(state, action.payload);
      }
    }
  }

  return {
    [asyncObj.pending as any]: pendingFunc,
    [asyncObj.rejected as any]: rejectedFunc,
    [asyncObj.fulfilled as any]: fulfilledFunc
  }
}