import compareVersions = require('compare-versions');
import {CratesIO, Version as CrateVersion} from 'crates.io';

class CratesUpdater {
  private readonly cratesIO: CratesIO;

  constructor() {
    this.cratesIO = new CratesIO();
  }

  public async getVersions(packageName: string): Promise<CrateVersion[]> {
    const {versions} = await this.cratesIO.api.crates.getVersions(packageName);
    return versions;
  }

  public async getLatestVersion(packageName: string): Promise<CrateVersion> {
    const versions = await this.getVersions(packageName);
    return versions.sort((a, b) => compareVersions(a.num, b.num)).pop()!;
  }

  public async checkForUpdate(packageName: string, version: string): Promise<string | null> {
    const latestVersion = await this.getLatestVersion(packageName);
    if (compareVersions(latestVersion.num, version) > 0) {
      return latestVersion.num;
    }

    return null;
  }
}

export {CratesUpdater};
