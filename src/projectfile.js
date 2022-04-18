// Currently the only thing this stores is the revision tree and project name
// SCHEMA
// { "revisions" : [ {'timestamp': '123123', 'author': 'shop-pc', 'changed': ['path': 'demo-brace.skp', 'changetype': 'saved', 'thumbnail': 'base64']},... ], "projectname": "something"  }
//
import fs from 'fs/promises';
import path from 'path';
import * as util from './util.js';
import log from './log.js';

export default class ProjectFile {
  revisions = [];

  projectname = '';

  constructor(folder) {
    this.path = path.join(folder, '.projectfile.json');
    // path is literal path to the project file
    // if not exist, fill out schema with skeleton project file, then write to file
    // else, load file into schema

    this.load().catch(() => {
      log.debug('init folder');
      // Not yet created, initialize
      this.revisions = [];
      this.projectname = util.normalizeProjectName(path.basename(folder));
      this.save().catch(() => { log.error('unable to write projectfile'); });
    });
  }

  async save() {
    const file = {};
    file.revisions = this.revisions;
    file.projectname = this.projectname;
    return fs.writeFile(this.path, JSON.stringify(file));
  }

  load() {
    return new Promise((resolve, reject) => {
      fs.readFile(this.path).then((result) => {
        try {
          const file = JSON.parse(result);
          this.revisions = file.revisions;
          this.projectname = file.projectname;
        } catch (error) {
          log.error(error);
        }
        resolve();
      }).catch((err) => {
        reject(err);
      });
    });
  }

  appendRevision(revision) {
    this.save();
  }
}
