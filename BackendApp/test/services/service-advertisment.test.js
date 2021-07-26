const assert = require('assert');
const app = require('../../src/app');

describe('\'service-advertisment\' service', () => {
  it('registered the service', () => {
    const service = app.service('service-advertisment');

    assert.ok(service, 'Registered the service');
  });
});
