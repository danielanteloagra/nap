# Api

## Test & Lint

To lint the source code run the command:

```bash
yarn lint
```

To run tests simply run one of the following commands:

```bash
yarn test # runs all tests
yarn test:unit # runs unit tests only
yarn test:integration # starts server and runs integration tests
```

Note: for the integration tests the node app must be running on http://127.0.0.1:3000, the test script will
attempt to start it before starting the tests, so it may give an error if it is already running. Use ```yarn stop``` to kill
any strays.

## Restify

This project is built on [Restify](http://restify.com)


## Project Layout Overview

```
|
|-- .eslintrc          Configuration file for eslint
|-- Dockerfile     
|-- package.json       Package dependency config file
|-- yarn.lock          Lock file for third party dependencies
|                      
|-- src/
|    |-- routes        Code for each of our end points
|    |-- config.js     App configuration file
|    |-- index.js      Server init file and api route list
|-- tests/
|    |-- integration
|    |-- unit
```
