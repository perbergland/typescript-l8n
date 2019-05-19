import { SupportedUILanguage } from "../lib/supported-ui-language";

/**
 * For the base language we only have to define entries where the key is not the value
 */
const demoLangEn: Partial<DemoLang> = {
  LongerText:
    "This is a longer text where I added more words. It could have been in Markdown and then converted to React nodes by some module."
};

const demoLangSv = {
  "Language:": "Språk:",
  LongerText:
    "Det här är en längre text där jag lade in fler ord. Den kunde också ha varit i Markdown och sedan konverterats till React-noder av en plugin.",
  "Try switching languages": "Prova att byta språk",
  "Welcome to the typescript-l8n demo":
    "Välkommen till demon för typescript-l8n",
  "Text in an inline React component": "Text i en inlinad React-komponent"
};

export type DemoLangKeys = keyof typeof demoLangSv;
type DemoLang = { readonly [k in DemoLangKeys]: string };

export const getDemoLangLookup = (language: SupportedUILanguage) => (
  key: DemoLangKeys
): string | undefined => getDemoLangData(language)[key];

const getDemoLangData = (l: SupportedUILanguage): Partial<DemoLang> => {
  switch (l) {
    case "sv":
      return demoLangSv;
    case "en":
    default:
      return demoLangEn;
  }
};
