 
class Directory {
    
    constructor(name, parent) {
        this.name = name;
        this.parent = parent;
        this.files = [];
        this.directories = [];
    }

    getName() {
        return this.name;
    }

    getParent() {
        return this.parent;
    }

    getDirectories() {
        return this.directories;
    }

    addFile(file) {
        this.files.push(file)
    }

    addDirectory(dir) {
        this.directories.push(dir)
    }

    getSize() {
        return this.directories.reduce((prev, cur) => {
            return prev + cur.getSize()
        }, 0) + this.files.reduce((prev, cur) => prev + cur.getSize(), 0);
    }
}
module.exports = Directory;