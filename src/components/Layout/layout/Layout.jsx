import React from "react";
import Navbar from "./../Navbar/Navbar";
import { Outlet, ScrollRestoration } from "react-router-dom";
import GoUp from './../../GoUP/GoUp';
import { Toaster } from "react-hot-toast";

const Layout = () => {
  return (
    <>

     <ScrollRestoration/>
      <Navbar />
      <Outlet />
      <GoUp/>
    </>
  );
};

export default Layout;
