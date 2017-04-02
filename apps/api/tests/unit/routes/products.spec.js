require('module-alias/register');
const restify = require('restify');
const sinon = require('sinon');
const expect = require('chai').expect;
const products = require('@routes/products');
const responseStub = require('@stubs/response-stub');

describe('Products endpoint', () => {
  let sendSpy;

  beforeEach(() => {
    // @TODO rewire module to inject a controlled product data fixture
    // instead of using the same data source as the app
    sendSpy = sinon.spy(responseStub, 'send');
  });

  afterEach(() => {
    sendSpy.restore();
  });

  it('returns 400 BadRequestError when offset is invalid', () => {
    const req = {
      params: {
        offset: 999999,
      },
    };
    products(req, responseStub, () => {});
    expect(sendSpy).calledOnce;
    expect(sendSpy).calledWith(sinon.match(new restify.BadRequestError('Invalid offset')));
  });

  it('returns product data', () => {
    const req = {
      params: {
        limit: 1,
      },
    };
    products(req, responseStub, () => {});
    expect(sendSpy).calledWith(sinon.match.has('data', [{
      id: 543002,
      name: 'Cashmere wrap',
      designer: 'Madeleine Thompson',
      price: '£380',
      images: {
        outfit: '//cache.net-a-porter.com/images/products/543002/543002_ou_sl.jpg',
        product: '//cache.net-a-porter.com/images/products/543002/543002_in_sl.jpg',
      },
    }]));
  });

  it('returns paginated product listing', () => {
    const req = {
      params: {
        offset: 50,
        limit: 10,
      },
    };
    products(req, responseStub, () => {});
    expect(sendSpy).calledOnce;
    expect(sendSpy).calledWith(sinon.match.has('offset', 50));
    expect(sendSpy).calledWith(sinon.match.has('limit', 10));
    expect(sendSpy).calledWith(sinon.match.has('data'));
  });

  it('sorts product listing', () => {
    const req = {
      params: {
        limit: 1,
        sort: 'price',
      },
    };
    products(req, responseStub, () => {});
    expect(sendSpy).calledWith(sinon.match.has('data', [{
      id: 480206,
      name: 'Embellished georgette top',
      designer: 'Altuzarra for Target',
      price: '£18',
      images: {
        outfit: '//cache.net-a-porter.com/images/products/480206/480206_ou_sl.jpg',
        product: '//cache.net-a-porter.com/images/products/480206/480206_in_sl.jpg',
      },
    }]));
  });
});
