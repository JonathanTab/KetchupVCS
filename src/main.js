//Base stuff
import fs from 'fs';
import path from 'path';


//packages
import EnvPaths from 'env-paths';
import chokidar from 'chokidar';

//Our code
import * as util from './util.js';


//init app config
const envpaths = EnvPaths("KetchupVCS", { 'suffix': '' });



if (!fs.existsSync(envpaths.config)) {
    util.createDirectories(envpaths.config);
};
//define settings.json filename with envpaths.config variable file path as configfilename
let configfilename = envpaths.config + '/settings.json'
// if settings.json DOES NOT exist(!) then create it and wait (sync) until its created.
if (!fs.existsSync(configfilename)){
    //define basic hardcoded config
    let baseconfig = {
        'projects-root':'c:/projects',
        'dropbox-token': "dfgrlgrfhgkkfjgb"
    }
    //stringify the json "baseconfig" object and write it syncroniously (wait until it is created to proceed)
    fs.writeFileSync(configfilename, JSON.stringify(baseconfig))
}

//Start watching project folders
const watcher = chokidar.watch('file, dir, glob, or array', {
    ignored: /(^|[\/\\])\../, // ignore dotfiles
    persistent: true
});
