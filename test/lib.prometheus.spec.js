const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');

const prometheus = require('../src/lib/prometheus');

// Load the Chai plugins
chai.use(chaiAsPromised);

// Prometheus
describe('Prometheus library', () => {
  describe('init()', () => {
    it('expect the "prometheus.init()" to exists and be a function', () => {
      return expect(typeof (prometheus.init)).to.be.equals('function');
    });
    it('expect the "prometheus.init()" function to not throw', () => {
      return expect(prometheus.init).to.not.throw();
    });
  });

  describe('getMetrics()', () => {
    it('expect the "prometheus.getMetrics()" to exists and be a function', () => {
      return expect(typeof (prometheus.getMetrics)).to.be.equals('function');
    });
    it('expect the "prometheus.getMetric()" function to not throw', () => {
      return expect(prometheus.getMetrics).to.not.throw();
    });
    it('expect the "prometheus.getMetric()" function to resolves as promised', () => {
      return expect(Promise.resolve(prometheus.getMetrics)).to.be.fulfilled;
    });
    it('expect the "prometheus.getMetric()" function to rejects as promised', () => {
      return expect(Promise.reject(prometheus.getMetrics)).to.be.rejected;
    });
  });

  describe('getContentType()', () => {
    it('expect the "prometheus.getContentType()" to exists and be a string', () => {
      return expect(typeof (prometheus.getContentType)).to.be.equals('string');
    });
    it('expect the "prometheus.getContentType()" to return the Prometheus Exporter content-type', () => {
      return expect(prometheus.getContentType).to.be.equals('text/plain; version=0.0.4; charset=utf-8');
    });
  });
});
