const restify = require('restify');
const config = require('@app/config');
const productData = require('@data/products.json').data;

const hydrateProduct = data => ({
  id: data.id,
  name: data.name.en,
  price: `£${data.price.gross / data.price.divisor}`,
  designer: data.brand.name.en,
  images: {
    outfit: `${config.urls.imageBase}/products/${data.id}/${data.id}_ou_sl.jpg`,
    product: `${config.urls.imageBase}/products/${data.id}/${data.id}_in_sl.jpg`,
  },
});

const sortProducts = (sort) => {
  switch (sort) {
    case 'brand':
      productData.sort((obj1, obj2) => {
        if (obj1.brand.name.en < obj2.brand.name.en) return -1;
        if (obj1.brand.name.en > obj2.brand.name.en) return 1;
        return 0;
      });
      break;
    case 'price':
      productData.sort((obj1, obj2) => obj1.price.gross - obj2.price.gross);
      break;
    default:
      break;
  }
};

module.exports = (req, res, done) => {
  const total = productData.length;
  const offset = parseInt(req.params.offset, 10) || config.pagination.defaultOffset;
  const limit = parseInt(req.params.limit, 10) || config.pagination.defaultLimit;
  const sort = req.params.sort || config.pagination.defaultSort;

  if (offset > total) {
    res.send(new restify.BadRequestError('Invalid offset'));
  } else {
    sortProducts(sort);
    res.send({
      offset,
      limit,
      total,
      sort,
      data: productData.slice(offset, offset + limit).map(data => hydrateProduct(data)),
    });
  }

  return done();
};
