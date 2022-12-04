const { read } = require('./read')

const alfCalories = read('input.txt').split(',,')
    .map(element => element.split(',')
    .reduce((prev, cur) => prev + parseInt(cur), 0));

console.log(`Alf with max calories: ${Math.max(...alfCalories)}`)