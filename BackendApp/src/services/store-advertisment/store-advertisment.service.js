// Initializes the `store-advertisment` service on path `/store-advertisment`
const createService = require('feathers-nedb');
const createModel = require('../../models/store-advertisment.model');
const hooks = require('./store-advertisment.hooks');

module.exports = function(app) {
    const Model = createModel(app);
    const paginate = app.get('paginate');

    const options = {
        Model,
        paginate,
        whitelist: ['$where', '$regex']
    };

    // Initialize our service with any options it requires
    app.use('/store-advertisment', createService(options));

    // Get our initialized service so that we can register hooks
    const service = app.service('store-advertisment');

    service.hooks(hooks);
    service.publish(() => app.channel('authenticated', 'anonymous'))
};