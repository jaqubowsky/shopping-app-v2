import {
  createBrowserRouter,
  createRoutesFromChildren,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import Contact from "./pages/Contact";
import Register from "./pages/Login/Register";
import Login from "./pages/Login/Login";
import { ThemeProvider } from "@material-tailwind/react";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";
import MyProducts from "./pages/Profile/MyProducts";
import AddProduct from "./pages/AddProduct";
import ProductPage from "./pages/Products/ProductPage";
import { UserResponse } from "./types/user";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { checkLoginStatus } from "./api/userApi";
import "react-toastify/dist/ReactToastify.css";
import Notification from "./components/PopUp/Notification";

function App() {
  const { data: userData }: UseQueryResult<UserResponse> = useQuery({
    queryKey: ["userData"],
    queryFn: checkLoginStatus,
  });
  let isloggedIn;

  if (userData?.user === null) {
    isloggedIn = false;
  } else {
    isloggedIn = true;
  }

  const routes = createRoutesFromChildren(
    <Route path="/" element={<Layout userData={userData} />}>
      <Route index element={<Home />} />
      <Route path="contact" element={<Contact />} />
      <Route
        path="login"
        element={
          <ProtectedRoute isUserLoggedIn={isloggedIn} redirectPath="/">
            <Login />
          </ProtectedRoute>
        }
      />
      <Route
        path="register"
        element={
          <ProtectedRoute isUserLoggedIn={isloggedIn} redirectPath="/">
            <Register />
          </ProtectedRoute>
        }
      />
      <Route
        path="add-product"
        element={
          <ProtectedRoute isUserLoggedIn={!isloggedIn} redirectPath="/login">
            <AddProduct />
          </ProtectedRoute>
        }
      />
      <Route path="/products/:id" element={<ProductPage />} />
      <Route
        path="profile"
        element={
          <ProtectedRoute isUserLoggedIn={!isloggedIn} redirectPath="/login">
            <Profile userData={userData} />
          </ProtectedRoute>
        }
      />
      <Route
        path="profile/my-products"
        element={
          <ProtectedRoute isUserLoggedIn={!isloggedIn} redirectPath="/login">
            <MyProducts />
          </ProtectedRoute>
        }
      />
    </Route>
  );

  const router = createBrowserRouter(routes);

  return (
    <ThemeProvider>
      <RouterProvider router={router} />
      <Notification />
    </ThemeProvider>
  );
}

export default App;
