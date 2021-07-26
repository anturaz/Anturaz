const assert = require('assert');
const app = require('../../src/app');

describe('\'featured-photos\' service', () => {
  it('registered the service', () => {
    const service = app.service('featured-photos');

    assert.ok(service, 'Registered the service');
  });
});
