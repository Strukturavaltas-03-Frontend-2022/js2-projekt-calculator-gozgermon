const calcInput = document.getElementById("calc-input")


const ParseCalcInput = function () {
    let mathOperations = []
    let inputString = calcInput.value
    for (let i = 0; i < inputString.length; i++) {
        switch (inputString[i]) {
            case "+":
                mathOperations.push('+')
                inputString = inputString.substring(0, i) + " " + inputString.substring(i + 1)
                break
            case "-":
                mathOperations.push('-')
                inputString = inputString.substring(0, i) + " " + inputString.substring(i + 1)
                break
            case "x":
                mathOperations.push('x')
                inputString = inputString.substring(0, i) + " " + inputString.substring(i + 1)
                break
            case "/":
                mathOperations.push('/')
                inputString = inputString.substring(0, i) + " " + inputString.substring(i + 1)
                break
            default:
        }
    }

    inputString = inputString.replace(/\s+/g, ' ').trim();/*remove extra spaces*/

    let numArray = inputString.split(" ")

    numArray = numArray.map(item => Number(item))

    if (numArray.length == mathOperations.length + 1) /*ha nincs rossz helyen művelet*/ {

        let calcResult = numArray[0]

        for (i = 0; i < mathOperations.length; i++) {
            switch (mathOperations[i]) {
                case "+":
                    calcResult = calcResult + numArray[i + 1]
                    break
                case "-":
                    calcResult = calcResult - numArray[i + 1]
                    break
                case "x":
                    calcResult = calcResult * numArray[i + 1]
                    break
                case "/":
                    calcResult = calcResult / numArray[i + 1]
                    break
                default:
            }

            if (isNaN(calcResult)) {
                calcInput.value = "ErrorBadNumber"
                break
            }

            if (!isFinite(calcResult)) {
                calcInput.value = "ErrorZeroDiv"
                break
            }

            calcInput.value = calcResult.toString()
        }
    }
    else {
        calcInput.value = "ErrorBadOperators"
    }
}


const ClickHandler = function () {
    switch (this.id) {
        case "C":
            calcInput.value = "";
            break;
        case "=":
            ParseCalcInput();
            break

        default:
            calcInput.value = calcInput.value.concat(this.id)
    }
}


const AddClickHandle = () => {
    let tiles = document.querySelectorAll(".tile");
    for (i = 0; i < tiles.length; i = i + 1) {
        tiles[i].addEventListener("click", ClickHandler);
    }
}


AddClickHandle()