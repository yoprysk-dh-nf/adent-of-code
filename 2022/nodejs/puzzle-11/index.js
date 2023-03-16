const { read } = require('./read');

const inputData = read('input.txt').split(',').map(entry => entry.split(' '));

const normData = inputData.map(entry => entry[0].split('')).map(entry => entry.map(el => el.charCodeAt() - 96))

const visited = [];

const getNeighbours = (matrix, x, y) => {
    let neighbours = [];

    if(x + 1 < matrix.length) neighbours.push({x: x + 1, y: y, value: matrix[x + 1][y]})
    if(y + 1 < matrix[0].length) neighbours.push({x, y: y + 1, value: matrix[x][y + 1]})
    if(x - 1 >= 0) neighbours.push({x: x - 1, y: y, value: matrix[x - 1][y]})
    if(y - 1 >= 0) neighbours.push({x, y: y - 1, value: matrix[x][y - 1]})

    return neighbours;
}

const isAlreadyVisited = (entry) => {
    return visited.filter(el => el.x !== entry.x && el.y !== entry.y && el.value === entry.value).length > 0
}

const findNeighbour = (matrix, x, y, prev) => {
    
    let value = matrix[x][y];
    let neighbours = getNeighbours(matrix, x, y);

    console.table(neighbours);

    let fvalues = neighbours.filter(entry => entry.value < 0);
    let hvalues = neighbours.filter(entry => entry.value === value + 1);
    let evalues = neighbours.filter(entry => entry.value === value);

    if(fvalues.length > 0) return fvalues[0];
    
    // if(hvalues.filter(el => el.x !== prev.x && el.y !== prev.y).length > 0) return hvalues.filter(el => el.x !== prev.x && el.y !== prev.y)[0];
    // if(evalues.filter(el => el.x !== prev.x && el.y !== prev.y).length > 0) return evalues.filter(el => el.x !== prev.x && el.y !== prev.y)[0];
    
    if(hvalues.length > 0) return hvalues[0];
    if(evalues.length > 0) return evalues[0];
};   

const searchTop = (data) => {
    let current = {x: 0, y: 0, value: data[0][0]};
    let prev = {x: 0, y: 0, value: data[0][0]};

    let goal = false;
    let steps = 0;

    while(!goal) {
        prev = current;
        current = findNeighbour(data, current.x, current.y, prev);
       // console.dir(current)
        console.log(`Current -> ${current.x} : ${current.y} = ${current.value}`);
        visited.push(current);
        
        goal = current.value < 0;

        steps++;
    }

    return steps;
}

const searchSteps = searchTop(normData);

console.log(searchSteps)

