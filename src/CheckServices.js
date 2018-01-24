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
    console.log(chalk.blue(`Checking ${argumentToUse}...\n`));

    syncEach(
      servicesPackage[argumentToUse],
      (item, next) => {
        const spinner = ora({
          text: `Testing ${chalk.bold(item.name)}:`,
          color: 'blue',
          spinner: 'dots',
        });

        spinner.start();

        requestPromise(item.url)
          .then(() => {
            spinner.text = `Testing ${chalk.bold(item.name)}: ${chalk.green('service working! :)')}`;
            spinner.succeed();
          }).catch(() => {
            spinner.text = `Testing ${chalk.bold(item.name)}: ${chalk.red('service down! :(')}`;
            spinner.error();
          }).finally((response) => {
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
