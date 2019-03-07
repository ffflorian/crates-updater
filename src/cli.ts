#!/usr/bin/env node

import * as program from 'commander';
import {CratesUpdater} from './CratesUpdater';

const {name, version, description}: {name: string; version: string; description: string} = require('../package.json');

program
  .name(name)
  .description(description)
  .option('-p, --package <package>', 'which package to check (required)')
  .option('-V, --package-version <version>', 'which version to check')
  .version(version, '-v, --version')
  .parse(process.argv);

if (!program.options.length || !program.package) {
  program.outputHelp();
  process.exit(1);
}

const cratesUpdater = new CratesUpdater();

if (program.package && !program.packageVersion) {
  cratesUpdater
    .getLatestVersion(program.package)
    .then(version => console.log(version.num))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });
} else {
  cratesUpdater
    .checkForUpdate(program.package, program.packageVersion)
    .then(version => {
      if (version) {
        console.log(version);
      }
    })
    .catch(error => {
      console.error(error);
      process.exit(1);
    });
}
