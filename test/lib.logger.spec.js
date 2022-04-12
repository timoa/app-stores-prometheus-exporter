const { expect } = require('chai');
const logger = require('../src/lib/logger');

// Logger
describe('Logger library', () => {
  describe('info()', () => {
    it('expect the "logger.info()" to exists and be a function', () => {
      return expect(typeof (logger.info)).to.be.equals('function');
    });
    it('expect the "logger.info()" function to not throw without an argument', () => {
      return expect(logger.info).to.not.throw();
    });
  });

  describe('warn()', () => {
    it('expect the "logger.warn()" to exists and be a function', () => {
      return expect(typeof (logger.warn)).to.be.equals('function');
    });
    it('expect the "logger.warn()" function to not throw without an argument', () => {
      return expect(logger.warn).to.not.throw();
    });
  });

  describe('error()', () => {
    it('expect the "logger.error()" to exists and be a function', () => {
      return expect(typeof (logger.error)).to.be.equals('function');
    });
    it('expect the "logger.error()" function to not throw without an argument', () => {
      return expect(logger.error).to.not.throw();
    });
  });

  describe('log()', () => {
    it('expect the "logger.log()" to exists and be a function', () => {
      return expect(typeof (logger.log)).to.be.equals('function');
    });
    it('expect the "logger.log()" function to throw without an argument', () => {
      return expect(logger.log).to.throw();
    });
  });
});
