import fs from 'fs/promises';
import * as util from './util.js';
import log from './log.js';

export default class Config {
  constructor() {
    this.data = {};
    // Make config dir if neccesary
    util.createDirectories(util.ENVPATHS.config);

    // define settings.json filename with envpaths.config variable file path as configFilename
    this.configFilename = `${util.ENVPATHS.config}/settings.json`;
  }

  write_config() {
    return fs.writeFile(this.configFilename, JSON.stringify(this.data));
  }

  async load_config() {
    return new Promise((resolve, reject) => {
      // Write base config to file if it doesnt exist
      if (!util.checkFileExists(this.configFilename)) {
        log.info('no settings file, creating');
        // Fill out project root
        this.data.project_root = '';
        this.write_config().catch((err) => {
          log.error(err);
        });
      }
      fs.readFile(this.configFilename).then((result) => {
        try {
          this.data = JSON.parse(result);
          log.info(this.data);
        } catch (error) {
          reject(error);
        }
        resolve();
      }).catch((err) => {
        reject(err);
      });
    });
  }
}
