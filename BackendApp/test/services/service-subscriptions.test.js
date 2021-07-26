const assert = require('assert');
const app = require('../../src/app');

describe('\'service-subscriptions\' service', () => {
  it('registered the service', () => {
    const service = app.service('service-subscriptions');

    assert.ok(service, 'Registered the service');
  });
});
