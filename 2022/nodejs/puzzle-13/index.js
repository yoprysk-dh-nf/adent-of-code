const { read } = require('./read');
const _ = require('underscore');

const inputData = read('input.txt', '|').split('|').map(entry => entry.split('\n')).map(entry => entry.map(el => JSON.parse(el)));

const checkInts = (valueLeft, valueRigth) => {
    return valueLeft <= valueRigth;
}

const checkLeftNumberArray = (nb, arr) => {
    if(arr.length === 0) return false;
    if(_.isArray(arr[0])) return checkLeftNumberArray(nb, arr[0]);
    if(_.isNumber(arr[0])) return checkInts(nb, arr[0]);
}

const checkRigthNumberArray = (arr, nb) => {
    if(arr.length === 0) return true;
    if(_.isArray(arr[0])) return checkRigthNumberArray(arr[0], nb);
    if(_.isNumber(arr[0])) return checkInts(arr[0], nb);
}

const checkArrays = (arrLeft, arrRigth) => {
    console.log('*******************checkArrays*********************')
    console.table([arrLeft, arrRigth])
    console.log('***************************************************')
    if(arrLeft.length === 0) return true;
    if(arrRigth.length < arrLeft.length) return false;

    for(let i = 0; i < arrLeft.length; i++) {
        try {
            if(_.isNumber(arrLeft[i]) && _.isNumber(arrRigth[i])) {
                if(!checkInts(arrLeft[i], arrRigth[i])) return false;
            }

            if(_.isArray(arrLeft[i]) && _.isArray(arrRigth[i])) {
                if(!checkArrays(arrLeft[i], arrRigth[i])) return false;
            }

            if(_.isNumber(arrLeft[i]) && _.isArray(arrRigth[i])) {
                if(!checkLeftNumberArray(arrLeft[i], arrRigth[i])) return false;
            }

            if(_.isArray(arrLeft[i]) && _.isNumber(arrRigth[i])) {
                if(!checkRigthNumberArray(arrLeft[i], arrRigth[i])) return false;
            }

        } catch (err) {
            return false;
        }
    }

    return true;
};

const checkTopLevel = (arrLeft, arrRigth) => {
    console.log('*******************checkTopLevel*********************')
    console.table([arrLeft, arrRigth])
    console.log('*****************************************************')
    if(arrRigth.length < arrLeft.length) return false;

    for(let i = 0; i < arrLeft.length; i++) {
        try {
            if(_.isNumber(arrLeft[i]) && _.isNumber(arrRigth[i])) {
                if(!checkInts(arrLeft[i], arrRigth[i])) return false;
            }

            if(_.isArray(arrLeft[i]) && _.isArray(arrRigth[i])) {
                if(!checkArrays(arrLeft[i], arrRigth[i])) return false;
            }

            if(_.isNumber(arrLeft[i]) && _.isArray(arrRigth[i])) {
                if(!checkLeftNumberArray(arrLeft[i], arrRigth[i])) return false;
            }

            if(_.isArray(arrLeft[i]) && _.isNumber(arrRigth[i])) {
                if(!checkRigthNumberArray(arrLeft[i], arrRigth[i])) return false;
            }

        } catch (err) {
            return false;
        }
    }

    return true;
};



const result = inputData.map(entry => checkTopLevel(entry[0], entry[1]));
console.table(result)

console.log(result.reduce((prev, curr, index) => {
    if(curr) return prev + index + 1;

    return prev;
}, 0));

