import React, { createContext, useState } from "react";
export const seeAndHidePassword = createContext();
const SeeAndHidePassword = ({ children }) => {
  const [seePassword, setSeePassword] = useState({
    password: "password",
    rePassword: "password",
  });
  const { password, rePassword } = seePassword;
  // see and hight password=================
  function seeAndHidePasswrod() {
    if (password == "password") {
      setSeePassword({ ...seePassword, password: "text" });
    } else if (password == "text") {
      setSeePassword({ ...seePassword, password: "password" });
    }
  }
  function seeAndHideRepassword() {
    if (rePassword == "password") {
      setSeePassword({ ...seePassword, rePassword: "text" });
    } else if (rePassword == "text") {
      setSeePassword({ ...seePassword, rePassword: "password" });
    }
  }

  const valuse = {
    seeAndHidePasswrod,
    password,
    rePassword,
    seeAndHideRepassword
  };
  return (
    <seeAndHidePassword.Provider value={valuse}>
      {children}
    </seeAndHidePassword.Provider>
  );
};

export default SeeAndHidePassword;
