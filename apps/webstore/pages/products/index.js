import React from 'react';
import classNames from 'classnames';
import ProductList from '@components/product-list';
import Paginator from '@components/paginator';
import Sorter from '@components/sorter';
import { listing } from '@api/product';
import stylesheet from './index.scss';

class ProductListingPage extends React.Component {
  static async getInitialProps({ query }) {
    const res = await listing({
      offset: query.offset,
      limit: query.limit,
      sort: query.sort,
    });

    return ProductListingPage.mapResponseToProps(res);
  }

  constructor(props) {
    super(props);
    this.state = props;
  }

  static mapResponseToProps(res) {
    return {
      loading: false,
      listing: res.data,
      total: res.total,
      offset: res.offset,
      sort: res.sort,
      limit: res.limit,
    };
  }

  updateListing = (offset, limit, sort) => {
    this.setState({
      ...this.state,
      loading: true,
    });

    listing({
      offset,
      limit,
      sort,
    }).then((res) => {
      // timeout to give the loader time to display
      setTimeout(() => {
        this.setState({
          ...this.state,
          ...ProductListingPage.mapResponseToProps(res),
          loading: false,
        });
      }, 1000);
    });
  };

  render() {
    const classes = classNames('container', 'listing', {
      'listing--loading': this.state.loading,
    });

    return (
      <main className={ classes }>
        <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
        <h2 className="listing__title">
          What's New
        </h2>
        <Sorter
          limit={ this.state.limit }
          sort={ this.state.sort }
          sortOptions={[
            { value: 'popular', text: 'Most Popular' },
            { value: 'price', text: 'Lowest Price' },
            { value: 'brand', text: 'Designer' },
          ]}
          callback={ this.updateListing }
        />
        <Paginator
          total={ this.state.total }
          offset={ this.state.offset }
          limit={ this.state.limit }
          sort={ this.state.sort }
          callback={ this.updateListing }
        />
        <ProductList
          listing={ this.state.listing }
        />
        <Paginator
          total={ this.state.total }
          offset={ this.state.offset }
          limit={ this.state.limit }
          sort={ this.state.sort }
          callback={ this.updateListing }
          modifier='bottom'
        />
      </main>
    );
  }
}

export default ProductListingPage;
