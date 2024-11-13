import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, redirect, RouterProvider } from "react-router-dom";
import Login from "./pages/login.tsx";
const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      loader: async () => {
        const authenticated = localStorage.getItem('token');
        if (!authenticated) {
          return redirect('/login');
        }
        return null;
      }
    },
    {
      path: "/login",
      element: <Login />,
      loader: async () => {
        const authenticated = localStorage.getItem('token');
        if (authenticated) {
          return redirect('/');
        }
        return null;
      }
    },
  ],
  {
    future: {
      v7_fetcherPersist: true,
    },
  }
);
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
