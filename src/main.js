//Base stuff
import fs from 'fs';
import path from 'path';
import log from './log.js'

//packages

import chokidar from 'chokidar';

//Our code
import * as util from './util.js';
import Config from './config.js';


//init app config
var config = new Config('KetchupVCS')


log.info(config.project_root);


//Start the watch loop
const watcher = chokidar.watch(config.project_root, {
    ignored: /(^|[/\\])\../, // ignore dotfiles
    persistent: true
});
watcher
    .on('addDir', path => log.warn(`Directory ${path} has been added`))
    .on('ready', path => log.info(`Directory ${path} has been added`))

