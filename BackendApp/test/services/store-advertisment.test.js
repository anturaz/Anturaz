const assert = require('assert');
const app = require('../../src/app');

describe('\'store-advertisment\' service', () => {
  it('registered the service', () => {
    const service = app.service('store-advertisment');

    assert.ok(service, 'Registered the service');
  });
});
