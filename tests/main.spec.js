const expect = require('chai').expect;
const exec = require("child_process").exec;
const servicesChecker = './src/main.js';
const pkg = require('../package.json');
const services = require('../src/services.json');

describe("Main CLI", () => {
  const options = Object.keys(services);

  it("should return the correct version of the CLI", (done) => {
    exec(`${servicesChecker} --version`, (err, stdout, stderr) => {
      if (err) throw err;
      expect(stdout.replace('\n', '')).to.be.equal(pkg.version);
      done();
    });
  });

  it("should return the description when run services-checker --help", (done) => {
    exec(`${servicesChecker} --help`, (err, stdout, stderr) => {
      if (err) throw err;
      expect(stdout.includes(pkg.description)).to.be.true;
      done();
    });
  });

  it("should return error when the argument environment (-E) is invalid", (done) => {
    exec(`${servicesChecker} -s brainfuck`, (err, stdout, stderr) => {
      if (err) throw err;
      expect(stdout.includes('Invalid option brainfuck.')).to.be.true;
      done();
    });
  });
});
