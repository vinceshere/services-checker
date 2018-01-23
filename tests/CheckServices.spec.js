const nock = require('nock');
const chalk = require('chalk');
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const expect = chai.expect;

chai.use(sinonChai);

const checkServices = require('../src/CheckServices');
const services = require('../src/services.json');

describe("CheckServices", () => {
  let consoleStub;

  const options = Object.keys(services);
  const mockedResponse = {
    "status": "success",
    "status": 200,
  };

  beforeEach(() => {
    consoleStub = sinon.stub(console, 'log');
  });

  afterEach(() => {
    console.log.restore();
  });

  it("should return error when called with a non existing option", (done) => {
    checkServices('brainfuck');

    setTimeout(() => {
      expect(consoleStub).to.have.been.calledWithMatch(`Invalid option brainfuck. Try one of these: ${options.join(', ')}`);
      done();
    }, 300);
  });

  it("should use `repositories` value for environment parameter when called empty", (done) => {
    const requestResult = nock('https://www.npmjs.com')
      .get('/package/npm')
      .query({ test: 'test' })
      .reply(200, mockedResponse);

    checkServices();

    setTimeout(() => {
      expect(consoleStub).to.have.been.calledWithMatch(`Checking repositories...`);
      done();
    }, 300);
  });


});
