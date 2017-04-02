import { expect } from 'chai';
import { shallow } from 'enzyme';
import Product from './product';
import ProductList from './index';

describe('Product List', () => {
  it('should render given number of products', () => {
    const listing = [
      { id: 1 },
      { id: 2 },
      { id: 3 },
    ];
    const wrapper = shallow(<ProductList listing={listing}/>);
    expect(wrapper.find(Product)).to.have.lengthOf(3);
  });

  it('should include stylesheet', () => {
    const wrapper = shallow(<ProductList/>);
    expect(wrapper.find('style')).to.have.lengthOf(1);
  });
});
