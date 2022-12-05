const { read } = require('./read'),
    _ = require('underscore');


const bags = read('input.txt').split(',').map(str => [str.slice(0, (str.length / 2)).split(''), str.slice((str.length / 2)).split('')])

const searchProducts = (part1, part2) => _.uniq(_.without(part1, ..._.difference(part1, part2))) 

const sumPriorities = bags.
    map(bag => searchProducts(bag[0], bag[1])).
    reduce((prev, cur) => prev + cur.reduce((pr, cr) => cr.charCodeAt() > 97 ? pr + cr.charCodeAt() - 96 :  pr + cr.charCodeAt() - 38, 0), 0);

console.log(`Sum of the priorities is ${sumPriorities}`);