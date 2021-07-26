const assert = require('assert');
const app = require('../../src/app');

describe('\'store\' service', () => {
  it('registered the service', () => {
    const service = app.service('store');

    assert.ok(service, 'Registered the service');
  });
});
