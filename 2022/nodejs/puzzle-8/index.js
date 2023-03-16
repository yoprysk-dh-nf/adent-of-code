const { read } = require('./read');
const _ = require('lodash');

const area = read('input.txt', '|').split('|').map(entry => entry.split(''));

const results = [];

const xcount = area.length;
const ycount = area[0].length;

for(let i = 0; i < xcount; i++) {
    let max = area[i][0];
    results.push({x: i, y: 0, h: max});
    for(let j = 1; j < ycount; j++) {
        if(max < area[i][j]) {
            max = area[i][j];
            results.push({x: i, y: j, h: max});
        }
    }
}

for(let i = xcount - 1; i >= 0; i--) {
    let max = area[i][ycount - 1];
    results.push({x: i, y: ycount - 1, h: max});
    for(let j = ycount - 1; j >= 0; j--) {
        if(max < area[i][j]) {
            max = area[i][j];
            results.push({x: i, y: j, h: area[i][j]});
        }
    }
}

for(let j = 0; j < ycount; j++) {
    let max = area[0][j];
    results.push({x: 0, y: j, h: max});
    for(let i = 1; i < xcount; i++) {
        if(max < area[i][j]) {
            max = area[i][j];
            results.push({x: i, y: j, h: area[i][j]});
        }
    }
}

for(let j = ycount - 1; j >= 0; j--) {
    let max = area[xcount - 1][j];
    results.push({x: xcount - 1, y: j, h: max});
    for(let i = xcount - 1; i >= 0; i--) {
        if(max < area[i][j]) {
            max = area[i][j];
            results.push({x: i, y: j, h: area[i][j]});
        }
    }
}

console.log(`-------------------Part 1-------------------------`);
console.log(`Number of tree which could see is ${_.uniqWith(results, _.isEqual).length}`);

console.log(`-------------------Part 2-------------------------`);

const calcUp = (column, index) => {
    let count = 0;
    let max = -1;

    for(let i = index - 1; i >= 0; i--) {
        if(parseInt(column[i]) > max) {
            max = parseInt(column[i]);
            count +=1;
        }    
        
        if(parseInt(column[index]) <= max) {
            return count;
        }
    }

    return count;
}

const calcBottom = (column, index) => {
    let count = 0;
    let max = -1;

    for(let i = index + 1; i < column.length; i++) {
        if(parseInt(column[i]) > max) {
            max = parseInt(column[i]);
            count +=1;
        }  

        if(parseInt(column[index]) <= max) {
            return count;
        }
    }

    return count;
}


const calculatePoint = (matrix, x, y) => {
    const xrow = matrix[x];
    const ycolumn = matrix.map(row => row[y]);

    const upNumber = calcUp(ycolumn, x);
    const bottomNumber = calcBottom(ycolumn, x);
    const leftNumber = calcUp(xrow, y);
    const rigthNumber = calcBottom(xrow, y);

    return { value: upNumber * bottomNumber * leftNumber * rigthNumber, x, y, up: upNumber, down: bottomNumber, left: leftNumber, rigth: rigthNumber };
} 

const placeResults = [];

for(let i = 1; i < xcount - 1; i++) {
    for(let j = 1; j < ycount - 1; j++) {
        placeResults.push(calculatePoint(area, i, j));
    }
}

const maxNumber = _.max(placeResults.map(entry => entry.value));

console.log(placeResults)
console.log(`Max number is ${maxNumber}`);