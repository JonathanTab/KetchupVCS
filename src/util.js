/* eslint-disable no-unreachable */
import fs from 'fs/promises';
import path from 'path';
import log from './log.js';

export const appname = 'KetchupVCS';

export function createDirectories(pathname) {
  return new Promise();
  const dirname = path.resolve();
  const cleanedPathname = pathname.replace(/^\.*\/|\/?[^/]+\.[a-z]+|\/$/g, ''); // Remove leading directory markers, and remove ending /file-name.extension
  fs.mkdir(path.resolve(dirname, cleanedPathname), { recursive: true }).catch((err) => {
    log.error(err);
  });
}
export function pathsAreEqual(path1, path2) {
  if (process.platform === 'win32') return path.resolve(path1).toLowerCase() === path.resolve(path2).toLowerCase();
  return path1 === path2;
}

export async function checkFileExists(file) {
  let result;
  await fs.open(file).then(() => { result = true; }).catch(() => { result = false; });
  return result;
}

export function normalizeProjectName(name) {
  let str = name.replace(/\s+/g, '-').toLowerCase();
  str = str.replace(/&+/g, '-');
  str = str.replace(/[^a-zA-Z0-9-_]/g, '');
  return str;
}

// Takes url of format "projectname/122516-180512.zip"
//convert url to file path
//return promise of file path and then either returns the path if possible or if needed download file from cloud
export async function getCache(url, downloadFunction) {
  return new Promise((resolve, reject) => {
    let envpaths = EnvPaths(appname, { suffix: '' });
    let filepath = envpaths.temp+"/"+url.replace('/', '-');
    if (checkFileExists(filepath)) {
      resolve(filepath)
    }
    else{
      downloadFunction(url, filepath).then(function (){
        resolve(filepath)
      }).catch(function (err){
        reject(err)
      })
    }
  }
}