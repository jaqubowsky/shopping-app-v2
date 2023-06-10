// eslint-disable-next-line
import React from "react";
// eslint-disable-next-line
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./assets/tailwind.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserDataProvider } from "./context/UserContext.tsx";

const client = new QueryClient({});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <UserDataProvider>
        <App />
      </UserDataProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
