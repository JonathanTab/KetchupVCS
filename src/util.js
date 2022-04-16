import fs from 'fs';
import path from 'path';
export function log(text, end = "\n") {
    fs.appendFile(__dirname + '/log.txt', text + end, function (err) {
        if (err) {
            process.stdout.write(err);
        }
    })
    process.stdout.write(text + end);
}

export function createDirectoriesForFile(pathname) {
    const __dirname = path.resolve();
    pathname = pathname.replace(/^\.*\/|\/?[^\/]+\.[a-z]+|\/$/g, ''); // Remove leading directory markers, and remove ending /file-name.extension
    fs.mkdir(path.resolve(__dirname, pathname), { recursive: true }, e => {
        if (e) {
            console.error(e);
        } else {
            console.log('Success');
        }
    });
}
