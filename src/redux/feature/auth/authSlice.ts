import { createSlice } from "@reduxjs/toolkit";

export enum UserRole {
  JOB_SEEKER,
  EMPLOYER,
}

export interface IUser {
  id: string;
  email: string;
  fullName: string;
  phone?: string;
  role: UserRole;
  isVerified: boolean;
  isActive: boolean;
  profileId?: string;
  companyId?: string;
  lastLogin?: Date;
}

// interface IAuthState {
//   user: IUser | null;
//   accessToken: string | null;
//   refreshToken: string | null;
//   isLoading: boolean;
//   isVerified: boolean;
// }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const initialState: any = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isLoading: false,
  isVerified: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, accessToken, refreshToken } = action.payload;
      state.user = user;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.isVerified = user?.isVerified || false;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      if (action.payload.isVerified !== undefined) {
        state.isVerified = action.payload.isVerified;
      }
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isVerified = false;
    },
  },
});

export const { setCredentials, setLoading, updateUser, logout } =
  authSlice.actions;
export default authSlice.reducer;
