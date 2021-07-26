// Application hooks that run for every service
const log = require('./hooks/log');
const search = require('feathers-nedb-fuzzy-search')

module.exports = {
    before: {
        all: [log()],
        find: search(),
        get: [],
        create: [],
        update: [],
        patch: [],
        remove: []
    },

    after: {
        all: [log()],
        find: [],
        get: [],
        create: [],
        update: [],
        patch: [],
        remove: []
    },

    error: {
        all: [log()],
        find: [],
        get: [],
        create: [],
        update: [],
        patch: [],
        remove: []
    }
};