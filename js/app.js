const config = require('./config')
const solver = require('javascript-lp-solver')

let constants

let foo = {
    [`bar` + 1]: `baz`
};

let model2 = {
    'optimize': 'wastePLN',
    'opType': 'min',
    "variables": {}
}

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

    for (let i = 1; i <= config.columns; ++i) {
        let textMethod = `<h4>Sposób ${i}</h4>`
        let divArray = []

        for (let j = 0; j < config.rows; ++j) {
            divArray.push(document.createElement('div'))
            divArray[j].className = 'cell'
            
            let inputType = '<input placeholder="0" type="text" id="'

            switch(j) {
                case 1:
                    inputType += 'cut-first-method' + i
                    break
                case 2:
                    inputType += 'cut-second-method' + i
                    break
                case 3:
                    inputType += 'cut-waste-meters' + i
                    break
                case 4:
                    inputType += 'cut-waste-cost' + i
            }

            inputType += '"/>'

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

let saveConstants = () => {
    let pipeLength = document.getElementById('pipe-length')
    let priceOfWastePer1m = document.getElementById('pipe-waste-cost')
    let orderedAmountSet1 = document.getElementById('set-amount1')
    let orderedAmountSet2 = document.getElementById('set-amount2')
    let firstLength = document.getElementById('first-length')
    let secondLength = document.getElementById('second-length')

    if(pipeLength.value && priceOfWastePer1m.value && orderedAmountSet1.value && orderedAmountSet2.value && firstLength.value && secondLength.value) {
        let constants = {
            'totalLength': Number (pipeLength.value),
            'pricePer1mWaste': Number (priceOfWastePer1m.value),
            'set1Amount': Number (orderedAmountSet1.value),
            'set2Amount': Number (orderedAmountSet2.value),
            'firstLength': Number (firstLength.value),
            'secondLength': Number (secondLength.value)
        }
        return constants
    }
}

let calcMethods = () => {

    let variables = { }

    if(constants.firstLength > constants.totalLength || constants.secondLength > constants.totalLength) {
        alert('Podane długości belek są błędne!')
        return
    }

    for(let i = 1 ; i <= config.columns; ++i) {
        let firstCutAmount = Number (document.getElementById('cut-first-method' + i).value)
        let secondCutAmount = Number (document.getElementById('cut-second-method' + i).value)

        let firstCuttingLength = firstCutAmount * constants.firstLength 
        let secondCuttingLength = secondCutAmount * constants.secondLength

        if(firstCuttingLength + secondCuttingLength > constants.totalLength) {
            alert('Wprowadzono błędne sposoby cięcia! Za krótka belka do cięcia w podany sposób.')
            return
        }

        let totalWaste = Number ((constants.totalLength - firstCuttingLength - secondCuttingLength).toFixed(2))
        let totalCostWaste = Number ((constants.pricePer1mWaste * totalWaste).toFixed(2))

        let cutWasteMeter = document.getElementById('cut-waste-meters' + i)
        let cutWasteCost = document.getElementById('cut-waste-cost' + i)

        cutWasteMeter.value = totalWaste
        cutWasteMeter.disabled = true

        cutWasteCost.value = totalCostWaste
        cutWasteCost.disabled = true

        let variable = {
            'cutA': firstCutAmount,
            'cutB': secondCutAmount,
            'wasteM': totalWaste,
            'wastePLN': totalCostWaste
        }

        model2.variables[`x${i}`] = variable
    }

    model2['constraints'] = {
        'cutA': constants.set1Amount,
        'cutB': constants.set2Amount
    }

    console.log(model2)
}

document.getElementById('calc-wastes').addEventListener('click', () => {
    constants = saveConstants();

    if(!constants) {
        alert('Uzupełnij początkowe dane!')
        return
    }

    calcMethods()

    document.getElementById('calc-model').disabled = false
}, false)

document.getElementById('calc-model').addEventListener('click', () => {

}, false)