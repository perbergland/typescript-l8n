import { SupportedUILanguage } from "../lib/supported-ui-language";

const demoLangEn = {
  "Language:": "",
  LongerText:
    "This is a longer text where I added more words. It could have been in Markdown and then converted to React nodes by some module.",
  "Try switching languages": "",
  "Welcome to the typescript-l8n demo": ""
};

const demoLangSv: DemoLang = {
  "Language:": "Språk:",
  LongerText:
    "Det här är en längre text där jag lade in fler ord. Den kunde också ha varit i Markdown och sedan konverterats till React-noder av en plugin.",
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
