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
    console.log(chalk.blue('Checking ' + argumentToUse + '...'));

    syncEach(servicesPackage[argumentToUse], function (item, next) {
      var spinner = ora({
        text: '',
        color: 'blue',
        spinner: 'bouncingBar'
      });

      var itemText = 'Testing ' + item.name + '...';
      spinner.start();
      requestPromise(item.url).then(function () {
        itemText += 'Status: ' + chalk.green('service working!');
        console.log(itemText);
        spinner.succeed();
      }).catch(function () {
        itemText += 'Status: ' + chalk.red('service down! :(');
        console.log(itemText);
        spinner.fail();
      }).finally(function (response) {
        spinner.stop();
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