
// 定义 state 的类型
import { useSelector as useReduxSelector, TypedUseSelectorHook } from "react-redux";

import { RootState } from "./store"
//  重写 useSelector 为了符合我们项目的类型定义 RootState
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector 