// Initializes the `service-transactions` service on path `/service-transactions`
const { ServiceTransactions } = require('./service-transactions.class');
const createModel = require('../../models/service-transactions.model');
const hooks = require('./service-transactions.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/service-transactions', new ServiceTransactions(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('service-transactions');

  service.hooks(hooks);
  service.publish(() => app.channel('authenticated', 'anonymous'))
};
