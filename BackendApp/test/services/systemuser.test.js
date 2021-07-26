const assert = require('assert');
const app = require('../../src/app');

describe('\'systemuser\' service', () => {
  it('registered the service', () => {
    const service = app.service('systemuser');

    assert.ok(service, 'Registered the service');
  });
});
