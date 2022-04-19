import fs from 'fs/promises';
import path from 'path';
import * as util from './util.js';
import log from './log.js';
import ProjectFile from './projectfile.js';

export default class Project {
  constructor(folder) {
    this.projectfile = new ProjectFile(folder);
  }

  createRevision(files) {

  }

  checkAgainstLatestRevision() {
    //
  }
}
