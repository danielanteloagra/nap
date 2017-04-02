import { expect } from 'chai';
import { mount } from 'enzyme';
import Product from './index';

const fixture = {
  id: 1,
  name: 'product 1',
  designer: 'designer A',
  price: '100GBP',
  images: {
    product: '//cache.net-a-porter.com/images/product-1.jpg',
    outfit: '//cache.net-a-porter.com/images/product-1-outfit.jpg',
  },
};

describe('Product', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<Product data={ fixture }/>);
  });

  it('should render designer, name and price', () => {
    expect(wrapper.find('.product__name').text()).to.equal(fixture.name);
    expect(wrapper.find('.product__designer').text()).to.equal(fixture.designer);
    expect(wrapper.find('.product__price').text()).to.equal(fixture.price);
  });

  describe('Image', () => {
    let img;

    beforeEach(() => {
      img = wrapper.find('img');
    });

    it('shows product image as default', () => {
      expect(img.prop('className')).to.equal('product__image');
      expect(img.prop('src')).to.equal('//cache.net-a-porter.com/images/product-1.jpg');
    });

    it.skip('shows outfit image on hover and resets to product image on out', () => {
      // @TODO get simulation of moseOut and mouceOver working
      img.simulate('mouseEnter');
      expect(img.prop('src')).to.equal('//cache.net-a-porter.com/images/product-1-outfit.jpg');
      img.simulate('mouseLeave');
      expect(img.prop('src')).to.equal('//cache.net-a-porter.com/images/product-1.jpg');
    });
  });

  it('should contain hyperlink to product page', () => {
    expect(wrapper.find('a').prop('href')).to.equal('/products/detail?id=1');
  });

  it('should include stylesheet', () => {
    expect(wrapper.find('style')).to.have.lengthOf(1);
  });
});
