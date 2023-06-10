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
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import "react-toastify/dist/ReactToastify.css";
import Notification from "./components/PopUp/Notification";
import { useUserContext } from "./context/UserContext";
import Products from "./pages/Products/index.tsx";
import { CartContext } from "./context/CartContext.tsx";
import { CartItemsResponse } from "./types/cart";
import { getCartItems } from "./api/cartApi.ts";

function App() {
  const { userData } = useUserContext();

  const {
    data: cartData,
    refetch: refetchCart,
  }: UseQueryResult<CartItemsResponse> = useQuery({
    queryKey: ["cartItems"],
    queryFn: getCartItems,
    enabled: userData?.isLoggedIn || false, // Only enable the query when the user is logged in
  });

  const routes = createRoutesFromChildren(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="contact" element={<Contact />} />
      <Route path="products" element={<Products />} />
      <Route
        path="login"
        element={
          <ProtectedRoute
            condition={!userData?.isLoggedIn || false}
            redirectPath="/"
          >
            <Login />
          </ProtectedRoute>
        }
      />
      <Route
        path="register"
        element={
          <ProtectedRoute
            condition={!userData?.isLoggedIn || false}
            redirectPath="/"
          >
            <Register />
          </ProtectedRoute>
        }
      />
      <Route
        path="add-product"
        element={
          <ProtectedRoute
            condition={userData?.isLoggedIn || false}
            redirectPath="/login"
          >
            <AddProduct />
          </ProtectedRoute>
        }
      />
      <Route
        path="edit-product/:id"
        element={
          <ProtectedRoute
            condition={userData?.isLoggedIn || false}
            redirectPath="/login"
          >
            <EditProduct />
          </ProtectedRoute>
        }
      />
      <Route path="/products/:id" element={<ProductPage />} />
      <Route
        path="profile"
        element={
          <ProtectedRoute
            condition={userData?.isLoggedIn || false}
            redirectPath="/login"
          >
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="profile/my-products"
        element={
          <ProtectedRoute
            condition={userData?.isLoggedIn || false}
            redirectPath="/login"
          >
            <MyProducts />
          </ProtectedRoute>
        }
      />
    </Route>
  );

  const router = createBrowserRouter(routes);

  return (
    <ThemeProvider>
      <CartContext.Provider value={{ cartData, refetchCart }}>
        <RouterProvider router={router} />
      </CartContext.Provider>
      <Notification />
    </ThemeProvider>
  );
}

export default App;
