// Initializes the `systemuser` service on path `/systemuser`
const createService = require('feathers-nedb');
const createModel = require('../../models/systemuser.model');
const hooks = require('./systemuser.hooks');

module.exports = function(app) {
    const Model = createModel(app);
    const paginate = app.get('paginate');

    const options = {
        Model,
        paginate,
        whitelist: ['$where', '$regex']
    };

    // Initialize our service with any options it requires
    app.use('/systemuser', createService(options));

    // Get our initialized service so that we can register hooks
    const service = app.service('systemuser');

    service.hooks(hooks);
    service.publish(() => app.channel('authenticated', 'anonymous'))
};