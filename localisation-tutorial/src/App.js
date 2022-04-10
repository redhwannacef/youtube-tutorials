import { useState } from "react";
import "./App.css";
import i18n from "i18next";
import Backend from "i18next-http-backend";
import { initReactI18next, Trans, useTranslation } from "react-i18next";

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(Backend)
  .init({
    lng: "en",
    fallbackLng: "en",
    backend: { loadPath: "/translations/{{lng}}.json" },
    interpolation: { escapeValue: false },
  });

const App = () => {
  const { t } = useTranslation();
  const [count, setCount] = useState(0);

  const onChange = (event) => {
    i18n.changeLanguage(event.target.value);
    setCount((previousCount) => previousCount + 1);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>{t("welcome")}</h1>
        <p>
          <Trans components={{ bold: <strong />, italics: <i /> }}>
            sample
          </Trans>
        </p>
        <p>{t("changed", { count })}</p>
        <select name="language" onChange={onChange}>
          <option value="en">English</option>
          <option value="fr">French</option>
        </select>
      </header>
    </div>
  );
};

export default App;
