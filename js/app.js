const config = require('./config')
const CutMethod = require('./cutMethod')

const addition = (a, b) => {
    return a + b
}

const minimum = (a, b) => {
    return Math.min(a, b)
}

var allMethods = []

// pipes length
var firstLength = 0.8
var secondLength = 1.1

// orders
var firstOrderAmount = 400
var secondOrderAmount = 1200

// ways of cutting
var firstCut = [5, 4, 2, 1, 0]
var secondCut = [0, 1, 2, 3, 4]

// wastes
var wasteInMeters = [0.4, 0.1, 0.6, 0.3, 0]
var wasteInPLN = [8, 2, 12, 6, 0]

/*
look for linear programming (simpleks method?)
*/

var result = firstCut.reduce(addition)

var method1 = new CutMethod('sss', 1, 2)

console.log(method1)