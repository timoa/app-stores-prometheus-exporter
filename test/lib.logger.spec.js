const { expect } = require('chai');
const logger = require('../src/lib/logger');

// Logger
describe('Logger library', () => {
  it('expect the "logger.info" to exists and be a function', (done) => {
    expect(typeof (logger.info)).to.be.equals('function');
    done();
  });
  it('expect the "logger.info" function to not throw without an argument', (done) => {
    expect(logger.info).to.not.throw();
    done();
  });
  it('expect the "logger.warn" to exists and be a function', (done) => {
    expect(typeof (logger.warn)).to.be.equals('function');
    done();
  });
  it('expect the "logger.warn" function to not throw without an argument', (done) => {
    expect(logger.warn).to.not.throw();
    done();
  });
  it('expect the "logger.error" to exists and be a function', (done) => {
    expect(typeof (logger.error)).to.be.equals('function');
    done();
  });
  it('expect the "logger.error" function to not throw without an argument', (done) => {
    expect(logger.error).to.not.throw();
    done();
  });
  it('expect the "logger.log" to exists and be a function', (done) => {
    expect(typeof (logger.log)).to.be.equals('function');
    done();
  });
  it('expect the "logger.log" function to throw without an argument', (done) => {
    expect(logger.log).to.throw();
    done();
  });
});
