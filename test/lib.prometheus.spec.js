const chai = require('chai');

const { expect } = chai;
const chaiAsPromised = require('chai-as-promised');

const prometheus = require('../src/lib/prometheus');

// Load the Chai plugins
chai.use(chaiAsPromised);

// Prometheus
describe('Prometheus library', () => {
  describe('init()', () => {
    it('expect the "prometheus.init()" to exists and be a function', () => expect(typeof prometheus.init).to.be.equals('function'));
    it('expect the "prometheus.init()" function to not throw', () => expect(prometheus.init).to.not.throw());
  });

  describe('getMetrics()', () => {
    it('expect the "prometheus.getMetrics()" to exists and be a function', () => expect(typeof prometheus.getMetrics).to.be.equals('function'));
    it('expect the "prometheus.getMetrics()" function to not throw', () => expect(prometheus.getMetrics).to.not.throw());
    it('expect the "prometheus.getMetrics()" function to resolves as promised', () => expect(Promise.resolve(prometheus.getMetrics)).to.be.fulfilled);
    it('expect the "prometheus.getMetrics()" function to rejects as promised', () => expect(Promise.reject(prometheus.getMetrics)).to.be.rejected);
  });

  describe('getContentType()', () => {
    it('expect the "prometheus.getContentType()" to exists and be a string', () => expect(typeof prometheus.getContentType).to.be.equals('string'));
    it('expect the "prometheus.getContentType()" to return the Prometheus Exporter content-type', () => expect(prometheus.getContentType).to.be.equals(
      'text/plain; version=0.0.4; charset=utf-8',
    ));
  });
});
