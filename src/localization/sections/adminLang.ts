import { SupportedUILanguage } from "../lib/supported-ui-language";

const adminLangEn = {
  Candidates: "",
  Delete: "",
  "Do you really want to delete the company": "",
  Projects: "",
  References: "",
  "Type the company name to proceed": "",
  Users: ""
};

const adminLangSv: AdminLang = {
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

export type AdminLang = { readonly [k in keyof typeof adminLangEn]: string };
export type AdminLangData = { readonly [k in SupportedUILanguage]: AdminLang };

export const getAdminLangData = (): AdminLangData => ({
  en: adminLangEn,
  sv: adminLangSv
});
