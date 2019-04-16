# typescript-l8n
A pattern for localized strings in Typescript

## Author
Per Bergland
- https://github.com/perbergland
- https://linkedin.com/in/perbergland

## Description
This repo contains a small React-TS project that showcases a pattern for creation and usage of localized strings in Typescript code.

The main advantages of the pattern are

* The text in the base language is viewable where it's used
* Typescript compilation will fail if unknown strings are used or if you forget to add translation entries
* The translation dictionaries are 99% json data so external tools can be used for modification

This project was initially set up by running

```
npm install -g create-react-app
create-react-app typescript-l8n --scripts-version=react-scripts-ts
```