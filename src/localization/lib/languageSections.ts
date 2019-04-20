import * as Mustache from "mustache";
import { DemoLangData, getDemoLangData } from "../sections/demoLang";
import { AdminLangData, getAdminLangData } from "../sections/adminLang";
import { assertUnreachable } from "./unreachable";
import { SupportedUILanguage } from "./supported-ui-language";
import { tuple } from "./tuple";

export const LanguageSectionNames = tuple("demo", "admin");
export type LanguageSectionTuple = typeof LanguageSectionNames;
export type LanguageSection = LanguageSectionTuple[number];

/**
 * mustache view data string => anything
 */
export interface ViewData {
  [k: string]: any;
}

/**
 * The core definition of all language sections
 */
export interface LanguageSections {
  readonly demo: DemoLangData;
  readonly admin: AdminLangData;
}

const getLanguageSection = <S extends LanguageSection>(
  section: S
): LanguageSections[S] => {
  switch (section) {
    case "demo":
      return getDemoLangData();
    case "admin":
      return getAdminLangData();
    default:
      return assertUnreachable(section);
  }
};

export const getLanguageData = <
  S extends LanguageSection,
  L extends SupportedUILanguage
>(
  section: S,
  language: L
): LanguageSections[S][L] => {
  const languageSection = getLanguageSection(section);
  return languageSection[language];
};

/**
 * Given a localization section for a language, looks up the value and returns it as a string
 */
export const lookupKey = <
  S extends LanguageSection,
  L extends SupportedUILanguage
>(
  key: keyof LanguageSections[S][L],
  languageData: LanguageSections[S][L],
  view?: ViewData
): string => {
  const value = languageData[key];
  // Don't know how to make this line type safe
  return postProcess(key as string, value as any, view);
};

/**
 * Placeholder lookups using Mustache
 */
const applyView = (value: string, view?: ViewData) => {
  return Mustache.render(value, view);
};

/**
 * Do whatever is needed on the value directly after it has been retrieved from a dictionary - cleanup, lookups etc
 */
const postProcess = (key: string, value: string, view?: ViewData): string => {
  if (value === "") {
    // The normal case for the base language is to have empty lookup values and return the key as the value
    return applyView(key, view);
  }
  return applyView(value, view);
};

/**
 * Given a section, language and key returns the string for the target language
 */
export const lookupTranslatedString = <
  S extends LanguageSection,
  L extends SupportedUILanguage
>(
  section: S,
  language: L,
  key: keyof LanguageSections[S][L],
  view?: ViewData
) => {
  const languageSection = getLanguageSection(section);
  return lookupKey<S, L>(key, languageSection[language], view);
};

/**
 * Returns a lookup function instantiated for the given section and language
 */
export const getLookupFunction = <
  S extends LanguageSection,
  L extends SupportedUILanguage
>(
  section: S,
  language: L
) => {
  const data = getLanguageData(section, language);
  return (key: keyof LanguageSections[S][L], view?: ViewData) =>
    lookupKey(key, data, view);
};
