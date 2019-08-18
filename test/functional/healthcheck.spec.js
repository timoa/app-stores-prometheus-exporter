const request = require('request');
const { expect } = require('chai');

// Server
describe('Health endpoint response', () => {
  it('should return 204', (done) => {
    request.head('http://localhost:9514', (err, res) => {
      if (err) throw err;
      expect(res.statusCode).to.equal(204);
      done();
    });
  });
});
