// Initializes the `shopper` service on path `/shopper`
const createService = require('feathers-nedb');
const createModel = require('../../models/shopper.model');
const hooks = require('./shopper.hooks');

module.exports = function(app) {
    const Model = createModel(app);
    const paginate = app.get('paginate');

    const options = {
        Model,
        paginate,
        whitelist: ['$where', '$regex']
    };

    // Initialize our service with any options it requires
    app.use('/shopper', createService(options));

    // Get our initialized service so that we can register hooks
    const service = app.service('shopper');

    service.hooks(hooks);
    service.publish(() => app.channel('authenticated', 'anonymous'))
};