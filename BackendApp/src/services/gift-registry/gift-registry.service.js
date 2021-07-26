// Initializes the `gift-registry` service on path `/gift-registry`
const createService = require('feathers-nedb');
const createModel = require('../../models/gift-registry.model');
const hooks = require('./gift-registry.hooks');

module.exports = function(app) {
    const Model = createModel(app);
    const paginate = app.get('paginate');

    const options = {
        Model,
        paginate
    };

    // Initialize our service with any options it requires
    app.use('/gift-registry', createService(options));

    // Get our initialized service so that we can register hooks
    const service = app.service('gift-registry');

    service.hooks(hooks);
    service.publish(() => app.channel('authenticated', 'anonymous'))
};