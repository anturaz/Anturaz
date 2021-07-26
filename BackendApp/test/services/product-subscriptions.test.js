const assert = require('assert');
const app = require('../../src/app');

describe('\'product-subscriptions\' service', () => {
  it('registered the service', () => {
    const service = app.service('product-subscriptions');

    assert.ok(service, 'Registered the service');
  });
});
