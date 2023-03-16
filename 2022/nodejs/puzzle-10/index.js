const { read } = require('./read');

const inputData = read('input.txt').split(',').map(entry => entry.split(' '));

const calculateCycles = (data, numberCycles) => {
    let cycles = 0;
    let x = 1;
    let index = 0;

    do {
        if(data[index][0] === 'noop') {
            cycles += 1
        } else {
            if(cycles + 2 < numberCycles) {
                x += parseInt(data[index][1]);
                cycles += 2;
            }
        }

        index++;
    } while(cycles <= numberCycles)

    return x;
}


const total = calculateCycles(inputData, 20) * 20
    + calculateCycles(inputData, 60) * 60
    + calculateCycles(inputData, 100) * 100
    + calculateCycles(inputData, 140) * 140
    + calculateCycles(inputData, 180) * 180
    + calculateCycles(inputData, 220) * 220;

console.log(`Total: ${total}`);
