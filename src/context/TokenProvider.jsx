import { useQueryClient } from "@tanstack/react-query";
import React, { createContext, useEffect, useState } from "react";
export const TokenContext = createContext();

const TokenProvider = ({ children }) => {
  const [token, setToken] = useState( null);

      const queryClient = useQueryClient();
  // function to save token in state and localStorage===================================
  function saveToken(newToken) {
    setToken(newToken);
    localStorage.setItem("token", newToken);
  }
    // logout==============================================================
    function LogOut() {
      localStorage.removeItem("token");

      queryClient.clear()
    }
  // useEffect to check if token exists in localStorage on initial render====================
  useEffect(()=>{
    if(localStorage.getItem("token")){
      setToken(localStorage.getItem("token"));
    }
  },[])
  const data = {
    token,
    saveToken,
    LogOut
  };
  return <TokenContext.Provider value={data}>{children}</TokenContext.Provider>;
};

export default TokenProvider;
