// slice 结合了 action 和 reducer

import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
interface ProductDetailState {
  loading: boolean;
  error: string | null;
  data: any
}

const initialState: ProductDetailState = {
  loading: true,
  error: null,
  data: null
}

// 用 createAsyncThunk 创建 thunkAction 处理异步请求
export const getProductDetail = createAsyncThunk(
  "productDetail/getProductDetail",
  async (touristRouteId: string, thunkAPI) => {
    const { data } = await axios.get(
      `http://123.56.149.216:8089/api/touristRoutes/${touristRouteId}`
    )
    return data // return 的 data 是一个 promise
  })
/**
 * 格式
 * const counterSlice = createSlice({
  name: 'counter',
  initialState,
//   reducers: 
1. 把 action 和 reducer 合并起来；
2. reducer 是一个对象 不是过程，每个对象对应一个 action 同时对应其处理函数
3. 不用写 switch 语句
  reducers: {
    increment(state) {
      state.value++
    },
    decrement(state) {
      state.value--
    },
    incrementByAmount(state, action: PayloadAction<number>) {
      state.value += action.payload
    },
  },
})
 */

//如果用 createAsyncThunk 来处理 reducer的话，要用  extraReducers
export const productDetailSlice = createSlice({
    name: 'productDetail',
    initialState,
    reducers: {
    },
    extraReducers: {
       // 情况1. 请求开始
       [getProductDetail.pending.type]: (state) => {
        // return {...state, loading: true}
        state.loading = true;
      },
      // 情况2 请求成功
      [getProductDetail.fulfilled.type]: (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null
      },
      // 情况3 请求失败
      [getProductDetail.rejected.type]: (state, action: PayloadAction<string | null>) => {
        state.loading = false;
        state.error = action.payload;
      }
    }
  })