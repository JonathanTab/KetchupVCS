// Base stuff
import fs from 'fs/promises';
import path from 'path';

// packages
import { Dropbox } from 'dropbox';

// Our code
import log from '../log.js';
import * as util from '../util.js';
import { readFile } from 'fs';

// We need:
// downloadFile(url, path), downloads file from dropbox root folder
// getFile(url), returns the cache location for the specified url (downloading as necessary)
// isConfigured, returns yes or no
// storeFile(url, path), uploads file to to specified location and places it in the cache
// CONFIG PAGE views

export default class DropboxBackend {
  constructor(config) {
    this.config = config;
  }

  isConfigured() {
    return (this.config.data.dropboxBackend.token && this.config.data.dropboxBackend.rootFolder);
  }

  init(){
    if (this.isConfigured() == true){
      this.dbx = new Dropbox.Dropbox({ accessToken: this.config.data.dropboxBackend.token});
      return true
    } else {
      return false
    }
  }

  downloadFile(url, filepath) {
    return new Promise((resolve, reject) => {

    });
  }

  getFile(url, filepath) {
    return new Promise((resolve, reject) => {

    });
  }

  storeFile(url, filepath) {
    return new Promise((resolve, reject) => {
      file = fs.readFile (filepath, (err,data )){}
      readFile(filepath).then(fileBuffer => {
        dbx.filesUpload({path: this.config.data.dropboxBackend.rootFolder+"/"+url, contents: fileBuffer})
        .then(function(response) {
        })
        .catch(function(error) {
          console.error(error);
        });
      }).catch(error => {
        console.error(error.message);
        process.exit(1);
      });
    });
  }
