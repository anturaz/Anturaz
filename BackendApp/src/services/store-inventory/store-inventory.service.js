// Initializes the `store-inventory` service on path `/store-inventory`
const createService = require('feathers-nedb');
const createModel = require('../../models/store-inventory.model');
const hooks = require('./store-inventory.hooks');

module.exports = function(app) {
    const Model = createModel(app);
    const paginate = app.get('paginate');

    const options = {
        Model,
        paginate,
        whitelist: ['$where', '$regex']
    };

    // Initialize our service with any options it requires
    app.use('/store-inventory', createService(options));

    // Get our initialized service so that we can register hooks
    const service = app.service('store-inventory');

    service.hooks(hooks);
    service.publish(() => app.channel('authenticated', 'anonymous'))
};