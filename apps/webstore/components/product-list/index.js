import React from 'react';
import Product from './product';
import stylesheet from './style.scss';

const ProductList = (props) => {
  const { listing } = props;

  return (
    <div className="product-listing">
      <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
      <For each="item" of={ listing }>
        <Product key={ item.id } data={ item }/>
      </For>
    </div>
  );
};

ProductList.propTypes = {
  listing: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
};

ProductList.defaultProps = {
  listing: [],
};

export default ProductList;
