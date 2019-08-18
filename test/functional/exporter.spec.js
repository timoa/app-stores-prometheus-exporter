const request = require('request');
const { expect } = require('chai');

// Server
describe('Exporter endpoint response', () => {
  it('should return a valid Prometheus exporter response', (done) => {
    request.get('http://localhost:9514/metrics', (err, res, body) => {
      if (err) throw err;
      expect(res.statusCode).to.equal(200);
      expect(res.caseless.get('Content-Type')).to.equal('text/plain; version=0.0.4; charset=utf-8');
      expect(body).to.match(/(?:process)/);
      expect(body).to.match(/(?:nodejs)/);
      expect(body).to.match(/(?:appstores)/);
      done();
    });
  });
});
