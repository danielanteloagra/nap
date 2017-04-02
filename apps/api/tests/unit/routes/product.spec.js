require('module-alias/register');
const restify = require('restify');
const sinon = require('sinon');
const expect = require('chai').expect;
const product = require('@routes/product');
const responseStub = require('@stubs/response-stub');

describe('Product endpoint', () => {
  let sendSpy;

  beforeEach(() => {
    sendSpy = sinon.spy(responseStub, 'send');
  });

  afterEach(() => {
    sendSpy.restore();
  });

  it('returns 400 BadRequestError when id is invalid', () => {
    const req = {
      params: {
        id: 999999,
      },
    };
    product(req, responseStub, () => {});
    expect(sendSpy).calledOnce;
    expect(sendSpy).calledWith(sinon.match(new restify.BadRequestError('Invalid id')));
  });

  it('returns product data for valid id', () => {
    const req = {
      params: {
        id: 502182,
      },
    };
    product(req, responseStub, () => {});
    expect(sendSpy).calledOnce;
    expect(sendSpy).calledWith({
      id: 502182,
      name: 'Leather bra top',
      price: '£315',
      designer: 'T by Alexander Wang',
      onSale: false,
      sizes: [
        { id: '00003_XS_Clothing', name: 'XS' },
        { id: '00004_S_Clothing', name: 'S' },
        { id: '00005_M_Clothing', name: 'M' },
        { id: '00006_L_Clothing', name: 'L' },
      ],
      badges: ['In_Stock'],
      images: {
        large: '//cache.net-a-porter.com/images/products/502182/502182_in_pp.jpg',
        outfit: '//cache.net-a-porter.com/images/products/502182/502182_ou_sl.jpg',
        small: '//cache.net-a-porter.com/images/products/502182/502182_in_sl.jpg',
      },
    });
  });
});
