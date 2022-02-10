import React, { useEffect } from "react";
import styles from "./App.module.css";
import { BrowserRouter, Navigate, Route, Routes, useNavigate , useLocation} from "react-router-dom";
import {
  HomePage,
  SignInPage,
  RegisterPage,
  DetailPage,
  SearchPage,
  PlaceOrderPage
} from "./pages";
import { useSelector } from "./redux/hooks";
import { ShoppingCart } from "./pages/shoppingCart";
import { useDispatch } from "react-redux"
import { getShoppingCart, clearShoppingCartItem, addShoppingCartItem } from "./redux/shoppingCart/slice"


const PrivateRoute = (props: { children: React.ReactNode }): JSX.Element => {
  const { children } = props
  const jwt = useSelector((s) => s.user.token);
  // Up to you specific app to decide how to get this value
  const isAuthenticated: boolean = jwt !== null;
  const location = useLocation()

  return isAuthenticated ? (
    <>{children}</>
  ) : (
    <Navigate
      replace={true}
      to="/signIn"
      state={{ from: `${location.pathname}${location.search}` }}
    />
  )
}
 



function App() {
  const dispatch = useDispatch()
  const jwt = useSelector(state => state.user.token)

  useEffect(() => {
    if (jwt) {
      dispatch(getShoppingCart)
    }
  }, [jwt])
  return (
    <div className={styles.App}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signIn" element={<SignInPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/detail/:touristRouteId" element={<DetailPage />} />
          <Route path="/search" element={<SearchPage />} />
          {/* /**
           <Route path="detail/:bookid">
              <Route path=":page" element={<Detail />} />
              <Route path="" element={<Detail />} />
        </Route>  */}
          <Route path="/search">
            <Route path="" element={<SearchPage />} />
            <Route path=":keywords" element={<SearchPage />} />
          </Route>

          {/* 未登录的用户不能进入 购物车和订单页面，需要跳转到登录页面 */}

{/*           
          <Route
            path="/shoppingCart"
            element={< ShoppingCart />} />
          <Route
            path="/placeOrder"
            element={< PlaceOrderPage/>} /> */}
            <Route path="/shoppingCart" element={<PrivateRoute> <ShoppingCart /> </PrivateRoute>}/>
            <Route path="/placeOrder" element={<PrivateRoute> <PlaceOrderPage /> </PrivateRoute>}/>

          <Route path="*" element={<h1>404 Not Found! 页面去火星了</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
