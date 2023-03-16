const { read } = require('./read'),
    _ = require('underscore');

const alfCalories = read('input.txt').split(',,')
    .map(element => element.split(',')
    .reduce((prev, cur) => prev + parseInt(cur), 0));

console.log(`-------------------Part 1-------------------------`)
console.log(`Alf with max calories: ${Math.max(...alfCalories)}`);

const alf3Total = _.sortBy(alfCalories).slice(alfCalories.length - 3).reduce((prev, cur) => prev + cur, 0)

console.log(`-------------------Part 2-------------------------`)
console.log(`Calories are those Elves carrying in total: ${alf3Total}`)