import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UsersState, User } from './types';

const initialState: UsersState = {
  user: null,
  error: 'Failed to fetch users',
  isLoading: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    fetchUserDataRequest: (state) => {
      state.isLoading = true;
    },
    // actionName: ()=>{}
    loginSuccess: (state, action: PayloadAction<User | undefined>) => {
      state.error = '';
      state.user = action.payload;
      state.isLoading = false;
    },
    loginError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    clearUser: (state) => {
      state.user = null;
      state.error = '';
      state.isLoading = false;
    },
  },
});

export const { fetchUserDataRequest, loginSuccess, loginError, clearUser } = userSlice.actions;
export default userSlice.reducer;
