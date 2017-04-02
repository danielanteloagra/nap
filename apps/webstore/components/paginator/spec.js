import { expect } from 'chai';
import { mount } from 'enzyme';
import { spy } from 'sinon';
import Paginator from './index';

describe('Paginator', () => {
  const linkSelector = '.paginator__link';
  const countSelector = '.paginator__count';
  let wrapper;
  let callbackSpy;

  beforeEach(() => {
    callbackSpy = spy();
    wrapper = mount(<Paginator
      total={49}
      offset={0}
      limit={10}
      sort="price"
      callback={callbackSpy}
    />);
  });

  it('should display given result count', () => {
    expect(wrapper.find(countSelector).text()).to.equal('1 to 10 of 49 Results');
  });

  it('should display correct result count on last page', () => {
    const lastPage = mount(<Paginator
      total={49}
      offset={40}
      limit={10}
      sort="price"
      callback={callbackSpy}
    />);
    expect(lastPage.find(countSelector).text()).to.equal('41 to 49 of 49 Results');
  });

  it('should calculate and display correct number of page links', () => {
    expect(wrapper.find(linkSelector)).to.have.lengthOf(5);
  });

  it('should generate listing list with offset and limit', () => {
    const hyperlinkSelector = `${linkSelector} a`;
    let link = wrapper.find(hyperlinkSelector).first();
    expect(link.props().href).to.equal('?offset=0&limit=10&sort=price');
    // and check last link
    link = wrapper.find(hyperlinkSelector).last();
    expect(link.props().href).to.equal('?offset=40&limit=10&sort=price');
  });

  it('should trigger the given callback when a link is clicked', () => {
    const link = wrapper.find(linkSelector).last();
    link.simulate('click');
    expect(callbackSpy.calledOnce).to.equal(true);
    expect(callbackSpy.calledWith(40, 10)).to.equal(true);
  });

  it('should include stylesheet', () => {
    expect(wrapper.find('style')).to.have.lengthOf(1);
  });

  it('should add bottom modifier class', () => {
    const modified = mount(<Paginator
      total={49}
      offset={40}
      limit={10}
      sort="price"
      callback={callbackSpy}
      modifier="bottom"
    />);
    expect(modified.find('.paginator').props().className).to.equal('paginator paginator--bottom');
  });
});
