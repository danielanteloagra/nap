# Web Store

## Test & Lint

To lint the source code run the command:

```bash
yarn lint
```

To run tests simply run one of the following commands:

```bash
yarn test
```

## Project Layout Overview

```
|
|-- .babelrc           Babel compiler configuration file
|-- .eslintrc          Configuration file for eslint
|-- .sass-lint.yml     Configration file for sass-lint
|-- Dockerfile     
|-- jest.mock.js       Used to mock import of styling files in test environment
|-- next.config.js     Custom webpack config to be added to the next.js webpack base setup  
|-- package.json       Package dependency config file
|-- postcss.config.js  Configration file for postcss/autoprefixer
|-- yarn.lock          Lock file for third party dependencies
|                      
|-- api/               Here goes the axios api connectors
|-- common/            Here go common files e.g. header and footer
|-- config/            Configuration files in here
|-- components/        Here go all our app components
|-- pages/             Container components that are used by the routing
```

### Component Orientated

The project should revolve around making components as small as possible with a single purpose.
Each component must contain its test file and styles.
This ensures that our components are easily portable and interchangeable.

#### Example of a component

```
|-- components/
|    |-- my-component/
|    |    |-- index.js         Main source code file
|    |    |-- spec.js          Unit test file
|    |    |-- style.scss       Style file (index.js will import this)
```

## Api

We are using the library [axios](https://github.com/mzabriskie/axios) for http requests.
This is browser and node.js compatible with a wider browser compatibility (IE8+) without the need of polyfills than alternatives like fetch.

### Testing

In oder to test axios requests, we are using the library [moxios](https://github.com/mzabriskie/moxios)
