import { expect } from 'chai';
import { shallow } from 'enzyme';
import Footer from './index';

describe('Footer', () => {
  const wrapper = shallow(<Footer/>);

  it('should contain copyright', () => {
    expect(wrapper.text()).to.equal('@2017 Daniel Antelo');
  });

  it('should include stylesheet', () => {
    expect(wrapper.find('style')).to.have.lengthOf(1);
  });
});
