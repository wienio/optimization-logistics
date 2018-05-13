const config = require('./config')
const solver = require('javascript-lp-solver')

let foo = {
    [`bar` + 1]: `baz`
};

let model = {
    "optimize": "waste",
    "opType": "min",
    "constraints": {
        "cutA": { "min": 2100 },
        "cutB": { "min": 1200 }
    },
    "variables": {
        "x1": { "cutA": 7, "cutB": 0, "waste": 0.3 },
        "x2": { "cutA": 6, "cutB": 0, "waste": 1 },
        "x3": { "cutA": 5, "cutB": 0, "waste": 1.7 },
        "x4": { "cutA": 4, "cutB": 0, "waste": 2.4 },
        "x5": { "cutA": 3, "cutB": 1, "waste": 0.6 },
        "x6": { "cutA": 2, "cutB": 1, "waste": 1.3 },
        "x7": { "cutA": 1, "cutB": 1, "waste": 2 },
        "x8": { "cutA": 0, "cutB": 2, "waste": 0.2 }
    }
}

console.log(solver.Solve(model));

document.addEventListener('DOMContentLoaded', () => {
    let inputType = '<input type="text"/>'

    for (let i = 1; i <= config.columns; ++i) {
        let textMethod = `<h4>Sposób ${i}</h4>`

        let divArray = []

        for (let j = 0; j < config.rows; ++j) {
            divArray.push(document.createElement('div'))
            divArray[j].className = 'cell'

            if (divArray.length !== 1) {
                divArray[j].innerHTML = inputType
            } else {
                divArray[j].innerHTML = textMethod
            }
        }

        let rows = document.getElementsByClassName('row')

        divArray.forEach((elem, index) => {
            rows[index].appendChild(elem)
        })

    }
}, false)