//Base stuff
import fs from 'fs';

//packages

import nsfw from 'nsfw';

//Our code
import log from './log.js'
import * as util from './util.js';
import Config from './config.js';
import ProjectFile from './projectfile.js';


//init app config
var config = new Config('KetchupVCS')


//Start the watch loop of the project root
var watcher;
nsfw(config.project_root, handleChange)
    .then(function (watch) {
        watcher = watch;
        return watcher.start();
    })

async function handleChange(events) {
    for (const event of events) {
        log.debug(event)


        //Project folder change
        if (util.pathsAreEqual(event.directory, config.project_root)) {
            let path = event.directory + "/" + event.file + "/.projectfile.json"
            if (event.action == 0 && event.file != "New folder" && !fs.existsSync(path) || event.action == 3 && !fs.existsSync(path)) {
                log.info("Event on project folder without projectfile")
                //TODO prompt to initialize folder
                let pf = new ProjectFile(path)
            }
        }
    }

    //if (!/\/|\\/.test(pathlib.relative(config.project_root, path))) {
    //   log.debug(events);

    // }
}
