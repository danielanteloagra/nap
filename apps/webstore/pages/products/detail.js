import React from 'react';
import ProductDetail from '@components/product-detail';
import { product } from '@api/product';

class ProductDetailPage extends React.Component {
  static async getInitialProps({ query }) {
    const res = await product(query.id);
    return {
      product: res,
    };
  }

  constructor(props) {
    super(props);
    this.state = props;
  }

  render() {
    return (
      <main className="container">
        <ProductDetail data={ this.state.product } />
      </main>
    );
  }
}

export default ProductDetailPage;
