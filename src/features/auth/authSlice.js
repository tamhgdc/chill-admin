import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userAPI from 'api/userAPI';
import { StorageKeys } from 'constants';

export const login = createAsyncThunk('auth/login', async (payload) => {
  const { data } = await userAPI.login(payload);

  if (data.user.role < 2) {
    throw new Error('403');
  }

  if(!data.user.isActive) {
    throw new Error('400');
  }

  // save data to local storage
  localStorage.setItem(StorageKeys.ACCESS_TOKEN, data.token);
  localStorage.setItem(StorageKeys.USER, JSON.stringify(data.user));

  return data.user;
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    current: JSON.parse(localStorage.getItem(StorageKeys.USER)) || {},
    settings: {},
  },
  reducers: {
    logout(state) {
      // clear local storage
      localStorage.removeItem(StorageKeys.USER);
      localStorage.removeItem(StorageKeys.ACCESS_TOKEN);

      state.current = {};
    },
    changeValue(state, action) {
      const { name, value } = action.payload;
      if (name === 'current') {
        localStorage.setItem(StorageKeys.USER, JSON.stringify(value));
      }

      state[name] = value;
    },
  },
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      state.current = action.payload;
    },
  },
});

const { actions, reducer } = authSlice;
export const { logout, changeValue } = actions;
export default reducer;
