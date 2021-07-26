// Initializes the `product-subscriptions` service on path `/product-subscriptions`
const createService = require('feathers-nedb');
const createModel = require('../../models/product-subscriptions.model');
const hooks = require('./product-subscriptions.hooks');

module.exports = function(app) {
    const Model = createModel(app);
    const paginate = app.get('paginate');

    const options = {
        Model,
        paginate
    };

    // Initialize our service with any options it requires
    app.use('/product-subscriptions', createService(options));

    // Get our initialized service so that we can register hooks
    const service = app.service('product-subscriptions');

    service.hooks(hooks);

    service.publish(() => app.channel('authenticated', 'anonymous'))
};