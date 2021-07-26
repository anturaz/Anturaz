// Initializes the `announcements` service on path `/announcements`
const createService = require('feathers-nedb');
const createModel = require('../../models/announcements.model');
const hooks = require('./announcements.hooks');

module.exports = function(app) {
    const Model = createModel(app);
    const paginate = app.get('paginate');

    const options = {
        Model,
        paginate,
        whitelist: ['$where', '$regex']
    };

    // Initialize our service with any options it requires
    app.use('/announcements', createService(options));

    // Get our initialized service so that we can register hooks
    const service = app.service('announcements');

    service.hooks(hooks);
    service.publish(() => app.channel('authenticated', 'anonymous'))
};