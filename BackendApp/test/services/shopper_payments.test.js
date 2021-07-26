const assert = require('assert');
const app = require('../../src/app');

describe('\'shopper_payments\' service', () => {
  it('registered the service', () => {
    const service = app.service('shopper-payments');

    assert.ok(service, 'Registered the service');
  });
});
