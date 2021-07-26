// Initializes the `store-fuel-delivery` service on path `/store-fuel-delivery`
const createService = require('feathers-nedb');
const createModel = require('../../models/store-fuel-delivery.model');
const hooks = require('./store-fuel-delivery.hooks');

module.exports = function(app) {
    const Model = createModel(app);
    const paginate = app.get('paginate');

    const options = {
        Model,
        paginate,
        whitelist: ['$where', '$regex']
    };

    // Initialize our service with any options it requires
    app.use('/store-fuel-delivery', createService(options));

    // Get our initialized service so that we can register hooks
    const service = app.service('store-fuel-delivery');

    service.hooks(hooks);
    service.publish(() => app.channel('authenticated', 'anonymous'))
};