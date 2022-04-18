import EnvPaths from 'env-paths';
import fs from 'fs';
import * as util from './util.js';
import log from './log.js';

// SCHEMA
// project_root = folder for projects
// username = name to attribute revisions to

export default class Config {
  constructor(appname) {
    this.appname = appname;
    this.envpaths = EnvPaths(appname, { suffix: '' });

    // Make config dir if neccesary
    if (!fs.existsSync(this.envpaths.config)) {
      log.info('Creating config dirs');
      util.createDirectories(this.envpaths.config);
    }
    // define settings.json filename with envpaths.config variable file path as configfilename
    this.configfilename = `${this.envpaths.config}/settings.json`;

    // Write base config to file if it doesnt exist
    if (!fs.existsSync(this.configfilename)) {
      log.info('no settings file, creating');
      // Fill out project root
      this.update_config();
      this.write_config();
    } else {
      // read settings.json
      const file = JSON.parse(fs.readFileSync(this.configfilename));
      this.project_root = file.project_root;
      this.project_root = file.project_root;
    }
  }

  update_config() {
    this.project_root = 'csdsddv';
    this.username = 'jonathan';
  }

  write_config() {
    const file = {};
    file.project_root = this.project_root;
    file.project_root = this.project_root;

    // stringify the json "baseconfig" object and write it syncroniously (wait until it is created to proceed)
    fs.writeFileSync(this.configfilename, JSON.stringify(file));
  }
}
