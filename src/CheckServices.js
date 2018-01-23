const _ = require('lodash');
const requestPromise = require('request-promise');
const syncEach = require('sync-each');
const chalk = require('chalk');
const ora = require('ora');
const servicesPackage = require('./services.json');

function checkServices(argument) {
  const options = Object.keys(servicesPackage);
  const argumentToUse = argument || 'repositories';
  const testArgument = _.some(options, item => item === argumentToUse);

  if (testArgument) {
    console.log(chalk.blue(`Checking ${argumentToUse}...`));

    syncEach(
      servicesPackage[argumentToUse],
      (item, next) => {
        const spinner = ora({
          text: '',
          color: 'blue',
          spinner: 'bouncingBar',
        });

        let itemText = `Testing ${item.name}...`;
        spinner.start();
        requestPromise(item.url)
          .then(() => {
            itemText += `Status: ${chalk.green('service working!')}`;
            console.log(itemText);
            spinner.succeed();
          }).catch(() => {
            itemText += `Status: ${chalk.red('service down! :(')}`;
            console.log(itemText);
            spinner.fail();
          }).finally((response) => {
            spinner.stop();
            next(response);
          });
      }, () => {
        console.log('\n\n');
      },
    );
  } else {
    console.log(chalk.red(`Invalid option ${argumentToUse}. Try one of these: ${options.join(', ')}`));
  }
}

module.exports = checkServices;
