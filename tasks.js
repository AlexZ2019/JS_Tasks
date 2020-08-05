function isPalindrome(str = "") {
    const strLc = str.toLowerCase()
    const n = str.length - 1
    const iterations = Math.floor(str.length / 2)
    for (let i = 0; i < iterations; i++) {
        if (strLc[i] !== strLc[n - i]) {
            return false
        }
    }
    return true
}
console.log(isPalindrome("Aba"))

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
        strReverted += str[i]
    }
    return strReverted
}

console.log(revertStr("tseb eht ma i"));

// Count factorial of a figure

function getFactorialOfNumber(number) {
    let factorialItem = 1
    for (let i = 2; i <= number; i++) {
        factorialItem *= i
    }

    return factorialItem
}

console.log(getFactorialOfNumber(10))

// With the use of loops output a string "Count to 10: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10"

function countToNumberToStr(n) {
    let str = "Count to " + n + ": "
    let countStr = ""
    for (let i = 1; i <= n; i++) {
        countStr += i
    }
    countStr = countStr.split("").join(", ")
    return str + countStr
}

console.log(countToNumberToStr(5))

// get a new string witch based on the string "JavaScript is a pretty good language"
// First letter of each word needs to be upper case and spaces need to be deleted

function setUpperCaseToEachWordWithoutSpaces(str) {
    const SPACE = " "
    let words = str.split(SPACE)
    for (let i = 0; i < words.length; i++) {
        words[i] = words[i].slice(0, 1).toUpperCase() + words[i].slice(1)
    }

    return words.join("")
}

console.log(setUpperCaseToEachWordWithoutSpaces("JavaScript is a pretty good language"))

// find all the odd figures from 1 to n and output it in console

function getOddNumbers(n) {
    let OddNumbersToN = []
    for (let i = 0; i <= n; i++) {
        if (i % 2 !== 0) {
            OddNumbersToN.push(i)
        }
    }

    return OddNumbersToN.join(", ")
}

console.log(getOddNumbers(15))

