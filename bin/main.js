#!/usr/bin/env node
'use strict';

var program = require('commander');
var pkg = require('../package.json');
var checkServices = require('./CheckServices');
var servicesPackage = require('./services.json');

program.version(pkg.version).name('services-checker').usage('[options]').description(pkg.description).option('-s, --service <service name>', 'Services to be checked. (Default: repositories) \n\n    Options: ' + Object.keys(servicesPackage).join(', ')).parse(process.argv);

checkServices(program.service || 'repositories');