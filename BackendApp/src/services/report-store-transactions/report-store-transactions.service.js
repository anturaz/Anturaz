// Initializes the `report-store-transactions` service on path `/report-store-transactions`
const createService = require('feathers-nedb');
const createModel = require('../../models/report-store-transactions.model');
const hooks = require('./report-store-transactions.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/report-store-transactions', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('report-store-transactions');

  service.hooks(hooks);
};
