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
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from "@apollo/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { Library } from "./components/screens/Library.tsx";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";
import { setContext } from "@apollo/client/link/context";
import { firebaseApp, auth } from "./auth/initAuth.ts";
const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql", // Replace with your GraphQL server URI
});

// Create a middleware link to set the Authorization header
const authLink = setContext(async (_, { headers }) => {
  const user = auth.currentUser;

  if (!user) {
    return {
      headers,
    };
  }

  try {
    const token = await user.getIdToken();
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  } catch (error) {
    console.error("Error fetching ID token:", error);
    return {
      headers,
    };
  }
});
const uploadLink = createUploadLink({
  uri: "http://localhost:4000/", // Your GraphQL server URI
});
const combinedLink = from([authLink, uploadLink]);
const client = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache(),
  link: combinedLink,
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
