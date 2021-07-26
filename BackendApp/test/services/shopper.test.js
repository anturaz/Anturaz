const assert = require('assert');
const app = require('../../src/app');

describe('\'shopper\' service', () => {
  it('registered the service', () => {
    const service = app.service('shopper');

    assert.ok(service, 'Registered the service');
  });
});
