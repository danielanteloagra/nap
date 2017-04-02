import stylesheet from './style.scss';

export default () => (
  <footer className="footer">
    <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
    <span className="footer__copyright">
      @2017 Daniel Antelo
    </span>
  </footer>
);
