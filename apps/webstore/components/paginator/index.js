import React from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import stylesheet from './style.scss';

function renderPageLinks(total, offset, limit, sort, callback) {
  const pageLinks = [];
  const pageCount = Math.ceil(total / limit);
  const currentPage = Math.ceil(offset / limit);
  for (let i = 0; i < pageCount; i += 1) {
    const classes = classNames('paginator__link', {
      'paginator__link--active': i === currentPage,
    });
    const newOffset = i * limit;
    const route = { query: { offset: newOffset, limit, sort } };
    pageLinks.push(
      <li
        key={i}
        className={classes}
        onClick={ () => callback(newOffset, limit, sort) }
      >
        <Link href={route}>
          <a>{ i + 1 }</a>
        </Link>
      </li>,
    );
  }

  return pageLinks;
}

const Paginator = (props) => {
  const { total, offset, limit, sort, callback, modifier } = props;
  const classes = classNames('paginator', {
    'paginator--bottom': modifier === 'bottom',
  });
  const currentPageLastItemNumber = offset + limit < total ? offset + limit : total;

  return (
    <div className={classes}>
      <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
      <div className="paginator__count">
        <span>{ offset + 1 } to { currentPageLastItemNumber } of { total } Results</span>
      </div>
      <ul className="paginator__link-list">
        { renderPageLinks(total, offset, limit, sort, callback) }
      </ul>
    </div>
  );
};

Paginator.propTypes = {
  total: React.PropTypes.number.isRequired,
  offset: React.PropTypes.number.isRequired,
  limit: React.PropTypes.number.isRequired,
  sort: React.PropTypes.string.isRequired,
  callback: React.PropTypes.func.isRequired,
  modifier: React.PropTypes.string,
};

export default Paginator;
