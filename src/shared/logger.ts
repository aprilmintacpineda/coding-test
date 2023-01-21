import chalk from 'chalk';

function log (...args: any[]) {
  console.log('----', ...args);
}

export function logOutput (...args: any[]) {
  console.log(chalk.bold.magenta('>>'), ...args);
}

export function logInfo (...args: any[]) {
  log(chalk.bold.blue('INFO:'), ...args);
}

export function logError (...args: any[]) {
  log(chalk.bold.red('ERROR:'), ...args);
}
