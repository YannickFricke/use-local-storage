# React local storage hook <!-- omit in toc -->

![CI workflow status](https://img.shields.io/github/workflow/status/YannickFricke/use-local-storage/CI)
[![codecov](https://codecov.io/gh/YannickFricke/use-local-storage/branch/develop/graph/badge.svg)](https://codecov.io/gh/YannickFricke/use-local-storage)
![GitHub watchers](https://img.shields.io/github/watchers/YannickFricke/use-local-storage?style=social)

-   [About the project](#about-the-project)
-   [Installation](#installation)
    -   [NPM](#npm)
    -   [Yarn](#yarn)
-   [TypeScript support](#typescript-support)
-   [Usage examples](#usage-examples)
-   [License](#license)

## About the project

This package provides a react.js hook for using the local storage of a browser.

## Installation

### NPM

```
npm i --save @yannickfricke/use-local-storage
```

### Yarn

```
yarn add @yannickfricke/use-local-storage
```

## TypeScript support

This package includes TypeScript definition files - so with every good IDE you can read those declaration files
and get auto complete for the API.

## Usage examples

```ts
// Import the hook
import {
    useLocalStorage,
    useSyncedLocalStorage,
} from '@yannickfricke/use-local-storage/dist';

// The key defines the name of the entry
// which will be used to save the data
const usersKey = 'app.users';

// Define the settings key
// It will be used to save an object to the
// local storage
const settingsKey = 'app.settings';

// This returns a function which you can execute
// to get the users array from the local storage
export const getUsers = () => useLocalStorage(usersKey, []);

// Define the second argument as object to save
// this value. You can also define here a default state
// which will be saved when the value of the key is null
export const getSettings = () => useLocalStorage(settingsKey, {});
// HINT: The synced local storage will update its own value when
// another local storage instance updated the value.
// So the state will be syncronized across windows / tabs
export const getSettings = () => useSyncedLocalStorage(settingsKey, {});
```

HINT:

TypeScript users can also use generics to define the type of the state!

Then it will be correctly type hinted.

## License

This package is published under the MIT license.
