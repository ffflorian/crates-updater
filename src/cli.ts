#!/usr/bin/env node

import * as program from 'commander';
import * as fs from 'fs';
import * as path from 'path';
import * as CratesUpdater from './CratesUpdater';

const defaultPackageJsonPath = path.join(__dirname, 'package.json');
const packageJsonPath = fs.existsSync(defaultPackageJsonPath)
  ? defaultPackageJsonPath
  : path.join(__dirname, '../package.json');

const {bin, description, version} = require(packageJsonPath);

program
  .name(Object.keys(bin)[0])
  .description(description)
  .arguments('<package>')
  .arguments('[packageVersion]')
  .option('-q, --quiet', 'quiet mode. Display newer version or nothing')
  .version(version, '-v, --version')
  .parse(process.argv);

if (!program.args.length) {
  program.outputHelp();
  process.exit(1);
}

const [packageName, packageVersion] = program.args;

if (packageVersion) {
  CratesUpdater.checkForUpdate(packageName, packageVersion)
    .then(version => {
      if (program.quiet) {
        if (version) {
          console.log(version);
        }
      } else {
        const text = version
          ? `An update for ${packageName} is available: ${version}.`
          : `No update for ${packageName} available.`;
        console.log(text);
      }
    })
    .catch(error => {
      console.error(error.message);
      process.exit(1);
    });
} else {
  CratesUpdater.getLatestVersion(packageName)
    .then(version => {
      const text = program.quiet ? version.num : `Latest ${packageName} version is ${version.num}.`;
      console.log(text);
    })
    .catch(error => {
      console.error(error.message);
      process.exit(1);
    });
}
