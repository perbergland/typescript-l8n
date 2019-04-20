# typescript-l8n
A pattern for handling localized strings in Typescript without adding any dependencies

## Author
Per Bergland
- https://github.com/perbergland
- https://linkedin.com/in/perbergland

## Description
This repo contains a small React-TS project that showcases a pattern for creation and usage of localized strings in Typescript code.

The main advantages of the pattern are

* No added dependencies (except for mustache but you can remove or replace it easily)
* The text in the base language is viewable where it's used but you can also use text block identifiers
where it makes more sense
* Typescript compilation will fail if unknown strings are used or if you forget to add translation entries for one or more target languages
* The translation dictionaries are just javascript objects

This project was initially set up by running

```
npm install -g create-react-app
create-react-app typescript-l8n --scripts-version=react-scripts-ts
```

## How to use the pattern
Partition your user interface strings into a few names sections (this demo project has two: "admin" and "demo") and wire them together in the languageSections.ts file.
Then you can use the UseLanguage react component as shown in the App.tsx file here or just get the lookup function in your own method and use it like in the calledFromMethod example in App.tsx.