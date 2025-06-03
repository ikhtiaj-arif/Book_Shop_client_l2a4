import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

export type TUser = {
  email: string;
  role: string;
  id: string;
  name: string;
  iat: number;
  exp: number;
    createdAt?: string
  updatedAt?: string
  isBlocked?: boolean
};

export type TAuthState = {
  user: null | TUser;
  token: null | object;
  createdAt?: string
  updatedAt?: string
};

const initialState: TAuthState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
      localStorage.clear();
    },
  },
});

export const { setUser, logOut } = authSlice.actions;

export default authSlice.reducer;

export const useCurrentToken = (state: RootState) => state.auth.token;
export const currentUser = (state: RootState) => state.auth.user;
