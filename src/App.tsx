import {
  createBrowserRouter,
  createRoutesFromChildren,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Layout from "./components/Layout";
import Contact from "./pages/Contact";
import Register from "./pages/Login/Register";
import Login from "./pages/Login/Login";
import { ThemeProvider } from "@material-tailwind/react";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import Profile from "./pages/Profile";
import Reset from "./pages/Login/Reset";
import { useState } from "react";

function App() {
  const [user] = useAuthState(auth);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setClose] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const routes = createRoutesFromChildren(
    <Route
      path="/"
      element={<Layout setError={setError} setClose={setClose} error={error} />}
    >
      <Route index element={<Home />} />
      <Route path="products" element={<Products />} />
      <Route path="contact" element={<Contact />} />
      <Route
        path="login"
        element={
          <ProtectedRoute isUserLoggedIn={user ? true : false}>
            <Login error={error} setClose={setClose} setError={setError} />
          </ProtectedRoute>
        }
      />
      <Route
        path="login/reset-password"
        element={
          <ProtectedRoute isUserLoggedIn={user ? true : false}>
            <Reset
              error={error}
              setClose={setClose}
              setError={setError}
              success={success}
              setSuccess={setSuccess}
            />
          </ProtectedRoute>
        }
      />
      <Route
        path="register"
        element={
          <ProtectedRoute isUserLoggedIn={user ? true : false}>
            <Register error={error} setClose={setClose} setError={setError} />
          </ProtectedRoute>
        }
      />
      <Route
        path="profile"
        element={
          <ProtectedRoute isUserLoggedIn={user ? false : true}>
            <Profile />
          </ProtectedRoute>
        }
      />
    </Route>
  );

  const router = createBrowserRouter(routes);

  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
