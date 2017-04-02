import { expect } from 'chai';
import { mount } from 'enzyme';
import { spy } from 'sinon';
import Sorter from './index';

describe('Sorter', () => {
  const sortSelector = '.sorter';
  const linkSelector = '.sorter__link';
  let wrapper;
  let callbackSpy;

  beforeEach(() => {
    callbackSpy = spy();
    wrapper = mount(<Sorter
      offset={0}
      limit={10}
      sort="price"
      sortOptions={[
        { value: 'popular', text: 'Most Popular' },
        { value: 'price', text: 'Lowest Price' },
      ]}
      callback={callbackSpy}
    />);
  });

  it('should render sort links', () => {
    const links = wrapper.find(sortSelector).find('a');
    expect(links).to.have.lengthOf(2);
    expect(links.first().text()).to.equal('Most Popular');
    expect(links.first().props().href).to.equal('?offset=0&limit=10&sort=popular');
    expect(links.last().text()).to.equal('Lowest Price');
    expect(links.last().props().href).to.equal('?offset=0&limit=10&sort=price');
  });

  it('should trigger the given callback when sort option is clicked', () => {
    const link = wrapper.find(linkSelector).first();
    link.simulate('click');
    expect(callbackSpy.calledOnce).to.equal(true);
    expect(callbackSpy.calledWith(0, 10, 'popular')).to.equal(true);
  });

  it('should include stylesheet', () => {
    expect(wrapper.find('style')).to.have.lengthOf(1);
  });
});
