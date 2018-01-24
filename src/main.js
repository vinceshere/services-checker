#!/usr/bin/env node

const program = require('commander');
const pkg = require('../package.json');
const checkServices = require('./CheckServices');
const servicesPackage = require('./services.json');

program
  .version(pkg.version)
  .name('services-checker')
  .usage('[options]')
  .description(pkg.description)
  .option(
    '-s, --service <service name>',
    `Services to be checked. (Default: repositories) \n
    Options: ${Object.keys(servicesPackage).join(', ')}`,
  )
  .parse(process.argv);

checkServices(program.service || 'repositories');
