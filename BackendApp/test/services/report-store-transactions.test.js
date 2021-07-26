const assert = require('assert');
const app = require('../../src/app');

describe('\'report-store-transactions\' service', () => {
  it('registered the service', () => {
    const service = app.service('report-store-transactions');

    assert.ok(service, 'Registered the service');
  });
});
