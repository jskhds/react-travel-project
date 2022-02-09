import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import Password from "antd/lib/input/Password";
import axios from "axios";
interface UserState {
  loading: boolean;
  error: string | null;
  token: string | null; // 后端传的是 JWT Token
}

const initialState: UserState = {
  loading:false,
  error: null,
  token: null,
};

export const signIn = createAsyncThunk(
  "user/signIn",
  async (
    paramaters: {
      email: string;
      password: string;
    },
    thunkAPI
  ) => {
    const { data } = await axios.post(`http://123.56.149.216:8089/auth/login`, {
      email: paramaters.email,
      password: paramaters.password,
    });
    return data.token;
  }
);

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {
    [signIn.pending.type]: (state) => {
      state.loading = true;
    },
    [signIn.fulfilled.type]: (state, action) => {
      state.token = action.payload;
      state.loading = false;
      state.error = null;
    },
    [signIn.rejected.type]: (state, action: PayloadAction<string | null>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
