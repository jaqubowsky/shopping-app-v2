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
import { ErrorBoundary } from "react-error-boundary";
import ErrorBoundaryFallback from "./components/PopUp/ErrorBoundaryFallback";
import useLoginStatus from "./hooks/useLoginStatus";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MyProducts from "./pages/Profile/MyProducts";
import AddProduct from "./pages/AddProduct";
import ProductPage from "./pages/Products/ProductPage";

function App() {
  const client = new QueryClient({});

  const { userData } = useLoginStatus();
  let loggedIn

  if (userData?.message === "Authorized") {
    loggedIn = true
  } else {
    loggedIn = false
  }

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
      <Route path="contact" element={<Contact />} />
      <Route
        path="login"
        element={
          <ProtectedRoute isUserLoggedIn={!loggedIn}>
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
        path="register"
        element={
          <ProtectedRoute isUserLoggedIn={!loggedIn}>
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
        path="add-product"
        element={
          <ProtectedRoute isUserLoggedIn={!loggedIn}>
            <ErrorBoundary
              fallbackRender={(props) => (
                <ErrorBoundaryFallback
                  {...props}
                  childComponent={<AddProduct />}
                />
              )}
            >
              <AddProduct />
            </ErrorBoundary>
          </ProtectedRoute>
        }
      />
      <Route
        path="/products/:id"
        element={
          <ErrorBoundary
            fallbackRender={(props) => (
              <ErrorBoundaryFallback
                {...props}
                childComponent={<ProductPage />}
              />
            )}
          >
            <ProductPage />
          </ErrorBoundary>
        }
      />
      <Route
        path="profile"
        element={
          <ProtectedRoute isUserLoggedIn={!loggedIn}>
            <ErrorBoundary
              fallbackRender={(props) => (
                <ErrorBoundaryFallback
                  {...props}
                  childComponent={<Profile userData={userData} />}
                />
              )}
            >
              <Profile userData={userData} />
            </ErrorBoundary>
          </ProtectedRoute>
        }
      />
      <Route
        path="profile/my-products"
        element={
          <ProtectedRoute isUserLoggedIn={!loggedIn}>
            <ErrorBoundary
              fallbackRender={(props) => (
                <ErrorBoundaryFallback
                  {...props}
                  childComponent={<MyProducts />}
                />
              )}
            >
              <MyProducts />
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
