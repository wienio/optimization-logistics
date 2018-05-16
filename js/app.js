const config = require('./config')
const solver = require('javascript-lp-solver')

let constants

let model = {
    'optimize': 'wastePLN',
    'opType': 'min',
    'variables': {},
    'constraints': {}
}

document.addEventListener('DOMContentLoaded', () => {

    for (let i = 1; i <= config.columns; ++i) {
        let textMethod = `<h4>Sposób ${i}</h4>`
        let divArray = []

        for (let j = 0; j < config.rows; ++j) {
            divArray.push(document.createElement('div'))
            divArray[j].className = 'cell'

            let inputType = '<input placeholder="0" type="text" id="'

            switch (j) {
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

    if (pipeLength.value && priceOfWastePer1m.value && orderedAmountSet1.value && orderedAmountSet2.value && firstLength.value && secondLength.value) {
        let constants = {
            'totalLength': Number(pipeLength.value),
            'pricePer1mWaste': Number(priceOfWastePer1m.value),
            'set1Amount': Number(orderedAmountSet1.value),
            'set2Amount': Number(orderedAmountSet2.value),
            'firstLength': Number(firstLength.value),
            'secondLength': Number(secondLength.value)
        }
        return constants
    }
}

let calcMethods = () => {

    let variables = {}

    if (constants.firstLength > constants.totalLength || constants.secondLength > constants.totalLength) {
        alert('Podane długości belek są błędne!')
        return
    }

    for (let i = 1; i <= config.columns; ++i) {
        let firstCutAmount = Number(document.getElementById('cut-first-method' + i).value)
        let secondCutAmount = Number(document.getElementById('cut-second-method' + i).value)

        let firstCuttingLength = firstCutAmount * constants.firstLength
        let secondCuttingLength = secondCutAmount * constants.secondLength

        if (firstCuttingLength + secondCuttingLength > constants.totalLength) {
            alert('Wprowadzono błędne sposoby cięcia! Za krótka belka do cięcia w podany sposób.')
            return
        }

        let totalWaste = Number((constants.totalLength - firstCuttingLength - secondCuttingLength).toFixed(2))
        let totalCostWaste = Number((constants.pricePer1mWaste * totalWaste).toFixed(2))

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

        model.variables[`x${i}`] = variable
    }

    let cutA = {
        'min': constants.set1Amount
    }

    let cutB = {
        'min': constants.set2Amount
    }

    model.constraints['cutA'] = cutA
    model.constraints['cutB'] = cutB
}

document.getElementById('calc-wastes').addEventListener('click', () => {
    constants = saveConstants();

    if (!constants) {
        alert('Uzupełnij początkowe dane!')
        return
    }

    calcMethods()

    document.getElementById('calc-model').disabled = false
}, false)

document.getElementById('calc-model').addEventListener('click', () => {
    let result = solver.Solve(model)
    let resultText = 'Należy ciąć sposobami:<br>'
    let resultDiv = document.getElementById('result')

    if(!result.feasible) {
        alert('Nie można wyznaczyć rozwiązania dla podanych wartości.')
        resultText = 'Brak rozwiązania!'
        resultDiv.innerHTML = resultText
        return;
    }

    Object.keys(result).forEach((key) => {
        if(key.startsWith('x')) {
            resultText += `Sposobem ${key.substr(1)}: ${result[key]} razy<br>`
        }
    })
    resultDiv.innerHTML = resultText
}, false)