const assert = require('assert');
const app = require('../../src/app');

describe('\'social_media_management\' service', () => {
  it('registered the service', () => {
    const service = app.service('social-media-management');

    assert.ok(service, 'Registered the service');
  });
});
