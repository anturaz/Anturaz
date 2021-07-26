// Initializes the `report-sales` service on path `/report-sales`
const createService = require('feathers-nedb');
const createModel = require('../../models/report-sales.model');
const hooks = require('./report-sales.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/report-sales', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('report-sales');

  service.hooks(hooks);
};
