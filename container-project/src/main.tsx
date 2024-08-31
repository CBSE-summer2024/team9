import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Header from "./components/header.tsx";
import RecentProducts from "./pages/recent-products.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "recent-products",
    element: <RecentProducts />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Header />

    <RouterProvider router={router} />
  </StrictMode>
);
