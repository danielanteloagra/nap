require('module-alias/register');
const restify = require('restify');
const config = require('@app/config');
const products = require('@routes/products');
const product = require('@routes/product');

const server = restify.createServer({
  name: config.name,
});

// plugins
server.use(restify.queryParser());
server.use(restify.CORS());

// routes
server.get('/api/products', products);
server.get('/api/products/:id', product);

server.listen(config.port);
