// Initializes the `shopper_payments` service on path `/shopper-payments`
const { ShopperPayments } = require('./shopper_payments.class');
const createModel = require('../../models/shopper_payments.model');
const hooks = require('./shopper_payments.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/shopper-payments', new ShopperPayments(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('shopper-payments');

  service.hooks(hooks);
  service.publish(() => app.channel('authenticated', 'anonymous'))
};
