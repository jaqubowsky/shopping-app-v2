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
import Profile from "./pages/Profile";
import Reset from "./pages/Login/Reset";
import { ErrorBoundary } from "react-error-boundary";
import ErrorBoundaryFallback from "./components/PopUp/ErrorBoundaryFallback";
import useLoginStatus from "./hooks/useLoginStatus";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const client = new QueryClient();

  const { user } = useLoginStatus();
  const isLoggedIn = user ? true : false;

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
          <ProtectedRoute isUserLoggedIn={!isLoggedIn}>
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
          <ProtectedRoute isUserLoggedIn={!isLoggedIn}>
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
          <ProtectedRoute isUserLoggedIn={!isLoggedIn}>
            <ErrorBoundary
              fallbackRender={(props) => (
                <ErrorBoundaryFallback
                  {...props}
                  childComponent={<Register />}
                />
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
          <ProtectedRoute isUserLoggedIn={isLoggedIn}>
            <ErrorBoundary
              fallbackRender={(props) => (
                <ErrorBoundaryFallback
                  {...props}
                  childComponent={<Profile />}
                />
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
      <QueryClientProvider client={client}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
