import { expect } from 'chai';
import { shallow } from 'enzyme';
import ProductDetail from './index';

const fixture = {
  name: 'Product 1',
  images: {
    large: '/images/product-1.large.jpg',
  },
};

describe('Product Detail', () => {
  const wrapper = shallow(<ProductDetail data={ fixture }/>);

  it('should include stylesheet', () => {
    expect(wrapper.find('style')).to.have.lengthOf(1);
  });

  it('should render name in a h1', () => {
    expect(wrapper.find('h1').text()).to.equal('Product 1');
  });

  it('should render large image', () => {
    expect(wrapper.find('img').prop('src')).to.equal('/images/product-1.large.jpg');
  });
});
