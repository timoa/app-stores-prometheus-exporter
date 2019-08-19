const chai = require('chai');
const chaiHttp = require('chai-http');
const exporter = require('../src/exporter');

const should = chai.should(); // eslint-disable-line

// Load the Chai HTTP plugin
chai.use(chaiHttp);

// Exporter
describe('Exporter', () => {
  it('it should returns a valid Prometheus Exporter response', (done) => {
    chai.request(exporter)
      .get('/metrics')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it('it should returns a 404 status code', (done) => {
    chai.request(exporter)
      .get('/')
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });

  it('it should returns a 204 status code', (done) => {
    chai.request(exporter)
      .head('/')
      .end((err, res) => {
        res.should.have.status(204);
        done();
      });
  });
});
