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
import { ErrorBoundary } from "react-error-boundary";
import ErrorBoundaryFallback from "./components/PopUp/ErrorBoundaryFallback";

function App() {
  const [user] = useAuthState(auth);

  const routes = createRoutesFromChildren(
    <Route
      path="/"
      element={
        <ErrorBoundary
          fallbackRender={(props) => (
            <ErrorBoundaryFallback {...props} childComponent={<Layout />} />
          )}
        >
          <Layout />
        </ErrorBoundary>
      }
    >
      <Route index element={<Home />} />
      <Route path="products" element={<Products />} />
      <Route path="contact" element={<Contact />} />
      <Route
        path="login"
        element={
          <ProtectedRoute isUserLoggedIn={user ? true : false}>
            <ErrorBoundary
              fallbackRender={(props) => (
                <ErrorBoundaryFallback {...props} childComponent={<Login />} />
              )}
            >
              <Login />
            </ErrorBoundary>
          </ProtectedRoute>
        }
      />
      <Route
        path="login/reset-password"
        element={
          <ProtectedRoute isUserLoggedIn={user ? true : false}>
            <ErrorBoundary
              fallbackRender={(props) => (
                <ErrorBoundaryFallback {...props} childComponent={<Reset />} />
              )}
            >
              <Reset />
            </ErrorBoundary>
          </ProtectedRoute>
        }
      />
      <Route
        path="register"
        element={
          <ProtectedRoute isUserLoggedIn={user ? true : false}>
            <ErrorBoundary
              fallbackRender={(props) => (
                <ErrorBoundaryFallback {...props} childComponent={<Register />} />
              )}
            >
              <Register />
            </ErrorBoundary>
          </ProtectedRoute>
        }
      />
      <Route
        path="profile"
        element={
          <ProtectedRoute isUserLoggedIn={user ? false : true}>
            <ErrorBoundary
              fallbackRender={(props) => (
                <ErrorBoundaryFallback {...props} childComponent={<Profile />} />
              )}
            >
              <Profile />
            </ErrorBoundary>
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
