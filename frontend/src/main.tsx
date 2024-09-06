import { Home } from './components/screens/Home.tsx'
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import CreateAccount from './publicAuth/CreateAccount.tsx'
import { SignInPage } from './publicAuth/SignIn.tsx'
import { Account } from './components/screens/Account.tsx'
import { Books } from './components/author/Books.tsx'
import { GeneratedCodes } from './components/author/GeneratedCodes.tsx'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  from
} from '@apollo/client'
import {
  QueryClient,
  QueryClientProvider
} from 'react-query'
import { Library } from './components/screens/Library.tsx'
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs'
import { setContext } from '@apollo/client/link/context'
import { auth } from './auth/initAuth.ts'
import { onError } from '@apollo/client/link/error'
import { Profile } from './components/screens/Profile.tsx'
import { ThemeProvider } from '@mui/material/styles'
import theme from './theme.ts'

const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message }) => {
      if (message.includes('Token has expired')) {
        localStorage.removeItem('authToken')
        window.location.href = '/login' // Redirect to login page
      }
    })
  }
})

const authLink = setContext(async (_, { headers }) => {
  const user = auth.currentUser
  if (!user) {
    // If no user is logged in, just return the existing headers
    return {
      headers
    }
  }
  try {
    // Fetch the Firebase ID token (JWT) asynchronously
    const token = await user.getIdToken(true) // `true` forces refresh

    // Include the token in the Authorization header
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : ''
      }
    }
  } catch (error) {
    console.error('Error fetching ID token:', error)
    // If there's an error fetching the token, return headers without the token
    return {
      headers
    }
  }
})

const uploadLink = createUploadLink({
  uri: 'http://localhost:4000/'
})

const combinedLink = from([authLink, uploadLink, errorLink])
const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache(),
  link: combinedLink
})

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: 'Account',
        element: <Account />
      },
      {
        path: 'library',
        element: <Library />
      },
      {
        path: 'books',
        element: <Books />
      },
      {
        path: 'generated',
        element: <GeneratedCodes />
      },
      {
        path: 'profile',
        element: <Profile />
      }
    ]
  },
  {
    path: 'login',
    element: <SignInPage />
  },
  {
    path: 'create-account',
    element: <CreateAccount />
  }
])

ReactDOM.createRoot(
  document.getElementById('root')!
).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <RouterProvider router={router} />
        </ThemeProvider>
      </QueryClientProvider>
    </ApolloProvider>
  </React.StrictMode>
)
