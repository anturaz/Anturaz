// Initializes the `product-advertisment` service on path `/product-advertisment`
const createService = require('feathers-nedb');
const createModel = require('../../models/product-advertisment.model');
const hooks = require('./product-advertisment.hooks');

module.exports = function(app) {
    const Model = createModel(app);
    const paginate = app.get('paginate');

    const options = {
        Model,
        paginate
    };

    // Initialize our service with any options it requires
    app.use('/product-advertisment', createService(options));

    // Get our initialized service so that we can register hooks
    const service = app.service('product-advertisment');

    service.hooks(hooks);
    service.publish(() => app.channel('authenticated','anonymous'))
};