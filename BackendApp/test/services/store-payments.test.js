const assert = require('assert');
const app = require('../../src/app');

describe('\'store-payments\' service', () => {
  it('registered the service', () => {
    const service = app.service('store-payments');

    assert.ok(service, 'Registered the service');
  });
});
