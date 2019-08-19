const request = require('request');
const { expect } = require('chai');

// Server
describe('Exporter endpoint response', () => {
  it('should return a valid Prometheus exporter response on `/metrics`', (done) => {
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
  it('should return 404', (done) => {
    request.get('http://localhost:9514', (err, res) => {
      if (err) throw err;
      expect(res.statusCode).to.equal(404);
      done();
    });
  });
  it('should return 204', (done) => {
    request.head('http://localhost:9514', (err, res) => {
      if (err) throw err;
      expect(res.statusCode).to.equal(204);
      done();
    });
  });
});
