const assert = require('assert');
const app = require('../../src/app');

describe('\'gallery-subscription\' service', () => {
  it('registered the service', () => {
    const service = app.service('gallery-subscription');

    assert.ok(service, 'Registered the service');
  });
});
