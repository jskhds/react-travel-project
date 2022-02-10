import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { checkout } from "../shoppingCart/slice"
interface OrderState {
  loading: boolean;
  error: string | null;
  currentOrder: any
}

const initialState: OrderState = {
  loading: false,
  error: null,
  currentOrder: null
}

export const placeOrder = createAsyncThunk(
    "order/placeOrder",
    async (parameters: {
        jwt: string,
        orderId: string

    }, thunkAPI) => {
        const { data } = await axios.post(
            `http://123.56.149.216:8089/api/orders/${parameters.orderId}/placeOrder`,
            null,
            {
                headers: {
                    Authorization: `bearer ${parameters.jwt}`,
                }
            }
        )
        return data
    })
 
export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
    },
    extraReducers: {
       // 情况1. 请求开始
       [placeOrder .pending.type]: (state) => {
        // return {...state, loading: true}
        state.loading = true;
      },
      // 情况2 请求成功
      [placeOrder .fulfilled.type]: (state, action) => {
        state.currentOrder = action.payload;
        state.loading = false;
        state.error = null
      },
      // 情况3 请求失败
      [placeOrder .rejected.type]: (state, action: PayloadAction<string | null>) => {
        state.loading = false;
        state.error = action.payload;
      },

    //   把 checkout 的数据保存在 currentData 中
       // 情况1. 请求开始
       [checkout .pending.type]: (state) => {
        // return {...state, loading: true}
        state.loading = true;
      },
      // 情况2 请求成功
      [checkout .fulfilled.type]: (state, action) => {
        state.currentOrder = action.payload;
        state.loading = false;
        state.error = null
      },
      // 情况3 请求失败
      [checkout .rejected.type]: (state, action: PayloadAction<string | null>) => {
        state.loading = false;
        state.error = action.payload;
      }

    }
  })