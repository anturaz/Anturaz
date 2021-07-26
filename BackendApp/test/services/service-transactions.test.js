const assert = require('assert');
const app = require('../../src/app');

describe('\'service-transactions\' service', () => {
  it('registered the service', () => {
    const service = app.service('service-transactions');

    assert.ok(service, 'Registered the service');
  });
});
