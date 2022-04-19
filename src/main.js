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
import DropboxBackend from './backends/dropbox.js';

// init app config
const config = new Config();
await config.load_config();
// TODO: Open config window if we're not set up yet

async function handleChange(events) {
  log.error('new batch');
  events.forEach((event) => {
    log.debug(event);
    // Project folder change

    // check if its a root folder change AND a rename or create
    if (util.pathsAreEqual(event.directory, config.data.project_root) && (event.action === nsfw.actions.CREATED || event.action === nsfw.actions.RENAMED)) {
      const workingPath = `${event.directory}/${event.action === nsfw.actions.RENAMED ? event.newFile : event.file}`;
      fs.lstat(workingPath).then(async (stats) => {
        if (stats.isDirectory() === true) {
          const initialized = await util.checkFileExists(path.join(workingPath, '.projectfile.json'));
          ///
          // Renamed active folder
          if (event.action === nsfw.actions.RENAMED && initialized === true) {
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

    // Change in project directory
    if (path.relative(event.directory, config.data.project_root).startsWith('..')) {
      const workingPath = `${event.directory}/${event.action === nsfw.actions.RENAMED ? event.newFile : event.file}`;
      log.info(workingPath);
    }
  });
}

// Start the watch loop of the project root
let watcher;
nsfw(
  config.data.project_root,
  handleChange,
  {
    debounceMS: 750,
    errorCallback(errors) {
      log.error(errors);
    },
  },
)
  .then((watch) => {
    watcher = watch;
    return watcher.start();
  });
