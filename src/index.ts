import ax from 'axios';
import chalk from 'chalk';
import log from 'electron-log';
import fs from 'fs';
import { loadEnvVars } from './utils/loadEnvVars';

function getCLIArgs() {
  let username: string | null = null;
  try {
    for (const arg of process.argv) {
      if (arg === '-u') {
        username = process.argv[process.argv.indexOf('-u') + 1]
      }
    }
  } catch(error) {
    log.warn(error);
    process.exit(1);
  }

  if (!username) {
    log.warn(`No username supplied. Syntax: ${chalk.yellow.bold('-u username')}`)
    process.exit(1);
  }

  return [ username ];
}

async function main() {
  loadEnvVars();
  const [ userName ] = getCLIArgs()
  const res = await ax.get(`https://api.github.com/users/${userName}/keys`)
  for (const key of res.data.map((item: any) => (item.key))) {
    fs.writeFileSync('authorized_keys', key + '\n', { flag: 'a+' })
  }
  log.info('File written to authorized_keys in this project directory.')
}

main();
