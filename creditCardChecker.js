// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8];
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9];
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6];
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5];
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6];

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5];
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3];
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4];
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5];
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4];

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4];
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9];
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3];
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3];
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3];

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5];

// Add your functions below:

/*
 * The function `validateCred` checks if a given array of numbers is a valid credit card number.
 * @param _array - The `_array` parameter is an array of numbers representing a credit card number.
 * Each element in the array represents a digit of the credit card number.
 * @returns a boolean value. It returns true if the sum of the results modulo 10 is equal to 0,
 * indicating that the credit card number is valid. It returns false otherwise.
 */
function validateCred(_array) {
    let sumOfResults = 0; //modulo this by 10 to get a 0 at the end
    for (let i = _array.length -1; i >= 0; i -= 2) {
        sumOfResults += _array[i];
        //console.log(i + ' : ' + sumOfResults);
        let doubledDigit = 0;
        doubledDigit = _array[i-1] * 2;
        if (doubledDigit > 9) {
            doubledDigit -= 9;           
        };
        //console.log('dD: ' + doubledDigit);
        sumOfResults += doubledDigit;
    };
    //console.log('sumOfResults = ' + sumOfResults);
    //console.log(sumOfResults %10 === 0);
    return sumOfResults %10 === 0;
};

/**
 * The function `findInvalidCards` takes in a nested array of credit card numbers and returns an array
 * of invalid card numbers.
 * @param _nestedArray - The `_nestedArray` parameter is an array of arrays. Each inner array
 * represents a credit card number.
 */
function findInvalidCards(_nestedArray) {
    let returnArrayOfInvalidCards = [];
    for (let i = 0; i < _nestedArray.length; i++) {
         if (!validateCred(_nestedArray[i])); {
            returnArrayOfInvalidCards.push(_nestedArray[i]);
         };
    };
};

/*
 * The function `idInvalidCardCompanies` takes in an array of credit card numbers and returns an array
 * of the companies that issued invalid cards.
 * @param _nestedArray - The `_nestedArray` parameter is an array of credit card numbers. Each credit
 * card number is represented as a string, where each digit of the credit card number is separated by a
 * comma. For example, ["4,5,6,7,8,9", "3,2,1
 * @returns The function `idInvalidCardCompanies` returns an array containing the names of the credit
 * card companies that have invalid cards in the input nested array `_nestedArray`.
 */
function idInvalidCardCompanies(_nestedArray) {
    let returnArrayOfInvalidCards = [];
    let amexFlag = false;
    let visaFlag = false;
    let mastercardFlag = false;
    let discoverFlag = false;
    let unknownFlag = false;
    let x = 0;

    for (let i = 0; i < _nestedArray.length -1; i++) {
        if (!validateCred(_nestedArray[i])) {
            console.log('Valid' + i + ': ' +_nestedArray[i].slice(0,1)); //log
            x = Number(_nestedArray[i].slice(0,1));
            switch (x) {
                case 3:
                    if (!amexFlag) {
                        amexFlag = true;
                        returnArrayOfInvalidCards.push('Amex (American Express)');
                    } 
                    break;                   
                case 4:
                    if (!visaFlag) {
                        visaFlag = true;
                        returnArrayOfInvalidCards.push('Visa');
                    }
                    break;                  
                case 5:
                    if(!mastercardFlag) {
                        mastercardFlag = true;
                        returnArrayOfInvalidCards.push('Mastercard');
                    }
                    break;    
                case 6:
                    if(!discoverFlag) {
                        discoverFlag = true;
                        returnArrayOfInvalidCards.push('Discover');
                    }   
                    break;
                default:
                    if(!unknownFlag){
                    unknownFlag = true;
                    returnArrayOfInvalidCards.push('Company not found')
                };
            };  
        };   

    };
    return returnArrayOfInvalidCards;
};

//console.log(validateCred([4,5,3,9,6,8,9,8,8,7,7,0,5,7,9,8]));
//findInvalidCards(batch);
console.log('Final Output: ' + idInvalidCardCompanies(batch));

