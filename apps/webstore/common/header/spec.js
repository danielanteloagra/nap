import { expect } from 'chai';
import { shallow } from 'enzyme';
import Header from './index';

describe('Header', () => {
  const wrapper = shallow(<Header/>);

  it('should render logo', () => {
    expect(wrapper.find('img').prop('className')).to.equal('header__logo');
    expect(wrapper.find('img').prop('src')).to.equal(
      '//nap-assets.nap-live.ext.net-a-porter.com/girdle/images/header/logo-net-a-porter.80097ad030588586.svg',
    );
  });

  it('should include stylesheet', () => {
    expect(wrapper.find('style')).to.have.lengthOf(1);
  });
});
