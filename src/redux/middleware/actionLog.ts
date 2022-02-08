// 打印每次操作的 action state 信息
import { Middleware } from "redux"

export const actionLog: Middleware = ( store ) => ( next ) => ( action ) => { 
    console.log("state 当前的状况", store.getState());
    console.log("fire action", action);
    next(action)
    console.log("state 更新", store.getState());    
}