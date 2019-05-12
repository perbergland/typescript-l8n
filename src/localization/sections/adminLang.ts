import { SupportedUILanguage } from "../lib/supported-ui-language";

const adminLangEn: Partial<AdminLang> = {};

const adminLangSv = {
  Candidates: "Kandidater",
  Delete: "Radera",
  "Do you really want to delete the company":
    "Vill du verkligen radera företaget",
  Projects: "Projekt",
  References: "Referenser",
  "Type the company name to proceed":
    "Skriv in företagsnamnet för att fortsätta",
  Users: "Användare"
};

export type AdminLangKeys = keyof typeof adminLangSv;
type AdminLang = { readonly [k in AdminLangKeys]: string };

export const getAdminLangLookup = (language: SupportedUILanguage) => (
  key: AdminLangKeys
): string | undefined => getAdminLangData(language)[key];

const getAdminLangData = (l: SupportedUILanguage): Partial<AdminLang> => {
  switch (l) {
    case "sv":
      return adminLangSv;
    case "en":
    default:
      return adminLangEn;
  }
};
