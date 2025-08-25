import React from "react";
import { createBrowserRouter, Router, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/layout/Layout";
import Home from "./components/pages/Home/Home";
import Login from "./components/pages/Login/Login";
import Signup from "./components/pages/signup/Signup";
import { Toaster } from "./../node_modules/react-hot-toast/src/components/toaster";
import TokenProvider from "./context/TokenProvider";
import ProtectedRoutsHome from "./components/ProtectedRoutes/ProtectedRoutsHome";
import ProtectedRoutesAuth from "./components/ProtectedRoutes/ProtectedRoutesAuth";
import DarkModeProvider from "./context/DarkMode";
import TranslatePRovider from "./context/TranslatePRovider";
import NotFound from "./components/pages/notFound/NotFound";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Profile from "./components/pages/profile/Profile";
import PostDetails from "./components/pages/postDatails/PostDetails";
import UerInfoProvider from "./context/UerIfonProvider";
import UpdatePostProvider from "./context/UpdatePostProvider";
import UpdateCommentProvider from "./context/UpdateCommentProvider";
import SeeAndHidePassword from "./context/SeeAndHidePassword";

const App = () => {
  const client = new QueryClient({});

  const router = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoutsHome>
              <Home />
            </ProtectedRoutsHome>
          ),
        },
        {
          path: "profile",
          element: (
            <ProtectedRoutsHome>
              <Profile />
            </ProtectedRoutsHome>
          ),
        },
        {
          path: "postDetails/:id",
          element: (
            <ProtectedRoutsHome>
              <PostDetails />
            </ProtectedRoutsHome>
          ),
        },
        { path: "*", element: <NotFound /> },
      ],
    },
    {
      path: "signup",
      element: (
        <ProtectedRoutesAuth>
          <Signup />
        </ProtectedRoutesAuth>
      ),
    },
    {
      path: "login",
      element: (
        <ProtectedRoutesAuth>
          <Login />
        </ProtectedRoutesAuth>
      ),
    },
  ]);
  
  return (
    <>
      <TranslatePRovider>
        <DarkModeProvider>
          <QueryClientProvider client={client}>
            <TokenProvider>
              <Toaster />
              <UerInfoProvider>
                <UpdatePostProvider>
                  <UpdateCommentProvider>
                    <SeeAndHidePassword>
              <RouterProvider router={router} />
              </SeeAndHidePassword>
              </UpdateCommentProvider>
              </UpdatePostProvider>
              </UerInfoProvider>
            </TokenProvider>
          </QueryClientProvider>
        </DarkModeProvider>
      </TranslatePRovider>
    </>
  );
};

export default App;
