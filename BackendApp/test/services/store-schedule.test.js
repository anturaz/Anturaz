const assert = require('assert');
const app = require('../../src/app');

describe('\'store-schedule\' service', () => {
  it('registered the service', () => {
    const service = app.service('store-schedule');

    assert.ok(service, 'Registered the service');
  });
});
