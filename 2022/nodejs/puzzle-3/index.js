const { read } = require('./read'),
    _ = require('underscore');

const allBags = read('input.txt').split(',')

const bags = allBags.map(str => [str.slice(0, (str.length / 2)).split(''), str.slice((str.length / 2)).split('')])

const char2Code = (ch) => ch.charCodeAt() > 97 ? ch.charCodeAt() - 96 :  ch.charCodeAt() - 38;

const searchProducts = (part1, part2) => _.uniq(_.without(part1, ..._.difference(part1, part2))) 

const sumPriorities = bags.
    map(bag => searchProducts(bag[0], bag[1])).
    reduce((prev, cur) => prev + cur.reduce((pr, cr) => pr + char2Code(cr), 0), 0);

console.log(`-------------------Part 1-------------------------`)
console.log(`Sum of the priorities is ${sumPriorities}`);

console.log(`-------------------Part 2-------------------------`)
const groupBags = _.chunk(allBags.map(str => str.split('')), 3)

const sumGroups = groupBags.
    map(el => searchProducts(el[2], searchProducts(el[0], el[1]))).
    reduce((prev, cur) => prev + cur.reduce((pr, cr) => pr + char2Code(cr), 0), 0);

console.log(`Sum of the group priorities is ${sumGroups}`);