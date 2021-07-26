const assert = require('assert');
const app = require('../../src/app');

describe('\'store-fuel-delivery\' service', () => {
  it('registered the service', () => {
    const service = app.service('store-fuel-delivery');

    assert.ok(service, 'Registered the service');
  });
});
