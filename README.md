#### 1.项目运行

```
git clone git@github.com:jskhds/react-travel-project.git
cd react-travel-project
npm install
npm start
npm build // 发布环境
```



#### 2.地址

demo地址：ret123.cn



#### 3.相关配置

##### 1.路由配置

```
npm install react-router-dom
// 安装 typescript 类型定义
npm install @types/react-router-dom --save-dev
```

路由配置 5 和 6 有很多区别

https://blog.csdn.net/u010821983/article/details/121283039

```jsx
// 普通路由
import { BrowserRouter, Route ,Routes} from "react-router-dom";
import { HomePage } from "./pages";
// <BrowserRouter>  为了路由导航与原生浏览器操作行为一致
function App() {
  return (
    <div>
      <BrowserRouter> 
      <Routes>  
        <Route path= "/" element={ <HomePage/>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}
```



```jsx
// 路由守卫
const PrivateRoute = (props: { children: React.ReactNode }): JSX.Element => {
  const { children } = props
  const isAccess = /* 提供判断是否符合条件的Boolean类型值 */
  const location = useLocation()
  return isAccess ? (
    <>{children}</>
  ) : (
    <Navigate
      replace={true}
      to="/signIn"
      state={{ from: `${location.pathname}${location.search}` }}
    />
  )
}
 <Route path="/shoppingCart" element={<PrivateRoute> <ShoppingCart /> </PrivateRoute>}/>

```

##### 2.文件配置

.vscode  → settings.json

```
{
	"typescript.tsdk": "node_modules/typescript/lib",
	"typescript.enablePromptUseWorkspaceTsdk": true
}
```

custom.d.ts 方便模块化加载 css

```
declare module "*.css" {
    const css: { [key: string]: string };
    export default css;
  }
  
```

tsconfig.json 

```
"noImplicitAny": false,  // 在 compilerOptions 中添加，让 ts 允许 any 类型
```

##### 3.ant UI 安装 

ANT DESIGN 官网 https://ant.design/index-cn

antd 和 ant-design/icons

```
npm install antd @ant-design/icons
// 导入
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
```

##### 4.文件结构组件化

比如说 文件结构为

![](./img/组件化.png)

那么 footer 和 header 文件夹中 index.tsx 分别导出

```
export * from './Footer'
```

```
export * from './Header'
```

components 文件夹中 index.tsx 导出文件夹

```
export * from './footer'
export * from './header'
```

那么我们在引用 Header 和 Footer 组件时

```
import { Header, Footer } from './components'
```



#### 4.react-redux

##### 1.安装

```
npm install @types/react-redux --save-dev
// 如果之后报错 Can‘t resolve ‘redux‘ in "paths" 的话
npm install --save redux react-redux
```

在 index.tsx 中引入  Provider 和 store

```
import { Provider } from "react-redux"
import  store  from "./redux/store"
```

##### 2.使用

- 普通版 将 actions 和 reducer 分成两个文件

在 src → redux 下有 language 文件夹和 hooks.ts 以及 store.ts

1. store.ts 创建 store 并且定义  type RootState，是 store.getState() 的返回值，即动态对应 state.xxx 的类型

2. hooks.ts 重写 react-redux 中的 useSelector 函数。 因为我们在组件中引用 state 时需要知道 state的类型，如果我们直接定义 state 的类型为 RootState 会造成二者耦合，不利于复用。所以我们把 RootState 通过 TypedUseSelectorHook 赋给 useSelector，让 useSelector 里面包含 state 定义

3. language 文件夹包含修改语言的 action 和 reducer

   对于languageActions.ts ：

   1.里面先把我们要传入的 action 名称定义为常量，这样我们在使用的时候不会因为打错了等造成代码出错； 

   2.定义了 action 的接口，比如更改语言的 action

   ```
   interface ChangeLanguageAction {
       type: typeof CHANGE_LANGUAGE,
       payload: "zh" | "en"
   }
   ```

   有的时候，我们可能会写错type payload 或者漏写，所以这样定义以后这样我们外部引用的时候不易出错并且可以联想提示；

   3.用 ActionCreator （工厂模式）把 action 提取出来，我们在使用的时候（dispatch时）直接调用函数，规范 action

   ```
   export const changeLanguageActionCreator = (languageCode: "zh" | "en"): ChangeLanguageAction => {
       return {
           type: CHANGE_LANGUAGE,
           payload: languageCode
       }
   }
   dispatch(addLanguageActionCreator("新语言","new_lang"))
   ```

   对于 languageReducer ，比较简单。定义 LanguageState 类型，初始化一个 state，传入 reducer 中，不同的 action.type 不同的逻辑来更新和 subscribe。其中更改语言，i18n 提供了接口，直接使用即可（会有副作用，不符合纯函数）
   
   - 合并版

react-redux 的一些 hooks

```
// 获得数据  
import { useSelector } from 'react-redux';
// dispatch 
import { useDispatch  } from 'react-redux';
```

#### 6.国际化 i18n

i18n 

```
npm install react-i18next i18next --save
```

i18n 配置

```
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translation_en from "./en.json";
import translation_zh from "./zh.json";

const resources = {
  en: {
    translation: translation_en,
  },
  zh: {
    translation: translation_zh,
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "zh",
    // keySeparator: false, // we do not use keys in form messages.welcome
    // header.slogan
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;

```

在主页引入即可

