import React from 'react';
import Link from 'next/link';
import stylesheet from './style.scss';

class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props.data,
      imgSrc: props.data.images.product,
    };
  }

  handleMouseOver = () => {
    this.setState({
      ...this.state,
      imgSrc: this.props.data.images.outfit,
    });
  };

  handleMouseOut = () => {
    this.setState({
      ...this.state,
      imgSrc: this.props.data.images.product,
    });
  };

  render() {
    const route = { pathname: '/products/detail', query: { id: this.state.id } };

    return (
      <article className="product">
        <style dangerouslySetInnerHTML={{ __html: stylesheet }} />
        <Link href={route}>
          <a>
            <img
              className="product__image"
              alt={ this.state.name }
              src={ this.state.imgSrc }
              onMouseOver={ this.handleMouseOver }
              onMouseOut={ this.handleMouseOut }
            />
            <span className="product__designer">
              { this.state.designer }
            </span>
            <h3 className="product__name">
              { this.state.name }
            </h3>
            <span className="product__price">
              { this.state.price }
            </span>
          </a>
        </Link>
      </article>
    );
  }
}

Product.propTypes = {
  data: React.PropTypes.object,
};

export default Product;
