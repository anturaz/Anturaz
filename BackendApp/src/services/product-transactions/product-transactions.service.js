// Initializes the `product-transactions` service on path `/product-transactions`
const { ProductTransactions } = require('./product-transactions.class');
const createModel = require('../../models/product-transactions.model');
const hooks = require('./product-transactions.hooks');

module.exports = function(app) {
    const options = {
        Model: createModel(app),
        paginate: app.get('paginate'),

        whitelist: ['$where', '$regex']
    };

    // Initialize our service with any options it requires
    app.use('/product-transactions', new ProductTransactions(options, app));

    // Get our initialized service so that we can register hooks
    const service = app.service('product-transactions');

    service.hooks(hooks);
    service.publish(() => app.channel('authenticated', 'anonymous'))
};