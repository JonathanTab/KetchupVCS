//Base stuff
import fs from 'fs';
import path from 'path';


//packages

import chokidar from 'chokidar';

//Our code
import * as util from './util.js';
import Config from './config.js';


//init app config
var config = new Config('KetchupVCS')


console.log(config.project_root);


//Start watching project folders
const watcher = chokidar.watch('file, dir, glob, or array', {
    ignored: /(^|[\/\\])\../, // ignore dotfiles
    persistent: true
});
