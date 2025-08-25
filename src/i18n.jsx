import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import EN from "./locale/En.json";
import Ar from "./locale/Ar.json";
const resources = {
  en: {
    translation: EN
  },
  Ar: {
    translation: Ar
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en", 

    interpolation: {
      escapeValue: false
    }
  });

  export default i18n;