const { read } = require('./read')

const guide = read('input.txt').split(',')
    .map(element => element.split(' '));

const card2Point = {
    'A': 1,
    'B': 2,
    'C': 3,
    'X': 1,
    'Y': 2,
    'Z': 3
};

const point2Card = {
    1: 'X',
    2: 'Y',
    3: 'Z'
};

const roundScore = (opponent, you) => {
    switch(card2Point[you] - card2Point[opponent]) {
        case -1:
        case 2: return -1;
        case 0: return 0;
        case -2:
        case 1: return 1;
    }
};

const calculateRoundScore = (you) => {
    switch(you) {
        case 'X': return -1;
        case 'Y': return 0;
        case 'Z': return 1;
    }
}


const result = (g) => g.reduce((prev, cur) => {
    const [opponent, you] = cur

    let opponentScore = card2Point[opponent];
    let yourScore = card2Point[you];

    const score = roundScore(opponent, you)

    if (score > 0) {
        yourScore += 6; 
    }

    if (score === 0) {
        yourScore += 3;
        opponentScore += 3;
    }

    if (score < 0) {
        opponentScore += 6
    }

    return {
        1: prev[1] + opponentScore,
        2: prev[2] + yourScore,
    };
}, { 1: 0, 2: 0 })    

console.log(`-------------------Part 1-------------------------`)
console.log(`Your score due to guide is ${result(guide)[2]}`)

const calculateCardToBeSelected = (you, opponent) => {
    switch(you) {
        case 'Y': return point2Card[card2Point[opponent]];
        case 'Z': return point2Card[(card2Point[opponent] + 1) === 4 ? 1 : card2Point[opponent] + 1];
        case 'X': return point2Card[(card2Point[opponent] - 1) === 0 ? 3 : card2Point[opponent] - 1];
    } 
}

const newGuide = guide.map(entry => {
    const [opponent, you] = entry 

    return [opponent, calculateCardToBeSelected(you, opponent)]
});

console.dir(newGuide)

console.log(`-------------------Part 2-------------------------`)
console.log(`Your score due to guide is ${result(newGuide)[2]}`)