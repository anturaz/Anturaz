const assert = require('assert');
const app = require('../../src/app');

describe('\'product-transactions\' service', () => {
  it('registered the service', () => {
    const service = app.service('product-transactions');

    assert.ok(service, 'Registered the service');
  });
});
