// Initializes the `product-reviews` service on path `/product-reviews`
const { ProductReviews } = require('./product-reviews.class');
const createModel = require('../../models/product-reviews.model');
const hooks = require('./product-reviews.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/product-reviews', new ProductReviews(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('product-reviews');

  service.hooks(hooks);
};
