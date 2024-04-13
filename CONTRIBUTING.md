# Contributing to React Native Swipeable Card Stack

You are welcome to contribute to React Native Swipeable Card Stack. Here are some explanations on how the project is structured, how to build the library and how to run the example app.

## Project organisation

The project is a monorepo built with `yarn workspaces`. It has two workspaces:

- `react-native-swipeable-card-stack`: the library's code (under `/library`).
- `example-app`: a simple Expo app showcasing the different use cases of the library (under `/example-app`).

## Building the library

Simply run:

```shell
yarn build
```

## Running the example app

> ℹ️ All commands should be run from the root of the project.

Start by building the library in watch mode:

```shell
yarn serve
```

Then run the example app:

```shell
yarn start
```
