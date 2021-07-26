// Initializes the `store-users` service on path `/store-users`
const createService = require('feathers-nedb');
const createModel = require('../../models/store-users.model');
const hooks = require('./store-users.hooks');

module.exports = function(app) {
    const Model = createModel(app);
    const paginate = app.get('paginate');

    const options = {
        Model,
        paginate,
        whitelist: ['$where', '$regex']
    };

    // Initialize our service with any options it requires
    app.use('/store-users', createService(options));

    // Get our initialized service so that we can register hooks
    const service = app.service('store-users');

    service.hooks(hooks);
    service.publish(() => app.channel('authenticated', 'anonymous'))
};