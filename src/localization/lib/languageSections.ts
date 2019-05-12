import * as Mustache from "mustache";
import { DemoLangKeys, getDemoLangLookup } from "../sections/demoLang";
import { AdminLangKeys, getAdminLangLookup } from "../sections/adminLang";
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

// Ideally this type should be constrained and synced with the LanguageSection
// values above but I don't know how to do that
export interface LanguageSectionKeyTypes {
  readonly demo: DemoLangKeys;
  readonly admin: AdminLangKeys;
}

/**
 * Define a type so we can ensure all values are covered
 */
type LookupFunctions = {
  readonly [k in LanguageSection]: (
    lang: SupportedUILanguage
  ) => (key: LanguageSectionKeyTypes[k]) => string | undefined
};

/**
 * Use a data structure instead of switch statement so that we can
 * catch missing entries
 */
const lookupFunctions: LookupFunctions = {
  demo: getDemoLangLookup,
  admin: getAdminLangLookup
};

const getLanguageLookup = <S extends LanguageSection>(
  section: S,
  language: SupportedUILanguage
): ((key: LanguageSectionKeyTypes[S]) => string | undefined) => {
  return lookupFunctions[section](language);
};

export const getLanguageLookupFunction = <S extends LanguageSection>(
  section: S,
  language: SupportedUILanguage
): ((key: LanguageSectionKeyTypes[S], view?: ViewData) => string) => {
  const lookup = getLanguageLookup(section, language);
  return (key: LanguageSectionKeyTypes[S], view?: ViewData) => {
    const value = lookup(key);
    return postProcess(key, value, view);
  };
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
const postProcess = (
  key: string,
  value: string | undefined,
  view?: ViewData
): string => {
  if (value === "" || value === undefined) {
    // The normal case for the base language is to have empty lookup values and return the key as the value
    return applyView(key, view);
  }
  return applyView(value, view);
};
