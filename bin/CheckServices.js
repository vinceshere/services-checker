'use strict';

var _ = require('lodash');
var requestPromise = require('request-promise');
var syncEach = require('sync-each');
var chalk = require('chalk');
var ora = require('ora');
var servicesPackage = require('./services.json');

function checkServices(argument) {
  var options = Object.keys(servicesPackage);
  var argumentToUse = argument || 'repositories';
  var testArgument = _.some(options, function (item) {
    return item === argumentToUse;
  });

  if (testArgument) {
    console.log(chalk.blue('Checking ' + argumentToUse + '...\n'));

    syncEach(servicesPackage[argumentToUse], function (item, next) {
      var spinner = ora({
        text: 'Testing ' + chalk.bold(item.name) + ':',
        color: 'blue',
        spinner: 'dots'
      });

      spinner.start();

      requestPromise(item.url).then(function () {
        spinner.text = 'Testing ' + chalk.bold(item.name) + ': ' + chalk.green('service working! :)');
        spinner.succeed();
      }).catch(function () {
        spinner.text = 'Testing ' + chalk.bold(item.name) + ': ' + chalk.red('service down! :(');
        spinner.error();
      }).finally(function (response) {
        next(response);
      });
    }, function () {
      console.log('\n\n');
    });
  } else {
    console.log(chalk.red('Invalid option ' + argumentToUse + '. Try one of these: ' + options.join(', ')));
  }
}

module.exports = checkServices;