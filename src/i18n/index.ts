import i18n from "i18next";

import { initReactI18next } from "react-i18next";
import ptJson from "./translations/pt.json";

i18n.use(initReactI18next).init({
  fallbackLng: "pt",
  interpolation: {
    escapeValue: false,
  },
  resources: {
    pt: ptJson,
  },
});

export default i18n;
