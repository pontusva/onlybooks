import { Home } from "./components/screens/Home.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import CreateAccount from "./publicAuth/CreateAccount.tsx";
import { SignIn } from "./publicAuth/SignIn.tsx";
import { Account } from "./components/screens/Account.tsx";
import { Dashboard } from "./components/screens/Dashboard.tsx";
import { Books } from "./components/author/Books.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "Account",
        element: <Account />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "books",
        element: <Books />,
      },
    ],
  },
  {
    path: "login",
    element: <SignIn />,
  },
  {
    path: "create-account",
    element: <CreateAccount />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
