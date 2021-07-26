// Initializes the `social_media_management` service on path `/social-media-management`
const createService = require('feathers-nedb');
const createModel = require('../../models/social_media_management.model');
const hooks = require('./social_media_management.hooks');

module.exports = function(app) {
    const Model = createModel(app);
    const paginate = app.get('paginate');

    const options = {
        Model,
        paginate,
        whitelist: ['$where', '$regex']
    };

    // Initialize our service with any options it requires
    app.use('/social-media-management', createService(options));

    // Get our initialized service so that we can register hooks
    const service = app.service('social-media-management');

    service.hooks(hooks);
    service.publish(() => app.channel('authenticated', 'anonymous'))
};