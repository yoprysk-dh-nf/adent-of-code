const { read } = require('./read');
const _ = require('underscore');

const inputData = read('input.txt').split(',').map(entry => {
    const [first, second]= entry.split(' ');
    return {
        direction: first,
        total: parseInt(second)
    }   
});

const defineDirection = (direction) => {
    const defined = {
        R: {
            x: 1,
            y: 0
        },
        U: {
            x: 0,
            y: 1
        },
        L: {
            x: -1,
            y: 0
        },
        D: {
            x: 0,
            y: -1
        }
    }

    return defined[direction];
};

class Location{
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.visited = new Set();
        this.visit();
    }

    set(x, y) {
        this.x = x;
        this.y = y;
        this.visit()
    }

    get() {
        return {x: this.x, y: this.y}
    }

    visit() {
        this.visited.add(`${this.x}:${this.y}`)
    }
}

class Snake {
    constructor() {
        this.tail = new Location(0, 0);
        this.head = new Location(0, 0);
    }

    move(direction) {
        this.head.set(this.head.x + defineDirection(direction).x, this.head.y + defineDirection(direction).y);
        
        if (Math.abs(this.head.x - this.tail.x) > 1) {
            
        } else if (Math.abs(this.head.y - this.tail.y) > 1) {

        }
    }
}

const snake = new Snake();

inputData.forEach(entry => {
    _.range(entry.total).forEach(() => {
        snake.move(entry.direction);
    });
});

console.log(snake);


console.table(inputData)