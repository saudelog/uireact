---
name: Development
menu: Documentation
route: /dev
---

# Development

## Prerequistes 🧰

- Make sure you have `nvm` installed. Docs: [nvm installion](https://github.com/nvm-sh/nvm#installing-and-updating)
- Make sure you have node installed. Docs: [nodeJS](https://nodejs.org/en)

To start up this project:

```
1. Clone repo
2. run `nvm use` - Make sure you have the correct node version installed, if not install it.
3. run `npm ci`
4. run `npm run dev`
5. Open http://localhost:3000/ in browser
```

## Running tests 👟

For running all tests:

```
npm run test
```

For running only unit tests:

```
npm run test:jest
```

For running unit tests in only 1 package:

```
npm run test:jest -- --scope=@uireact/THE-PACKAGE-NAME
```

For running unit tests in only 1 file:

```
npx jest --coverage=false -- RELATIVE-PATH-TO-TEST-FILE
```
👁️ **--coverage=false** this flag will skip coverage, useful when developing but coverage is needed for PR check to pass


## Test coverage 🏖️

We currently have set up coverage to 100%.

```
branches: 100,
functions: 100,
lines: 100,
statements: 100
```
