const { read } = require('./read'),
    Stack = require('./stack');

const data = read('input.txt', '|').split('|');

const parseActions = (arr) => arr.map(entry => {
    let result = entry.match(/\d+/g)
    return {count: parseInt(result[0]), from: parseInt(result[1]), to: parseInt(result[2])}
});

const parseStorage = arr => {
    const cratesIndex = arr[arr.length - 1].split('   ').map(entry => {
        return {name: parseInt(entry.trim()), index: arr[arr.length - 1].indexOf(entry.trim())}
    })

    const storage = {};

    for (let i = arr.length - 2; i >= 0; i--) {
        cratesIndex.forEach((entry) => {
            if(arr[i][entry.index] !== ' ') {
                if(storage[entry.name]) {
                    storage[entry.name].push(arr[i][entry.index])
                } else {
                    storage[entry.name] = new Stack();
                    storage[entry.name].push(arr[i][entry.index])
                }
            }
        })
    }

    return storage;
};

const storage = parseStorage(data.slice(0, data.indexOf('')));
const storage2 = parseStorage(data.slice(0, data.indexOf('')));
const actions = parseActions(data.slice(data.indexOf('') + 1));

actions.forEach(entry => {
    for(let i = 0; i < entry.count; i++) {
        storage[entry.to].push(storage[entry.from].pop())
    }
});


console.log(`-------------------Part 1-------------------------`)
console.log(storage);

actions.forEach(entry => {
    const stack = new Stack();

    for(let i = 0; i < entry.count; i++) {
        stack.push(storage2[entry.from].pop())
    }

    for(let i = 0; i < entry.count; i++) {
        storage2[entry.to].push(stack.pop())
    }
});

console.log(`-------------------Part 2-------------------------`)
console.log(storage2);