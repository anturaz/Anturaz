const assert = require('assert');
const app = require('../../src/app');

describe('\'payment_management\' service', () => {
  it('registered the service', () => {
    const service = app.service('payment-management');

    assert.ok(service, 'Registered the service');
  });
});
