const { read } = require('./read'),
    _ = require('underscore');

const msg = read('input.txt');

console.log(msg)

const dataBuf = msg.split('');

const findDiffSymbols = (arr, count) => {
    for(let i = 0; i < arr.length; i++) {
        if(_.uniq(arr.slice(i, i + count)).length === count) {
            return i + count;
        }
    }
}


const count = findDiffSymbols(dataBuf, 4); 

console.log(`-------------------Part 1-------------------------`)
console.log(`start-of-packet marker is started from ${count}`);


const msgCount = findDiffSymbols(dataBuf, 14); 
console.log(`-------------------Part 2-------------------------`)
console.log(`start-of-msg is started from ${msgCount}`);
