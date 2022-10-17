# typescript-l8n
A pattern for handling of localized strings in Typescript without adding any dependencies

## Author
Per Bergland
- https://github.com/perbergland
- https://linkedin.com/in/perbergland

## Description
This repo contains a small React-TS project that showcases a pattern for creation and usage of localized strings in Typescript code.

The main advantages of the pattern are

* No added dependencies (except for mustache but you can remove or replace it easily)
* The text in the base language is viewable where it's used
(you can also use text block identifiers where it makes more sense).

![simple use](public/simple-use.png)

* Typescript compilation will fail if unknown strings are used or if you forget to add translation entries for one or more target languages. And you get code completion suggestions in IDE's like VSCode.

![missing key 1](public/missing-key-1.png)

![missing key 2](public/missing-key-2.png)

![code completion](public/completion.png)

* The translation dictionaries are just javascript objects so you can use other tools for managing them if you want


## How to setup and use the typescript-l8n pattern

### Localization sections
Partition your user interface strings into a few names sections (this demo project has two: "admin" and "demo") and wire them together in the languageSections.ts file.

The pattern for a localization section is to use one language as the base and derive the type from the data for another language so that the key for the base language is left in clear text
unless you want to use it as a key to a longer text snippet.

```typescript
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

/**
 * For the base language we only have to define entries where the key is not the value
 */
const demoLangEn: Partial<DemoLang> = {
  LongerText:
    "This is a longer text where I added more words. It could have been in Markdown and then converted to React nodes by some module."
};

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

```
if you have more than two languages (not covered in this project) you would then just define more non-partial maps.
```typescript
// Norwegian
const demoLangNb: DemoLang = {
  "Language:": "Språk:",
  // ...etc
};
```

### languageSections to wire it all up
The [languageSections](src/localization/lib/languageSections.ts) file wires it all together by defining the sections and providing helper methods for getting to the data in type-safe ways.

```typescript
export const LanguageSectionNames = tuple("demo", "admin");
export type LanguageSectionTuple = typeof LanguageSectionNames;
export type LanguageSection = LanguageSectionTuple[number];

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
```

### UseLanguage or getLookupFunction
Once you have set up the languageSections fixture you can use the UseLanguage react component as shown in the App.tsx file here or just get the lookup function returned from getLookupFunction in your own method and use it like in the getLabelFromMethod example in App.tsx.

This is what it looks like when you use "UseLanguage". You just pass a function that takes a lookup function as argument as its only child and if you want strings from different sections you can just wrap multiple UseLanguage components. Both the _t and "lookup" functions below provide a typed interface to the data in the "demo" localization section.

```typescript
  public render() {
    return (
      <UseLanguage section="demo" language={this.state.language}>
        {_t => (
            <div className="App">
            ...
              <h1 className="App-title">
                {_t("Welcome to the typescript-l8n demo")}
              </h1>
            ...
        }
        </UseLanguage>);
  }
```

```typescript
const getLabelFromMethod = (language: SupportedUILanguage) => {
  const lookup = getLanguageLookupFunction("demo", language);
  return lookup("Try switching languages");
};
```

## Scaffolding

This project was initially set up using instructions from https://github.com/Microsoft/TypeScript-React-Starter

```
npm install -g create-react-app
create-react-app typescript-l8n --scripts-version=react-scripts-ts
```
