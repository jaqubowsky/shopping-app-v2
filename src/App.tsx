import {
  createBrowserRouter,
  createRoutesFromChildren,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home/index.tsx";
import Layout from "./components/Layout";
import Contact from "./pages/Contact";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import { ThemeProvider } from "@material-tailwind/react";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";
import MyProducts from "./pages/Profile/MyProducts";
import { AddProduct } from "./pages/ProductForm/AddProductForm/index";
import { EditProduct } from "./pages/ProductForm/EditProductForm/index";
import ProductPage from "./pages/Product/ProductPage";
import { UserResponse } from "./types/user";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { checkLoginStatus } from "./api/userApi";
import "react-toastify/dist/ReactToastify.css";
import Notification from "./components/PopUp/Notification";
import { UserContext } from "./context/UserContext";
import Products from "./pages/Products/index.tsx";
import { CartContext } from "./context/CartContext.tsx";
import { CartItemsResponse } from "./types/cart";
import { getCartItems } from "./api/cartApi.ts";

function App() {
  const { data: userData, refetch }: UseQueryResult<UserResponse> = useQuery({
    queryKey: ["userData"],
    queryFn: checkLoginStatus,
  });

  const {
    data: cartData,
    refetch: refetchCart,
  }: UseQueryResult<CartItemsResponse> = useQuery({
    queryKey: ["cartItems"],
    queryFn: getCartItems,
  });

  let isLoggedIn;

  if (userData?.user === null) {
    isLoggedIn = false;
  } else {
    isLoggedIn = true;
  }

  const routes = createRoutesFromChildren(
    <Route path="/" element={<Layout userData={userData} />}>
      <Route index element={<Home />} />
      <Route path="contact" element={<Contact />} />
      <Route path="products" element={<Products />} />
      <Route
        path="login"
        element={
          <ProtectedRoute isUserLoggedIn={isLoggedIn} redirectPath="/">
            <Login />
          </ProtectedRoute>
        }
      />
      <Route
        path="register"
        element={
          <ProtectedRoute isUserLoggedIn={isLoggedIn} redirectPath="/">
            <Register />
          </ProtectedRoute>
        }
      />
      <Route
        path="add-product"
        element={
          <ProtectedRoute isUserLoggedIn={!isLoggedIn} redirectPath="/login">
            <AddProduct />
          </ProtectedRoute>
        }
      />
      <Route
        path="edit-product/:id"
        element={
          <ProtectedRoute isUserLoggedIn={!isLoggedIn} redirectPath="/login">
            <EditProduct />
          </ProtectedRoute>
        }
      />
      <Route path="/products/:id" element={<ProductPage />} />
      <Route
        path="profile"
        element={
          <ProtectedRoute isUserLoggedIn={!isLoggedIn} redirectPath="/login">
            <Profile userData={userData} />
          </ProtectedRoute>
        }
      />
      <Route
        path="profile/my-products"
        element={
          <ProtectedRoute isUserLoggedIn={!isLoggedIn} redirectPath="/login">
            <MyProducts />
          </ProtectedRoute>
        }
      />
    </Route>
  );

  const router = createBrowserRouter(routes);

  return (
    <ThemeProvider>
      <UserContext.Provider value={{ userData, refetch, isLoggedIn }}>
        <CartContext.Provider value={{ cartData, refetchCart }}>
          <RouterProvider router={router} />
        </CartContext.Provider>
      </UserContext.Provider>
      <Notification />
    </ThemeProvider>
  );
}

export default App;
