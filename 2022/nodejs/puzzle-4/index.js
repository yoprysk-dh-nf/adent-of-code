const { read } = require('./read'),
    _ = require('underscore');

const checkContains = (arr1, arr2) => {
    if(arr1.length > arr2.length) {
        return _.without(arr2, ...arr1).length === 0;
    } else {
        return  _.without(arr1, ...arr2).length === 0;
    }
}

const data = read('input.txt', '|').split('|').map(str => str.split(',')).map(el => {
    let group1Start = parseInt(el[0].split('-')[0]);
    let group1End = parseInt(el[0].split('-')[1]);
    let group2Start = parseInt(el[1].split('-')[0]);
    let group2End = parseInt(el[1].split('-')[1]);

    return [
        group1Start === group1End ? [group1End] : _.range(group1Start, group1End + 1, 1),
        group2Start === group2End ? [group2End] : _.range(group2Start, group2End + 2, 1)
    ];
}).map(el => checkContains(el[0], el[1]));

// data.forEach(el => {
//     if(checkContains(el[0], el[1]))
//         console.log(`${el[0][0]}-${el[0][el[0].length - 1]}\n${el[1][0]}-${el[1][el[1].length - 1]}\t${checkContains(el[0], el[1])}\n\n`)
// })


const count = _.size(_.filter(data, (el => el === true)));

console.log(`-------------------Part 1-------------------------`)
console.log(`Number of pairs are ${count}`);
