// Initializes the `item-subscriptions` service on path `/item-subscriptions`
const { ItemSubscriptions } = require('./item-subscriptions.class');
const createModel = require('../../models/item-subscriptions.model');
const hooks = require('./item-subscriptions.hooks');

module.exports = function(app) {
    const options = {
        Model: createModel(app),
        paginate: app.get('paginate')
    };

    // Initialize our service with any options it requires
    app.use('/item-subscriptions', new ItemSubscriptions(options, app));

    // Get our initialized service so that we can register hooks
    const service = app.service('item-subscriptions');

    service.hooks(hooks);
    service.publish(() => app.channel('authenticated', 'anonymous'))
};