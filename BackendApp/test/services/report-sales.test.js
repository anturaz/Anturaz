const assert = require('assert');
const app = require('../../src/app');

describe('\'report-sales\' service', () => {
  it('registered the service', () => {
    const service = app.service('report-sales');

    assert.ok(service, 'Registered the service');
  });
});
