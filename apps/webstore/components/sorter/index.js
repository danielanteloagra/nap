import React from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import stylesheet from './style.scss';

const Paginator = (props) => {
  const { limit, sort, sortOptions, callback } = props;

  return (
    <ul className="sorter">
      <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
      <For each="item" index="idx" of={ sortOptions }>
        <li
          key={idx}
          className={classNames('sorter__link', {
            'sorter__link--active': sort === item.value,
          })}
          onClick={ () => callback(0, limit, item.value) }
        >
          <Link href={{ query: { offset: 0, limit, sort: item.value } }}>
            <a>{ item.text }</a>
          </Link>
        </li>
      </For>
    </ul>
  );
};

Paginator.propTypes = {
  limit: React.PropTypes.number.isRequired,
  sort: React.PropTypes.string.isRequired,
  sortOptions: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  callback: React.PropTypes.func.isRequired,
};

export default Paginator;
