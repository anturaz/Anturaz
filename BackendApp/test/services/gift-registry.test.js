const assert = require('assert');
const app = require('../../src/app');

describe('\'gift-registry\' service', () => {
  it('registered the service', () => {
    const service = app.service('gift-registry');

    assert.ok(service, 'Registered the service');
  });
});
