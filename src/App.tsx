import React, { useEffect } from "react";
import styles from "./App.module.css";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
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

// // component 路由所指的页面，isAuthenticated 是否登录，...res 传入其它属性
// const PrivateRoute = ({ element, isAuthenticated, ...rest }) => {
//     const routeComponent = (props) => {
//     return isAuthenticated ? (
//       React.createElement(element, props)
//     ) : (
//       <Navigate to= "/signIn"   />
//     ); 
//   }
//   return <Route element={routeComponent} {...rest} />;

// }



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

          <Route

            path="/shoppingCart"
            element={< ShoppingCart />} />

          <Route

            path="/placeOrder"
            element={< PlaceOrderPage/>} />

          <Route path="*" element={<h1>404 Not Found! 页面去火星了</h1>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
