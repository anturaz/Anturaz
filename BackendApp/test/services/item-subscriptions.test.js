const assert = require('assert');
const app = require('../../src/app');

describe('\'item-subscriptions\' service', () => {
  it('registered the service', () => {
    const service = app.service('item-subscriptions');

    assert.ok(service, 'Registered the service');
  });
});
