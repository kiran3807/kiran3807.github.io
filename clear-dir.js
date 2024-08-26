const fs = require('fs');
const path = require('path');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

/*
    USAGE:
        --files abc xyz pqr ...
        --dirs abc, xyz, pqr
*/

const argv = yargs(hideBin(process.argv)).option('files', {
    type: 'array',
    describe: 'Array of items',
}).option('dirs', {
    type: 'array',
    describe: 'Array of items',
}).argv;

const directoryPath = "./";
const fileIgnoreList = [ 
    "package.json", 
    "package-lock.json",
    "clear-dir.js",
    ".nojekyll"
];
const dirIgnoreList = [
    ".git",
    "node_modules"
]
if(argv.files) {
    fileIgnoreList.push(...argv.files);
}
if(argv.dirs) {
    dirIgnoreList.push(...argv.dirs);
}

const ignoreList = [...fileIgnoreList, ...dirIgnoreList];
fs.readdir(directoryPath, (err, files) => {
    if (err) {
        throw Error(`Unable to scan directory: ${err}`);
    } 

    for(const file of files) {
        
        const filePath = path.join(directoryPath, file);

        if(!ignoreList.includes(file)) {
            if (fs.statSync(filePath).isFile()) {
                fs.unlinkSync(filePath, (err)=> {
                    if(err) throw err;
                    console.log(`deleted ${filePath}`);
                });
            }else {
                fs.rmSync(filePath, {
                    recursive :  true,
                    force : true
                });
            }
        }
    }
});