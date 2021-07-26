// Initializes the `payment_management` service on path `/payment-management`
const createService = require('feathers-nedb');
const createModel = require('../../models/payment_management.model');
const hooks = require('./payment_management.hooks');

module.exports = function(app) {
    const Model = createModel(app);
    const paginate = app.get('paginate');

    const options = {
        Model,
        paginate,
        whitelist: ['$where', '$regex']
    };

    // Initialize our service with any options it requires
    app.use('/payment-management', createService(options));

    // Get our initialized service so that we can register hooks
    const service = app.service('payment-management');

    service.hooks(hooks);
    service.publish(() => app.channel('authenticated', 'anonymous'))
};