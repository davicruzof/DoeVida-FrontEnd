import { useTranslation } from "react-i18next";

function App() {
  const { t, i18n } = useTranslation();

  return (
    <div>
      <p className="read-the-docs">{t("welcome")}</p>
      <button onClick={() => i18n.changeLanguage("en")}>Mudar para EN</button>
    </div>
  );
}

export default App;
