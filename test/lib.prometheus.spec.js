const { expect } = require('chai');
const prometheus = require('../src/lib/prometheus');

// Prometheus
describe('Prometheus library', () => {
  describe('init()', () => {
    it('expect the "prometheus.init()" to exists and be a function', (done) => {
      expect(typeof (prometheus.init)).to.be.equals('function');
      done();
    });
    it('expect the "prometheus.init()" function to not throw', (done) => {
      expect(prometheus.init).to.not.throw();
      done();
    });
  });

  describe('getMetrics()', () => {
    it('expect the "prometheus.getMetrics()" to exists and be a function', (done) => {
      expect(typeof (prometheus.getMetrics)).to.be.equals('function');
      done();
    });
    it('expect the "prometheus.getMetric()" function to not throw', (done) => {
      expect(prometheus.getMetrics).to.not.throw();
      done();
    });
  });

  describe('getContentType', () => {
    it('expect the "prometheus.getContentType" to exists and be a string', (done) => {
      expect(typeof (prometheus.getContentType)).to.be.equals('string');
      done();
    });
    it('expect the "prometheus.getContentType" to return the Prometheus Exporter content-type', (done) => {
      expect(prometheus.getContentType).to.be.equals('text/plain; version=0.0.4; charset=utf-8');
      done();
    });
  });
});
