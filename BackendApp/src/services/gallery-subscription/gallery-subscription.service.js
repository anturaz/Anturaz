// Initializes the `gallery-subscription` service on path `/gallery-subscription`
const { GallerySubscription } = require('./gallery-subscription.class');
const createModel = require('../../models/gallery-subscription.model');
const hooks = require('./gallery-subscription.hooks');

module.exports = function(app) {
    const options = {
        Model: createModel(app),
        paginate: app.get('paginate')
    };

    // Initialize our service with any options it requires
    app.use('/gallery-subscription', new GallerySubscription(options, app));

    // Get our initialized service so that we can register hooks
    const service = app.service('gallery-subscription');

    service.hooks(hooks);

    service.publish(() => app.channel('authenticated', 'anonymous'))
};