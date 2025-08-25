import React, { createContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
export const translateContext = createContext();
const TranslatePRovider = ({ children }) => {
  const {  i18n,t } = useTranslation();
  function changeLanguage(lang) {
    i18n.changeLanguage(lang);
    // console.log("Language changed to:", lang);
    if (lang === "Ar") {
      document.documentElement.setAttribute("dir", "rtl");
      localStorage.setItem("lang", "Ar");
      localStorage.setItem("dir", "rtl");
    } else {
      document.documentElement.setAttribute("dir", "ltr");
      localStorage.setItem("lang", "en");
      localStorage.setItem("dir", "ltr");
    }
  }
  useEffect(() => {
    const userLang = navigator.language;
    if (localStorage.getItem("lang") && localStorage.getItem("dir")) {
      changeLanguage(localStorage.getItem("lang") === "Ar" ? "Ar" : "en");
      document.documentElement.setAttribute("dir", localStorage.getItem("dir"));
      return;
    }
    if (userLang.includes("ar")) {
      changeLanguage("Ar");
      document.documentElement.setAttribute("dir", "rtl");
    } else {
      changeLanguage("en");

      document.documentElement.setAttribute("dir", "ltr");
    }
  }, []);
  return (
    <translateContext.Provider value={{ t, changeLanguage }}>
      {children}
    </translateContext.Provider>
  );
};

export default TranslatePRovider;
