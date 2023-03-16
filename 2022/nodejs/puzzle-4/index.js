const { read } = require('./read'),
    _ = require('underscore');

const checkContains = (arr1, arr2) => _.without(arr2, ...arr1).length === 0 || _.without(arr1, ...arr2).length === 0;

const checkParcialContains = (arr1, arr2) => _.without(arr2, ...arr1).length !== arr2.length || _.without(arr1, ...arr2).length !== arr1.length;

const data = read('input.txt', '|').split('|').map(str => str.split(',')).map(el => {
    let group1Start = parseInt(el[0].split('-')[0]);
    let group1End = parseInt(el[0].split('-')[1]);
    let group2Start = parseInt(el[1].split('-')[0]);
    let group2End = parseInt(el[1].split('-')[1]);

    return [
        group1Start === group1End ? [group1End] : _.range(group1Start, group1End + 1, 1),
        group2Start === group2End ? [group2End] : _.range(group2Start, group2End + 1, 1)
    ];
});

const translated = data.map(el => checkContains(el[0], el[1]));

// data.forEach(el => {
//     if(checkContains(el[0], el[1]))
//         console.log(`${el[0][0]}-${el[0][el[0].length - 1]}\n${el[1][0]}-${el[1][el[1].length - 1]}\t${checkContains(el[0], el[1])}\n\n`)
// })


const translated2 = data.map(el => checkParcialContains(el[0], el[1]));

const count = _.size(_.filter(translated, (el => el === true)));

console.log(`-------------------Part 1-------------------------`)
console.log(`Number of pairs are ${count}`);


const count2 = _.size(_.filter(translated2, (el => el === true)));
console.log(`-------------------Part 2-------------------------`)
console.log(`Number of parcial pairs are ${count2}`);
