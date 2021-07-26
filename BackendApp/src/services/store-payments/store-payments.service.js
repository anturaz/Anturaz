// Initializes the `store-payments` service on path `/store-payments`
const createService = require('feathers-nedb');
const createModel = require('../../models/store-payments.model');
const hooks = require('./store-payments.hooks');

module.exports = function(app) {
    const Model = createModel(app);
    const paginate = app.get('paginate');

    const options = {
        Model,
        paginate,
        whitelist: ['$where', '$regex']
    };

    // Initialize our service with any options it requires
    app.use('/store-payments', createService(options));

    // Get our initialized service so that we can register hooks
    const service = app.service('store-payments');

    service.hooks(hooks);
    service.publish(() => app.channel('authenticated', 'anonymous'))
};