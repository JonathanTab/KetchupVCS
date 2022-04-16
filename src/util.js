import fs from 'fs';
import path from 'path';

export function createDirectories(pathname) {
    const __dirname = path.resolve();
    pathname = pathname.replace(/^\.*\/|\/?[^/]+\.[a-z]+|\/$/g, ''); // Remove leading directory markers, and remove ending /file-name.extension
    fs.mkdir(path.resolve(__dirname, pathname), { recursive: true }, e => {
        if (e) {
            console.error(e);
        } else {
            console.log('Success');
        }
    });
}
export function pathsAreEqual(path1, path2) {
    path1 = path.resolve(path1);
    path2 = path.resolve(path2);
    if (process.platform == "win32")
        return path1.toLowerCase() === path2.toLowerCase();
    return path1 === path2;
}
