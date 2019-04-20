import * as React from "react";
import "./App.css";

import logo from "./logo.svg";
import { SupportedUILanguage } from "./localization/lib/supported-ui-language";
import { UseLanguage } from "./localization/components/UseLanguage";
import { getLookupFunction } from "./localization/lib/languageSections";

/**
 * This demonstrates how to invoke the lookup from a normal function
 */
const getLabelFromMethod = (language: SupportedUILanguage) => {
  const lookup = getLookupFunction("demo", language);
  return lookup("Try switching languages");
};

interface AppState {
  language: SupportedUILanguage;
}
class App extends React.Component<{}, AppState> {
  state: AppState = {
    language: "en"
  };

  handleLanguageChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const language = event.target.value as SupportedUILanguage;
    this.setState({ language });
  }

  public render() {
    return (
      <UseLanguage section="demo" language={this.state.language}>
        {_t => (
          <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h1 className="App-title">
                {_t("Welcome to the typescript-l8n demo")}
              </h1>
            </header>
            <p className="App-intro">
              {getLabelFromMethod(this.state.language)}
            </p>
            <div>
              <label>
              {_t("Language:")}
              <select
                value={this.state.language}
                onChange={event => this.handleLanguageChange(event)}
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
  }
}

export default App;
