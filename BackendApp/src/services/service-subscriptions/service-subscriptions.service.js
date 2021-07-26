// Initializes the `service-subscriptions` service on path `/service-subscriptions`
const createService = require('feathers-nedb');
const createModel = require('../../models/service-subscriptions.model');
const hooks = require('./service-subscriptions.hooks');

module.exports = function(app) {
    const Model = createModel(app);
    const paginate = app.get('paginate');

    const options = {
        Model,
        paginate
    };

    // Initialize our service with any options it requires
    app.use('/service-subscriptions', createService(options));

    // Get our initialized service so that we can register hooks
    const service = app.service('service-subscriptions');

    service.hooks(hooks);

    service.publish(() => app.channel('authenticated', 'anonymous'))
};