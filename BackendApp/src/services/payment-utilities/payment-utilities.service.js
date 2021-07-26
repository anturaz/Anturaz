// Initializes the `payment-utilities` service on path `/payment-utilities`
const createService = require('feathers-nedb');
const createModel = require('../../models/payment-utilities.model');
const hooks = require('./payment-utilities.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/payment-utilities', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('payment-utilities');

  service.hooks(hooks);
};
