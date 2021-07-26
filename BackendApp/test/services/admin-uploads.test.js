const assert = require('assert');
const app = require('../../src/app');

describe('\'admin-uploads\' service', () => {
  it('registered the service', () => {
    const service = app.service('admin-uploads');

    assert.ok(service, 'Registered the service');
  });
});
