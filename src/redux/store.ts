import { createStore, applyMiddleware} from "redux";
import languageReducer from "./language/languageReducer";
import recommendProductsReducer from "./recommendProducts/recommendProductsReducer"
import thunk from "redux-thunk"
import { actionLog } from "./middleware/actionLog"
import {  productDetailSlice } from "./productDetail/slice"
import { combineReducers, configureStore} from "@reduxjs/toolkit"
import { productSearchSlice } from "./productSearch/slice"
import { UserSlice } from "./user/slice"
import { persistStore, persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage";
import { shoppingCartSlice } from "./shoppingCart/slice"
import { orderSlice } from "../redux/order/slice"
// 配置 redux 持久信息，一般起名叫 persistConfig
const persistConfig = {
    key: " root ",
    storage,
    whiteList: [
        "user"
    ]
}



// 用 combineReducers 把我们定义的 reducer 给捆绑起来创建 store
// 因为 RTK 中的 combineReducers 可以实现混编，即普通的 reducer 和  createSlice 创建的 reducer(reducer + action 混合体)一块
const rootReducer = combineReducers({
    language: languageReducer,
    recommendProducts: recommendProductsReducer,
    productDetail: productDetailSlice.reducer,
    productSearch: productSearchSlice.reducer,
    user: UserSlice.reducer,
    shoppingCart: shoppingCartSlice.reducer,
    order: orderSlice.reducer
})


// 基于 localStorage 的 reducer
const persistedReducer = persistReducer(persistConfig, rootReducer)

// middleware 引入 thunk 和自定义的中间件 actionLog(打印state 和 action)
// const store = createStore(rootReducer, applyMiddleware(thunk,actionLog));
const store = configureStore({
    // reducer: rootReducer,
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware)=>[...getDefaultMiddleware(), actionLog],  // rtk 默认中间件加自定义的中间件
    devTools: true
})


// 基于 localStorage 的 store、
const persistor = persistStore(store ) 
export type RootState = ReturnType<typeof store.getState>

export default {store, persistor};