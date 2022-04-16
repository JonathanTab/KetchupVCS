import EnvPaths from 'env-paths';
import fs from 'fs';
import * as util from './util.js';
import log from './log.js'


//SCHEMA
// project_root = folder for projects

export default class Config {

    constructor(appname) {
        this.appname = appname;
        this.envpaths = EnvPaths(appname, { 'suffix': '' });

        //Make config dir if neccesary
        if (!fs.existsSync(this.envpaths.config)) {
            util.createDirectories(this.envpaths.config);
        }
        //define settings.json filename with envpaths.config variable file path as configfilename
        this.configfilename = this.envpaths.config + '/settings.json'


        // Write base config to file if it doesnt exist
        if (!fs.existsSync(this.configfilename)) {
            // Fill out project root
            this.update_project_root();
            this.write_config()

        } else {
            //read settings.json
            let config = JSON.parse(fs.readFileSync(this.configfilename))
            this.project_root = config.project_root
        }
    }

    update_project_root() {
        this.project_root = "csdsddv"
    }
    write_config() {
        let config = {};
        config.project_root = this.project_root

        //stringify the json "baseconfig" object and write it syncroniously (wait until it is created to proceed)
        fs.writeFileSync(this.configfilename, JSON.stringify(config))
    }

}
