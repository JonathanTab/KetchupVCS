//Base stuff
import fs from 'fs';
import path from 'path';


//packages
import envPaths from 'env-paths';
import chokidar from 'chokidar';

//Our code
import * as util from './util.js';


//init app config
const envpaths = envPaths("KetchupVCS", { 'suffix': '' });



if (!fs.existsSync(envpaths.config)) {
    util.createDirectories(envpaths.config);
};

console.log(envpaths)