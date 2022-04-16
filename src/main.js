//Base stuff
import fs from 'fs';
import pathlib from 'path';
import log from './log.js'

//packages

import chokidar from 'chokidar';

//Our code
import * as util from './util.js';
import Config from './config.js';


//init app config
var config = new Config('KetchupVCS')


//Start the watch loop
const watcher = chokidar.watch(config.project_root, {
    ignored: /(^|[/\\])\../, // ignore dotfiles
    persistent: true
});
watcher.on('error', error => log.error(`Watcher error: ${error}`))
watcher.on('ready', function () {
    watcher.on('all', (event, path) => { handleChange(event, path); });
})

async function handleChange(event, path) {

    if (!/\/|\\/.test(pathlib.relative(config.project_root, path))) {

    }
}
