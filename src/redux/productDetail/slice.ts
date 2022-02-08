// slice 结合了 action 和 reducer

import { createSlice ,PayloadAction} from "@reduxjs/toolkit"

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
export const productDetailSlice = createSlice({
    name: 'productDetail',
    initialState,
    reducers: {
        // 情况1. 请求开始
        fetchStart: (state)=>{
            // return {...state, loading: true}
            state.loading = true;
        },
        // 情况2 请求成功
        fetchSuccess: (state,action ) =>{
            
            state.data = action.payload;
            state.loading = false;
            state.error = null
        },
        // 情况3 请求失败
        fetchFail: (state, action: PayloadAction<string | null>)=>{
            state.loading = false;
            state.error = action.payload;
        }


    }
})