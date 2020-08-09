function isPalindrome(str = "") {
    const strLc = str.toLowerCase();
    const n = str.length - 1;
    const iterations = Math.floor(str.length / 2);
    for (let i = 0; i < iterations; i++) {
        if (strLc[i] !== strLc[n - i]) {
            return false;
        }
    }
    return true;
}
console.log(isPalindrome("Aba"));

// there's a string "I am in the easycode". It needs to be converted to upper case
// first letter of these words with the use loops "for" and "while"

function setFirstLetterOfEachWordToUpperCase (str) {
    const SPACE = " ";
    let words = str.split(SPACE);
    for (let i = 0; i < words.length; i++) {
        words[i] = words[i].slice(0, 1).toUpperCase() + words[i].slice(1);
    }

    return words.join(SPACE);
}

console.log(setFirstLetterOfEachWordToUpperCase("i am in the easycode"));

// There's a string "tseb eht ma i". Using loops make a string-revert

function revertStr(str) {
    let strReverted = "";
    for (let i = str.length - 1; i >= 0; i--) {
        strReverted += str[i];
    }
    return strReverted;
}

console.log(revertStr("tseb eht ma i"));

// Count factorial of a figure

function getFactorialOfNumber(number) {
    let factorialItem = 1;
    for (let i = 2; i <= number; i++) {
        factorialItem *= i;
    }

    return factorialItem;
}

console.log(getFactorialOfNumber(10));

// With the use of loops output a string "Count to 10: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10"

function countToNumberToStr(n) {
    let str = "Count to " + n + ": ";
    let countStr = "";
    for (let i = 1; i <= n; i++) {
        countStr += i;
    }
    countStr = countStr.split("").join(", ");
    return str + countStr;
}

console.log(countToNumberToStr(5));

// get a new string witch based on the string "JavaScript is a pretty good language"
// First letter of each word needs to be upper case and spaces need to be deleted

function setUpperCaseToEachWordWithoutSpaces(str) {
    const SPACE = " ";
    let words = str.split(SPACE);
    for (let i = 0; i < words.length; i++) {
        words[i] = words[i].slice(0, 1).toUpperCase() + words[i].slice(1);
    }

    return words.join("");
}

console.log(setUpperCaseToEachWordWithoutSpaces("JavaScript is a pretty good language"));

// find all the odd figures from 1 to n and output it in console

function getOddNumbers(n) {
    let OddNumbersToN = [];
    for (let i = 0; i <= n; i++) {
        if (i % 2 !== 0) {
            OddNumbersToN.push(i);
        }
    }

    return OddNumbersToN.join(", ");
}

console.log(getOddNumbers(15));

// functions

// create a func "multiply" what get any quantity of numbers and return their multiply

function multiply() {
    if (!arguments) {
        return 0;
    }
    let result = 1;
    for (let i = 0; i < arguments.length; i++) {
        result *= arguments[i];
    }

    return result;
}

console.log(multiply(1, 2));

// get a factorial of a number with the help of recursion

function getFactorial(n) {
    if (n < 0) {
        return -1;
    }

    return n > 0 ? n * getFactorial(n - 1) : 1;
}

console.log(getFactorial(10));

// create a func what get a string only with letters a return a string where each symbol is separated by space and exchange
// on unicode-value of this one

function getCodeStrFromText(str) {
    const DIVIDER = " ";
    let symbols = "";
    for (let i = 0; i < str.length; i++) {
        symbols += (i === 0 ? "" : DIVIDER) + str[i].charCodeAt(str[i]);
    }

    return symbols;
}

console.log(getCodeStrFromText("hello"));

// create a function-recursive what output each symbol of a string to console

function printChars(str) {
    if (str.length > 1) {
        console.log(str.slice(0, 1));
        str = str.slice(1);

        return printChars(str);
    }
    else {
        return str;
    }
}

console.log(printChars("test"));

function printEachChar(str, char = 0) {
    if (str.length > char) {
        console.log(str[char]);
        return printChars(str, str[char] + 1);
    }
}

console.log(printEachChar("test"));

// create 2 functions. The first one gets an array and a callback. The callback function outputs
// "New value: ChangedArray"

function mapArray(array, callBack) {
    let result = [];
    for (let i = 0; i < array.length; i++) {
        result.push(callBack(array[i]));
    }

    return "New value: " + result;
}

console.log(mapArray(["abc", "123"], revertStr));

function revertStr(str) {
    let result = "";
    for (let j = 0; j < str.length; j++) {
        result += str[str.length - 1 - j];
    }

    return result;
}
