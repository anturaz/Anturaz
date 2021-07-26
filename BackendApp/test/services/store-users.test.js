const assert = require('assert');
const app = require('../../src/app');

describe('\'store-users\' service', () => {
  it('registered the service', () => {
    const service = app.service('store-users');

    assert.ok(service, 'Registered the service');
  });
});
