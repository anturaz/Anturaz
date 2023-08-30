const assert = require('assert');
const app = require('../../src/app');

describe('\'product-reviews\' service', () => {
  it('registered the service', () => {
    const service = app.service('product-reviews');

    assert.ok(service, 'Registered the service');
  });
});
