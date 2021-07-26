// Initializes the `store-schedule` service on path `/store-schedule`
const createService = require('feathers-nedb');
const createModel = require('../../models/store-schedule.model');
const hooks = require('./store-schedule.hooks');

module.exports = function(app) {
    const Model = createModel(app);
    const paginate = app.get('paginate');

    const options = {
        Model,
        paginate,
        whitelist: ['$where', '$regex']
    };

    // Initialize our service with any options it requires
    app.use('/store-schedule', createService(options));

    // Get our initialized service so that we can register hooks
    const service = app.service('store-schedule');

    service.hooks(hooks);
    service.publish(() => app.channel('authenticated', 'anonymous'))
};