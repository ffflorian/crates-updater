import compareVersions = require('compare-versions');
import {CratesIO, Version as CrateVersion} from 'crates.io';

const cratesIO = new CratesIO();

export async function checkForUpdate(packageName: string, version: string): Promise<string | null> {
  const latestVersion = await getLatestVersion(packageName);
  if (compareVersions(latestVersion.num, version) > 0) {
    return latestVersion.num;
  }

  return null;
}

export async function getLatestVersion(packageName: string): Promise<CrateVersion> {
  const versions = await getVersions(packageName);
  return versions.sort((a, b) => compareVersions(a.num, b.num)).pop()!;
}

export async function getVersions(packageName: string): Promise<CrateVersion[]> {
  const {versions} = await cratesIO.api.crates.getVersions(packageName);
  return versions;
}
