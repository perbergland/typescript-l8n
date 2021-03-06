import * as React from "react";
import "./App.css";

import logo from "./logo.svg";
import { SupportedUILanguage } from "./localization/lib/supported-ui-language";
import { UseLanguage } from "./localization/components/UseLanguage";
import { getLanguageLookupFunction } from "./localization/lib/languageSections";

/**
 * This demonstrates how to invoke the lookup from a normal function
 */
const getLabelFromMethod = (language: SupportedUILanguage) => {
  const lookup = getLanguageLookupFunction("demo", language);
  return lookup("Try switching languages");
};

const FunctionWrapper = ({
  children
}: {
  children: () => React.ReactElement;
}): React.ReactElement => {
  return children();
};

const App = () => {
  const [language, setLanguage] = React.useState<SupportedUILanguage>("en");

  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const language = event.target.value as SupportedUILanguage;
    setLanguage(language);
  };

  return (
    <UseLanguage section="demo" language={language}>
      {_t => (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">
              {_t("Welcome to the typescript-l8n demo")}
            </h1>
          </header>
          <FunctionWrapper>
            {() => {
              const t = getLanguageLookupFunction("demo", language);
              return <div>{t("Text in an inline React component")}</div>;
            }}
          </FunctionWrapper>
          <p className="App-intro">{getLabelFromMethod(language)}</p>
          <hr />
          <div>
            <label>
              {_t("Language:")}
              <select
                value={language}
                onChange={event => handleLanguageChange(event)}
              >
                <option value="en">English</option>
                <option value="sv">Swedish</option>
              </select>
            </label>
          </div>
          <p>{_t("LongerText")}</p>
        </div>
      )}
    </UseLanguage>
  );
};

export default App;
