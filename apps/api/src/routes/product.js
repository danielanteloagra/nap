const _ = require('lodash');
const restify = require('restify');
const config = require('@app/config');
const productData = require('@data/products.json').data;

const hydrateProduct = data => ({
  id: data.id,
  name: data.name.en,
  price: `£${data.price.gross / data.price.divisor}`,
  designer: data.brand.name.en,
  onSale: data.onSale,
  sizes: data.saleableStandardSizes,
  badges: data.badges,
  images: {
    outfit: `${config.urls.imageBase}/products/${data.id}/${data.id}_ou_sl.jpg`,
    small: `${config.urls.imageBase}/products/${data.id}/${data.id}_in_sl.jpg`,
    large: `${config.urls.imageBase}/products/${data.id}/${data.id}_in_pp.jpg`,
  },
});

module.exports = (req, res, done) => {
  const id = Number(req.params.id);
  const data = _.find(productData, { id });
  if (data) {
    res.send(hydrateProduct(data));
  } else {
    res.send(new restify.BadRequestError('Invalid id'));
  }

  return done();
};
