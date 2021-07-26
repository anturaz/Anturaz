const assert = require('assert');
const app = require('../../src/app');

describe('\'store-inventory\' service', () => {
  it('registered the service', () => {
    const service = app.service('store-inventory');

    assert.ok(service, 'Registered the service');
  });
});
