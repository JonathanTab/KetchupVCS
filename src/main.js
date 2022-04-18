// Base stuff
import fs from 'fs/promises';
import path from 'path';

// packages

import nsfw from 'nsfw';

// Our code
import log from './log.js';
import * as util from './util.js';
import Config from './config.js';
import ProjectFile from './projectfile.js';

// init app config
const config = new Config('KetchupVCS');

async function handleChange(events) {
  events.forEach((event) => {
    log.debug(event);
    // Project folder change

    // check if its a root folder change AND a rename or create
    if (util.pathsAreEqual(event.directory, config.project_root) && (event.action === 0 || event.action === 3)) {
      const workingPath = `${event.directory}/${event.action === 3 ? event.newFile : event.file}`;
      fs.lstat(workingPath).then(async (stats) => {
        if (stats.isDirectory() === true) {
          const initialized = await util.checkFileExists(path.join(workingPath, '.projectfile.json'));
          ///
          // Renamed active folder
          if (event.action === 3 && initialized === true) {
            // FIXME: deal with renaming folder
            log.error('You cannot rename project folders once they are initialized');
          } else if (event.file !== 'New folder') {
            // FIXME: implement more defaults and do something about them (new folder (1))
            // FIXME: prompt to initialize folder
            log.info('uninitialized folder, initializing');
            const pf = new ProjectFile(workingPath);
          }
        }
      });
    }
  });
}

// Start the watch loop of the project root
let watcher;
nsfw(config.project_root, handleChange)
  .then((watch) => {
    watcher = watch;
    return watcher.start();
  });
