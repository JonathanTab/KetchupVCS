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
let configfilename = envpaths.config+'/settings.json'
// if settings.json DOES NOT exist(!) then create it and wait (sync) until its created.
if (!fs.existsSync(configfilename)){
    fs.writeFileSync(configfilename, '{}')
}