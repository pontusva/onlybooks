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
import { Books } from "./components/author/Books.tsx";
import { GeneratedCodes } from "./components/author/GeneratedCodes.tsx";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { Library } from "./components/screens/Library.tsx";

const client = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache(),
});

const queryClient = new QueryClient();

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
        path: "library",
        element: <Library />,
      },
      {
        path: "books",
        element: <Books />,
      },
      {
        path: "generated",
        element: <GeneratedCodes />,
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
    <ApolloProvider client={client}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ApolloProvider>
  </React.StrictMode>
);
