import React from 'react';
import Link from 'next/link';
import stylesheet from './style.scss';

const ProductDetail = (props) => {
  const { name, images } = props.data;

  return (
    <section className="product-detail">
      <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
      <div className="product-detail__imagery">
        <img alt="" src={ images.large } />
      </div>
      <div className="product-detail__information">
        <h1 className="product-detail__name">
          { name }
        </h1>
        <p>
          Sample page to demonstrate routing. Here we would add full product description
          and options, as well as image gallery etc.
        </p>
        <p>
          Note that we do not currently have friendly url slugs, this would be next
          on the list, as well as breadcrumbs. We would ideally have a url in the form
          <em>/products/:id/:product-name-slug</em>
        </p>
        <Link href="/products">
          <a>Back to listing</a>
        </Link>
      </div>
    </section>
  );
};

ProductDetail.propTypes = {
  data: React.PropTypes.object.isRequired,
};

export default ProductDetail;
