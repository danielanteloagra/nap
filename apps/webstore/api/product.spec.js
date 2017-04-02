import moxios from 'moxios';
import { expect } from 'chai';
import xhr from 'axios';
import xhrConfig from '@config/xhr';
import { listing, product } from '@api/product';

describe('Products Model', () => {
  beforeEach(() => {
    moxios.install(xhr);
  });

  afterEach(() => {
    moxios.uninstall(xhr);
  });

  it('gets product listing', (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      expect(request.config.url).to.equal(`${xhrConfig.baseURL}/products`);
      request.respondWith({
        status: 200,
        response: [
          { name: 'p1' },
          { name: 'p2' },
        ],
      });
    });

    listing().then((response) => {
      expect(response).eql([
        { name: 'p1' },
        { name: 'p2' },
      ]);
      done();
    });
  });

  it('gets single product', (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      expect(request.config.url).to.equal(`${xhrConfig.baseURL}/products/121`);
      request.respondWith({
        status: 200,
        response: { name: 'p121' },
      });
    });

    product(121).then((response) => {
      expect(response).eql({ name: 'p121' });
      done();
    });
  });
});
