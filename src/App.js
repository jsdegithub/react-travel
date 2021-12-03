import { useEffect, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import styles from "./App.module.css";
import { getShoppingCartProductListActionCreator } from "./redux/reducer/shoppingCart/reducer";
import { PrivateRoute } from "./route/PrivateRoute";

const Home = lazy(() => import("./pages/home/Home"));
const Register = lazy(() => import("./pages/register/Register"));
const Login = lazy(() => import("./pages/login/Login"));
const ProductDetail = lazy(() => import("./pages/productDetail/ProductDetail"));
const ShoppingCart = lazy(() => import("./pages/shoppingCart/ShoppingCart"));
const PlaceOrder = lazy(() => import("./pages/placeOrder/PlaceOrder"));
const SearchProduct = lazy(() => import("./pages/searchProduct/SearchProduct"));

function App() {
  const dispatch = useDispatch();
  const jwt = useSelector((state) => state.login.jwt);

  // 为什么获取购物车列表的请求要放在这？
  // 因为 Header组件的 useEffect中有setState，和 dispatch同时出现会死循环
  // 若在 Home中调用，则其它页面在强制刷新时，会清空内存中的从Home页面获取的shoppingCartProductList

  useEffect(() => {
    if (jwt !== null) {
      dispatch(getShoppingCartProductListActionCreator(jwt));
    }
  }, [jwt]);

  return (
    <div className={styles["App"]}>
      <BrowserRouter>
        <Suspense
          fallback={
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 750,
                textAlign: "center",
                backgroundColor: "rgba(0, 0, 0, 0.08)",
              }}
            >
              <div className={styles["spinner"]}></div>
            </div>
          }
        >
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/productDetail/:id" component={ProductDetail} />
            <Route path="/SearchProduct/:keyword?" component={SearchProduct} />
            <PrivateRoute
              path="/shoppingCart"
              component={ShoppingCart}
              isAuthenticated={jwt !== null}
            />
            <PrivateRoute
              path="/placeOrder"
              component={PlaceOrder}
              isAuthenticated={jwt !== null}
            />
            <Route render={() => <h1>404 not found.</h1>} />
          </Switch>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
