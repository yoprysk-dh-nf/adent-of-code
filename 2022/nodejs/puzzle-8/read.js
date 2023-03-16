const fs = require('fs');
const { join } = require('path');

const readTxtInput = (fileName, separator = ',') => {
    try {
        const data = fs.readFileSync(join(__dirname, fileName));
        return data.toString().split('\n').join(separator)
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

module.exports = { read: readTxtInput}