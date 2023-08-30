const { authenticate } = require("@feathersjs/authentication").hooks;
const fuzzySearch = require("feathers-nedb-fuzzy-search");

module.exports = {
  before: {
    all: [],
    find: search({
      fields: ["search.this.path", "this.path.too", "title"],
      deep: true,
      fuzzyDiacritics: false,
    }),
    get: [],
    create: [authenticate("jwt")],
    update: [authenticate("jwt")],
    patch: [authenticate("jwt")],
    remove: [authenticate("jwt")],
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
