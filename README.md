# crates-updater [![Build Status](https://github.com/ffflorian/crates-updater/workflows/Build/badge.svg)](https://github.com/ffflorian/crates-updater/actions/) [![npm version](https://img.shields.io/npm/v/crates-updater.svg?style=flat)](https://www.npmjs.com/package/crates-updater) [![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=ffflorian/crates-updater)](https://dependabot.com)

Check your [Rust packages](https://crates.io) for updates.

## Installation

Run `yarn global add crates-updater` or `npm i -g crates-updater`.

## Usage

```
Usage: crates-updater [options] <package> [packageVersion]

Check your Rust packages for updates.

Options:
  -q, --quiet    quiet mode. Display newer version or nothing
  -v, --version  output the version number
  -h, --help     output usage information
```

## Examples

```shell
# returns either a newer version or nothing
crates-updater ripgrep -q 0.9.0

# returns the latest version with a helpful text
crates-updater ripgrep
```

## API Usage

See [`cli.ts`](./src/cli.ts).
