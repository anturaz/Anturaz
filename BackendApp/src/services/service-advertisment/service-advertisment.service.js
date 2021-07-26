// Initializes the `service-advertisment` service on path `/service-advertisment`
const createService = require('feathers-nedb');
const createModel = require('../../models/service-advertisment.model');
const hooks = require('./service-advertisment.hooks');

module.exports = function(app) {
    const Model = createModel(app);
    const paginate = app.get('paginate');

    const options = {
        Model,
        paginate
    };

    // Initialize our service with any options it requires
    app.use('/service-advertisment', createService(options));

    // Get our initialized service so that we can register hooks
    const service = app.service('service-advertisment');

    service.hooks(hooks);
    service.publish(() => app.channel('authenticated','anonymous'))
};