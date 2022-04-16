//Currently the only thing this stores is the revision tree and project name
//SCHEMA
//{ "revisions" : [ {'timestamp': '123123', 'author': 'shop-pc', 'changed': ['path': 'demo-brace.skp', 'changetype': 'saved', 'thumbnail': 'base64']},... ], "projectname": "something"  }
//
import fs from 'fs';

export default class ProjectFile {
    revisions = []
    projectname = ""
    constructor(path) {
        this.path = path
        //path is literal path to the project file
        //if not exist, fill out schema with skeleton project file, then write to file
        //else, load file into schema

        if (!fs.existsSync(path)){
            this.revisions = []
            this.projectname = "ourproject"
            this.save()

        }
        else{
            this.load()
        }
    }

    async save() {
        let file;
        file.revisions = this.revisions
        file.projectname = this.projectname
        fs.writeFileSync(this.path, JSON.stringify(file))

    }
    async load() {
        let file = JSON.parse(fs.readFileSync(this.path))
        this.revisions = file.revisions
        this.projectname = file.projectname
    }
    appendRevision(revision) {
        this.save()
    }
}
