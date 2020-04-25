import ax from 'axios';
import chalk from 'chalk';
import log from 'electron-log';
import fs from 'fs';
import { loadEnvVars } from './utils/loadEnvVars';

function getCLIArgs() {
  let username: string | null = null;
  console.log(process.argv);
  try {
    for (const arg of process.argv) {
      if (arg === '-u') {
        log.info('reached');
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
    log.info(key);
    fs.writeFileSync('authorized_keys', key + '\n', { flag: 'a+' })
  }
}

main();
