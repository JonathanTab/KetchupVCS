//Base stuff
import fs from 'fs';
import path from 'path';


//packages
import envPaths from 'env-paths';
import chokidar from 'chokidar';

//Our code
import * as util from './util.js';


//init app data
const paths = envPaths("KetchupVCS", { 'suffix': '' });

if (!fs.existsSync(paths.config)) {
    util.createDirectoriesForFile(paths.config);
}
