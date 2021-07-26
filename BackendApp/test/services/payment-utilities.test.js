const assert = require('assert');
const app = require('../../src/app');

describe('\'payment-utilities\' service', () => {
  it('registered the service', () => {
    const service = app.service('payment-utilities');

    assert.ok(service, 'Registered the service');
  });
});
