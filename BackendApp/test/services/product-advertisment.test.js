const assert = require('assert');
const app = require('../../src/app');

describe('\'product-advertisment\' service', () => {
  it('registered the service', () => {
    const service = app.service('product-advertisment');

    assert.ok(service, 'Registered the service');
  });
});
