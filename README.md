# nap

The exercise states to be creative with the UI, but I saw opportunity to be creative with the architecture of the project and to demonstrate my full stack capability; therefore I have refactored the exercise into two apps (api and web store) and dockerised them. This also allows me to setup each project with different stacks and development approaches.

I like to take advantage of these exercises to experiment with frameworks/libraries I have not used before so I will be trying out [restify](http://restify.com) for the api and [next.js](https://github.com/zeit/next.js) for the web store (I will sum up my thoughts of these at the end of this document). I hope I have not deviated too much from what was expected, and apologies for not sticking solely to VanillaJS.

For ease and speed of development I am using a monolithic repository approach and docker-compose; the alternative would be for each app to be in its own git repository (debatably better for CI and release management).


## Setup

### With docker

To get both apps up and running simply run the following make command:

```bash
make dev-up
```

or you can use docker-compose directly:

```bash
docker-compose up
```

Note: this may take a few minutes the first time, wait until you see

```
nap-api      | $ node src/index.js
nap-webstore | > Ready on http://localhost:3100
```

you can then ssh into the containers with

```bash
make ssh-api
make ssh-web
```

or using docker directly

```bash
docker exec -it $(IMAGE_NAME) bash
```

### Locally (no docker)

If you would like to get the project running without docker, you first have to edit app/webstore/config/xhr.js to use localhost instead of the linked container (uncomment line 8).

Then you should get the api up and running:

```bash
cd apps/api
yarn install
yarn start
```
followed by the web store app:

```bash
cd apps/webstore
yarn install
yarn build
yarn start
```

Note: I have only tested this on macOS running node 7.4 and yarn 0.18.1


## URLs

Api is on http://localhost:3000/ eg. http://localhost:3000/api/products will return product list json.

The web is on http://localhost:3100/ (you can open this in any browser).


## Reset

If you are switching between running the projects locally or via docker, you may need to reset the project so that the right OS npm dependencies are downloaded. Simply run the following command:

```bash
make reset
```


## Notes & thoughts

- All development was carried out following the principles of TDD and simple design
- The api project shows a more traditional src/ tests/ division, with unit and integration in mind
- The web store project shows a more component orientated approach (tests within the component folder)
- I decided to go with yarn for dependency management due to its superior lock system and performance
- I recommend you run tests and linters within the docker containers to meet environment and project dependencies
- Further scalability and division of responsibility could be obtained using a SOA approach. This would entail the api app becoming a facade
or being replaced by multiple services (or micro-services) orientated around resources (e.g. a products CRUD data service would be its own project/container).

### Next steps

- add a dockerised database container for the product data and link it to the api container (I wanted to try out mongoose ODM)
- see how Next.JS plays with redux and redux-sages
- figure out how to do friendly URLs with Next.JS
- add CucumberJS to the web store app for BDD critical e2e tests
- implement a grid system for SASS (I usually use Susy, so would try something new)
- implement using i18next.js for localisation of text
- lazy load images on the product listing page
- add more functionality to the listing: filtering, number per page, etc.
- optimise page structure outline using [html5outliner](https://hoyois.github.io/html5outliner/)
- add RDFa schema to markup (similar to [this](https://gist.github.com/danielanteloagra/255a7f64f8cfc456c13e))

### Thoughts on Restify

Overall I liked it, it was not far off from express, and it was super simple to get the api endpoints up and running.
I specially like that it includes objects for the different type or response codes (e.g. BadRequestError) and how it allows you to easily define get/put/post/del/patch actions on a resource endpoint.

Would definitely use again and recommend for api projects.

### Thoughts on NextJS

This definitely made making an isomorphic/universal app a breeze. It has really good documentation and examples for everything I needed.

Shortfalls:
- No friendly urls by default, takes extra configuration and you manually have to set it up for both the server and client.
- Its version of the Link object is not as intuitive as the react router one, you have to insert an <a> element inside it.
- I do not like the fact you cannot configure paths, it forces you to put things in ./pages and ./static , and I usually like to have a src folder.
- No SASS or CSS file loader by default, and it pushes for use of Styled JSX which I am not a fan off. It took me longer than desired to get scss imports working, and you have to manually add the stylesheet element to each component which is not ideal.
- No PostCss/autoprefixer out of the box either, but configuration was simple enough

I will need to play with it a bit more, and get friendly URLs working, as well as minification of imported styles, but I see great potential with next.js when SEO and server side rendering is important.
