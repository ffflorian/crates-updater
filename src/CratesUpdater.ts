import compareVersions = require('compare-versions');
import {LibrariesIO, ProjectVersion} from 'libraries.io';

class CratesUpdater {
  private readonly librariesIO: LibrariesIO;

  constructor(apiKey: string) {
    this.librariesIO = new LibrariesIO(apiKey);
  }

  public async getVersions(packageName: string): Promise<ProjectVersion[]> {
    const result = await this.librariesIO.api.project.getProject('cargo', packageName);
    return result.data.versions;
  }

  public async getLatestVersion(packageName: string): Promise<ProjectVersion> {
    const versions = await this.getVersions(packageName);
    const sorted = versions.sort((a, b) => compareVersions(a.number, b.number));
    return sorted[versions.length - 1];
  }

  public async checkForUpdate(packageName: string, version: string): Promise<string | null> {
    const latestVersion = await this.getLatestVersion(packageName);
    if (compareVersions(latestVersion.number, version) > 0) {
      return latestVersion.number;
    }

    return null;
  }
}

export {CratesUpdater};
