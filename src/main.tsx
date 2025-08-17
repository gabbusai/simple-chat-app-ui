import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AuthContextProvider from './utils/AuthContext.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './pages/Auth/Login.tsx';
import MainLayout from './components/MainLayout.tsx';
import TestPage from './pages/TestPage.tsx';
import '@ant-design/v5-patch-for-react-19';
import Register from './pages/Auth/Register.tsx';
import Conversations from './pages/Conversations.tsx';
import Profile from './pages/Profile.tsx';
import Home from './pages/Home.tsx';
import Notifications from './pages/Notifications.tsx';

//tanstack query 
const queryClient = new QueryClient({
  defaultOptions: {
      queries: {
        //refetchInterval: 1000, // Automatically refetch data every second
        retry: 5,
      },
    },
});

//react router dom
const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    element: <MainLayout />,
    children: [
      {
        path: "/test",
        element: <TestPage />
      },
      {
        path: "/conversations",
        element: <Conversations />
      },
      {
        path: "/profile",
        element: <Profile />
      },
      {
        path: "/home",
        element: <Home /> 
      },
            {
        path: "/notifications",
        element: <Notifications />
      }
    ]
  }
])


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
    </QueryClientProvider>
  </StrictMode>,
)
