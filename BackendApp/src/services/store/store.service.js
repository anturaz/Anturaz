// Initializes the `store` service on path `/store`
const createService = require('feathers-nedb');
const createModel = require('../../models/store.model');
const hooks = require('./store.hooks');

module.exports = function(app) {
    const Model = createModel(app);
    const paginate = app.get('paginate');

    const options = {
        Model,
        paginate,
        whitelist: ['$where', '$regex']
    };

    // Initialize our service with any options it requires
    app.use('/store', createService(options));

    // Get our initialized service so that we can register hooks
    const service = app.service('store');

    service.hooks(hooks);
    service.publish(() => app.channel('authenticated', 'anonymous'))
};