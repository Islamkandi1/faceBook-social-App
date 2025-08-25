import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { createContext } from "react";
export const infoContext= createContext()
const UerInfoProvider = ({ children }) => {
  function getUserData() {
    return axios.get("https://linked-posts.routemisr.com/users/profile-data", {
      headers: {
        Token: localStorage.token,
      },
    });
  }
  const { data,refetch  } = useQuery({
    queryKey: ["profileData", localStorage.token],
    queryFn: getUserData,
    enabled: !!localStorage.token, //
  });


  return <infoContext.Provider  value={{data,refetch}}>{children}</infoContext.Provider>;
};

export default UerInfoProvider;