```
import './i18n/configs'
```



#### redux 中间件

redux-thunk 处理 api 请求数据

```
npm install redux-thunk
```

```
import { applyMiddleware } from "redux";
import thunk from "redux-thunk"
```

#### redux-toolkit 

处理封装冗余的模板代码

#### react 处理 html 字符串

`dangerouslySetInnerHTML={{__html: 'html字符串'}}`

#### RTK

简化 react-redux，不需要分别创建 action 和 reducer ,而且可以直接修改 state

示例：redux下面 slice.ts 都是

安装

```
npm install @reduxjs/toolkit
```

 简略说明 以src/redux/ productDetail/slice.ts 为例（初始版本，代码里面的又重新完善了）

```ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// slice 结合了 action 和 reducer
// 初始值对应的类型接口
interface ProductDetailState {
  loading: boolean;
  error: string | null;
  data: any;
}

const initialState: ProductDetailState = {
  loading: true,
  error: null,
  data: null,
};

export const productDetailSlice = createSlice({
  /**
 * 格式
 * 
  const counterSlice = createSlice({
  name: 'counter', //命名空间
  initialState,  // 初始值，必须要传
  reducers: 
  1. 把 action 和 reducer 合并起来；
  2. reducer 是一个对象 不是过程，每个对象对应一个 action 同时对应其处理函数
  3. 不用写 switch 语句
 */
  name: "productDetail",
  initialState,
  reducers: {
    fetchStart: (state) => {
      // return { ...state, loading: true };
      state.loading = true;
    },
    fetchSuccess: (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchFail: (state, action: PayloadAction<string | null>) => {
    //   const ddd = action.payload;
      state.loading = false;
      state.error = action.payload;
    },
  },
});
```

然后再在 src/redux/store.ts 中引入 slice

```ts
import { combineReducers, configureStore} from "@reduxjs/toolkit"
import {  productDetailSlice } from "./productDetail/slice"
const rootReducer = combineReducers({ //支持混编
    productDetail: productDetailSlice.reducer, 
})
const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware)=>[...getDefaultMiddleware(), actionLog],  // rtk 默认中间件加自定义的中间件
    devTools: true
})
export type RootState = ReturnType<typeof store.getState> // RootState 表示store中各个reducer 的 initialState 的类型
```

tsx

```tsx
import { productDetailSlice } from "../../redux/productDetail/slice";
import { useSelector } from "../../redux/hooks";
import { useDispatch } from "react-redux";
export const DetailPage: React.FC<RouteComponentProps<MatchParams>> = () => {
  const { touristRouteId } = useParams<MatchParams>();
  const loading = useSelector((state) => state.productDetail.loading);
  const error = useSelector((state) => state.productDetail.error);
  const product = useSelector((state) => state.productDetail.data);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      dispatch(productDetailSlice.actions.fetchStart());
      try {
        const { data } = await axios.get(
          `http://123.56.149.216:8080/api/touristRoutes/${touristRouteId}`
        );
        dispatch(productDetailSlice.actions.fetchSuccess(data));
      } catch (error) {
        dispatch(productDetailSlice.actions.fetchFail(error.message));
      }
    };
    fetchData();
  }, []);
  if (loading) {
    /*do something*/
  }
  if (error) {
    /*do something*/
  }
  return (
    <>
      
    </>
  );
};

```

createAsyncThunk 

把异步逻辑交个它处理，前提条件是 store 需要由 configureStore 创建

将 slice 改为

```tsx
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface ProductDetailState {
  loading: boolean;
  error: string | null;
  data: any;
}

const initialState: ProductDetailState = {
  loading: true,
  error: null,
  data: null,
};
// 从接口请求数据的异步处理交给  createAsyncThunk 返回的是一个带三个状态的 promise
export const getProductDetail = createAsyncThunk(
  "productDetail/getProductDetail",
  async (touristRouteId: string, thunkAPI) => {
    const { data } = await axios.get(
      `http://123.56.149.216:8080/api/touristRoutes/${touristRouteId}`
    );
    return data;
  }
);

export const productDetailSlice = createSlice({
  name: "productDetail",
  initialState,
  reducers: {
    
  },
    //注意 asyncThunk的reducer 是 extraReducers
  extraReducers: {
      // 使用的时候 [] 配合 action 对象
    [getProductDetail.pending.type]: (state) => {
      // return { ...state, loading: true };
      state.loading = true;
    },
    [getProductDetail.fulfilled.type]: (state, action) => {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    },
    [getProductDetail.rejected.type]: (state, action: PayloadAction<string | null>) => {
      //   const ddd = action.payload;
      state.loading = false;
      state.error = action.payload;
    },
  }
});


```

此时 tsx 文件改为

```tsx
//...
useEffect(() => {
    dispatch(getProductDetail(touristRouteId))  // fetchData 的代码
 }, []);
 //...
```



#### 单点登录 JWT

jwt 解码插件

```
npm install jwt-decode
```



#### redux-persist 登录持久化

```
npm installredux-persist
```

网站的数据保存有三种方式：Cookie、Session、以及 Web Storage，采用 web storage

优势: 降低网络流量，一旦数据保存在本地以后就可以避免向服务器再次发送请求；快速显示数据；可以被用作临时储存

类型： SessionStorage ：仅在当前浏览器窗口关闭之前有效；localStorage：始终有效，窗口或者浏览器关闭也一直保存



