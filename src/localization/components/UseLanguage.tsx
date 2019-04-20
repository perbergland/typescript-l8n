import { ReactElement } from "react";
import { LanguageSection, LanguageSections, getLookupFunction } from '../lib/languageSections';
import { SupportedUILanguage } from '../lib/supported-ui-language';

export interface UseLanguageProps<
  S extends LanguageSection,
  L extends SupportedUILanguage
> {
  section: S;
  language: L;
  children: (
    provider: (key: keyof LanguageSections[S][L]) => string
  ) => ReactElement;
}

/**
 * Component to use in a React render block to get access to localized string. 
 */
export const UseLanguage = <
  S extends LanguageSection,
  L extends SupportedUILanguage
>({
  children,
  section,
  language
}: UseLanguageProps<S, L>) => {
  const provider = getLookupFunction(section,language);
  return children(provider);
};
