require('module-alias/register');
const restify = require('restify');
const expect = require('chai').expect;

const client = restify.createJsonClient({
  url: 'http://127.0.0.1:3000',
});

describe('Endpoints', () => {
  it('products endpoint is working', (done) => {
    client.get('/api/products', (err, req, res, data) => {
      expect(err).to.be.null;
      expect(res.statusCode).to.equal(200);
      expect(res.headers['content-type']).to.equal('application/json');
      expect(data).have.keys(['offset', 'limit', 'total', 'sort', 'data']);
      done();
    });
  });

  it('product endpoint is working', (done) => {
    client.get('/api/products/502182', (err, req, res, data) => {
      expect(err).to.be.null;
      expect(res.statusCode).to.equal(200);
      expect(res.headers['content-type']).to.equal('application/json');
      expect(data).have.keys(['id', 'name', 'price', 'designer', 'onSale', 'sizes', 'badges', 'images']);
      done();
    });
  });
});
