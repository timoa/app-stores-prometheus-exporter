const chai = require('chai');
const chaiHttp = require('chai-http');
const exporter = require('../src/exporter');

const { expect } = chai;

// Load the Chai HTTP plugin
chai.use(chaiHttp);

// Exporter
// eslint-disable-next-line func-names
describe('Exporter', function () {
  this.timeout(6000);

  it('it should returns a valid Prometheus Exporter response', (done) => {
    chai.request(exporter)
      .get('/metrics')
      .end((err, res) => {
        expect(res.status).to.have.be.equals(200);
        expect(res.header['content-type']).to.equal('text/plain; version=0.0.4; charset=utf-8');
        // expect(res.text).to.be.a('string');
        expect(res.text).to.match(/(?:process)/);
        expect(res.text).to.match(/(?:nodejs)/);
        expect(res.text).to.match(/(?:appstores)/);
        done();
      });
  });

  it('it should returns a 404 status code', (done) => {
    chai.request(exporter)
      .get('/')
      .end((err, res) => {
        expect(res.status).to.have.be.equals(404);
        expect(res.header['content-type']).to.equal('text/html');
        done();
      });
  });

  it('it should returns a 204 status code', (done) => {
    chai.request(exporter)
      .head('/health')
      .end((err, res) => {
        expect(res.status).to.have.be.equals(204);
        expect(res.header['content-type']).to.equal('text/html');
        done();
      });
  });

  it('it should returns a 204 status code', (done) => {
    chai.request(exporter)
      .get('/health')
      .end((err, res) => {
        expect(res.status).to.have.be.equals(204);
        expect(res.header['content-type']).to.equal('text/html');
        done();
      });
  });
});
