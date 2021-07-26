// Initializes the `featured-photos` service on path `/featured-photos`
const createService = require('feathers-nedb');
const createModel = require('../../models/featured-photos.model');
const hooks = require('./featured-photos.hooks');

module.exports = function(app) {
    const Model = createModel(app);
    const paginate = app.get('paginate');

    const options = {
        Model,
        paginate,
        whitelist: ['$where', '$regex']
    };

    // Initialize our service with any options it requires
    app.use('/featured-photos', createService(options));

    // Get our initialized service so that we can register hooks
    const service = app.service('featured-photos');

    service.hooks(hooks);
    service.publish(() => app.channel('authenticated', 'anonymous'))
};