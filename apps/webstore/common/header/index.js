import stylesheet from './style.scss';

export default () => (
  <header className="header">
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
    <img
      className="header__logo"
      alt="NAP"
      src="//nap-assets.nap-live.ext.net-a-porter.com/girdle/images/header/logo-net-a-porter.80097ad030588586.svg"
    />
  </header>
);
