const { read } = require('./read'),
    _ = require('underscore'),
    File = require('./file'),
    Directory = require('./dir');

const systemBrowse = read('input.txt', '|').split('|');

const treeDirectory = systemBrowse.reduce((rootDir, entry) => {

    const data = entry.split(' ')

    if(data[0] === 'dir') {
        rootDir.addDirectory(new Directory(data[1].trim(), rootDir));
        return rootDir 
    } 

    if(data[0] === '$') {
        if(data[1] === 'cd') {
            if (data[2] === '..') {
                return rootDir.getParent();
            } else {
                return rootDir === null ? new Directory(data[2].trim(), rootDir) : rootDir.getDirectories().filter(dir => dir.getName() === data[2].trim())[0]; 
            }
        }

        if(data[1] === 'ls') return rootDir;
    }

    rootDir.addFile(new File(data[1].trim(), parseInt(data[0].trim())));

    return rootDir;
}, null);

const getRootDir = (dir) => {
    if (dir.getParent() === null) return dir;

    return getRootDir(dir.getParent());
}


//console.dir(getRootDir(treeDirectory));

const getDirFullPath = (dir) => {
    const name = []
    let cur = dir
    name.push(cur.getName());

    while(cur.getParent() !== null) {
        cur = cur.getParent()
        name.push(cur.getName())
    } 

    return name.join(' -> ');
}

const sizes = {};

const calculateDirSizes = (dir) => {
    sizes[getDirFullPath(dir)] = dir.getSize();

    if(dir.getDirectories().length === 0) return;
    else dir.getDirectories().forEach(subDir => calculateDirSizes(subDir));
}

calculateDirSizes(getRootDir(treeDirectory))

console.dir(_.allKeys(sizes).map(key => sizes[key]).filter(sz => sz < 100000).reduce((prev, cur) => prev + cur, 0)); 

console.info('**********************************************************');
//console.dir(sizes);

const busySize = getRootDir(treeDirectory).getSize();
const distSize = 70000000;
const updateSize = 30000000;

const needSize = Math.abs(distSize - busySize - updateSize);
//console.info('**********************************************************');
console.info(needSize);

const allSizes = _.sortBy(_.allKeys(sizes).map(key => sizes[key]));

console.log(`need size for update: ${needSize}`);
for(let i = allSizes.length - 1; i >= 0; i--) {
    if(allSizes[i] === needSize) console.log(`need to delete: ${allSizes[i]}`);
    if(allSizes[i] < needSize) {
        console.log(`found: ${allSizes[i]}`);
        console.log(`need to delete: ${allSizes[i + 1]}`);
        break;
    }
}

//console.log(allSizes);