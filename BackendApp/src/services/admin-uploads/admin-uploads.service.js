// Initializes the `admin-uploads` service on path `/admin-uploads`
const createService = require('feathers-nedb');
const createModel = require('../../models/admin-uploads.model');
const hooks = require('./admin-uploads.hooks');

module.exports = function(app) {
    const Model = createModel(app);
    const paginate = app.get('paginate');

    const options = {
        Model,
        paginate,
        whitelist: ['$where', '$regex']
    };

    // Initialize our service with any options it requires
    app.use('/admin-uploads', createService(options));

    // Get our initialized service so that we can register hooks
    const service = app.service('admin-uploads');

    service.hooks(hooks);
    service.publish(() => app.channel('authenticated', 'anonymous'))
};