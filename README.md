# crates-updater [![Build Status](https://action-badges.now.sh/ffflorian/crates-updater)](https://github.com/ffflorian/crates-updater/actions/) [![npm version](https://img.shields.io/npm/v/crates-updater.svg?style=flat)](https://www.npmjs.com/package/crates-updater) [![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=ffflorian/crates-updater)](https://dependabot.com)

Check your [Rust packages](https://crates.io) for updates.

## Installation

Run `yarn global add crates-updater` or `npm i -g crates-updater`.

## Usage

```
Usage: crates-updater [options]

Check your Rust packages for updates.

Options:
  -p, --package <package>          which package to check (required)
  -V, --package-version <version>  which version to check
  -v, --version                    output the version number
  -h, --help                       output usage information
```

## Examples

```shell
# returns either a newer version or nothing
crates-updater -p ripgrep -V 0.9.0

# returns the latest version
crates-updater -p ripgrep
```
