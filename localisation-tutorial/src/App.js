import { useState, Suspense } from "react";
import "./App.css";
import i18n from "i18next";
import { initReactI18next, Trans, useTranslation } from "react-i18next";

const translationsEn = {
  welcome: "Welcome!!!",
  sample: "Sample <bold><italics>text</italics></bold>.",
  changed: "You have changed the language {{count}} time",
  changed_plural: "You have changed the language {{count}} times",
};

const translationsFr = {
  welcome: "Bienvenue!",
  sample: "Exemple de <bold><italics>texte</italics></bold>.",
  changed: "Vous avez changé la langue {{count}} fois",
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      en: { translation: translationsEn },
      fr: { translation: translationsFr },
    },
    lng: "en",
    fallbackLng: "en",
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
    <Suspense fallback="Loading...">
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
    </Suspense>
  );
};

export default App;
