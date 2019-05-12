import { ReactElement } from "react";
import { LanguageSection, ViewData, LanguageSectionKeyTypes, getLanguageLookupFunction } from '../lib/languageSections';
import { SupportedUILanguage } from '../lib/supported-ui-language';

export interface UseLanguageProps<
  S extends LanguageSection,
> {
  section: S;
  language: SupportedUILanguage;
  children: (
    provider: (key: LanguageSectionKeyTypes[S], view?:ViewData) => string
  ) => ReactElement;
}

/**
 * Component to use in a React render block to get access to localized string. 
 */
export const UseLanguage = <
  S extends LanguageSection
>({
  children,
  section,
  language
}: UseLanguageProps<S>) => {
  const provider = getLanguageLookupFunction(section,language);
  return children(provider);
};
