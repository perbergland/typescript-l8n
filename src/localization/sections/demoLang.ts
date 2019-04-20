import { SupportedUILanguage } from "../lib/supported-ui-language";

const demoLangEn = {
  Language: "",
  "Try switching languages": "",
  "Welcome to the typescript-l8n demo": ""
};

const demoLangSv: DemoLang = {
  Language: "Språk",
  "Try switching languages": "Prova att byta språk",
  "Welcome to the typescript-l8n demo":
    "Välkommen till demon för typescript-l8n"
};

export type DemoLang = { readonly [k in keyof typeof demoLangEn]: string };
export type DemoLangData = { readonly [k in SupportedUILanguage]: DemoLang };

export const getDemoLangData = (): DemoLangData => ({
  en: demoLangEn,
  sv: demoLangSv
});
