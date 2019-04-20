import { tuple } from "./tuple";

export const SupportedUILanguageNames = tuple("sv", "en");
export type SupportedUILanguage = typeof SupportedUILanguageNames[number];
