const previousNumberText = document.querySelector("#previous");
const currentNumberText = document.querySelector("#current");
const allClearButton = document.querySelector("#all-clear");
const deleteButton = document.querySelector("#delete");
const divideButton = document.querySelector("#divide");
const equalsButton = document.querySelector("#equals");
const numberButtons = document.querySelectorAll("#number");
const operationButtons = document.querySelectorAll("#operation");

let currentNumber = "";
let previousNumber = "";
let operation = undefined;

function add(previousNumber, currentNumber) {
    return previousNumber + currentNumber
}

function substract(previousNumber, currentNumber) {
    return previousNumber - currentNumber;
}

function multiply(previousNumber, currentNumber) {
    return previousNumber * currentNumber;
}

function divide(previousNumber, currentNumber) {
    if (currentNumber === 0) {
        return "ERR divByZero"
    } else {
        return previousNumber / currentNumber;
    }
}

function operate() {
    let result;
    const prev = parseFloat(previousNumber);
    const current = parseFloat(currentNumber);
    if (isNaN(prev) || isNaN(current)) return;
    switch (operation) {
        case "+":
            result = add(prev, current);
            break;
        case "-":
            result = substract(prev, current);
            break;
        case "x":
            result = multiply(prev, current);
            break;
        case "÷":
            result = divide(prev, current);
            break;
        default:
            return;
    }
    currentNumber = result;
    operation = undefined;
    previousNumber = "";
}

function allClear() {
    currentNumber = "";
    previousNumber = "";
    operation = undefined;
    previousNumberText.innerText = "";
}

function deleteDigit() {
    currentNumber = currentNumber.toString().slice(0, -1)
}

function mergeNumbersForDisplay(number) {
    if (number === "." && currentNumber.includes(".")) return;
    currentNumber = currentNumber.toString() + number.toString();
}

function setOperation(currentOperation) {
    if (currentNumber === "") return
    if (previousNumber !== "") {
        operate()
    }
    operation = currentOperation;
    previousNumber = currentNumber;
    currentNumber = "";
}

function roundNumber(number) {
    const displayNumber = parseFloat(number).toFixed(2);
    if (isNaN(displayNumber)) return "";
    return displayNumber;

}

function display() {
    currentNumberText.innerText = roundNumber(currentNumber);
    if (operation != null) {
        previousNumberText.innerText =
            `${roundNumber(previousNumber)} ${operation} ${roundNumber(currentNumber)}`
    }

}

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        mergeNumbersForDisplay(button.innerText);
        display();
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        setOperation(button.innerText);
        display();
    })
})

equalsButton.addEventListener('click', () => {
    operate();
    display();
    previousNumber = currentNumber;
})

allClearButton.addEventListener('click', () => {
    allClear();
    display();
})

deleteButton.addEventListener('click', () => {
    deleteDigit();
    display();
})


const handleKeyboard = ({ repeat, shiftKey, key }) => {
    if (repeat) return;
    if (shiftKey && key === '+') {
        setOperation("+");
    } else if (key === '-') {
        setOperation("-");
    } else if (shiftKey && key === '/') {
        setOperation("÷");
    } else if (key === '*') {
        setOperation("x");
    } else if (key === "Enter") {
        operate();
        display();
        previousNumber = currentNumber;
    } else if (key === "Backspace") {
        deleteDigit();
        display();
    } else {
        mergeNumbersForDisplay(key);
        display();
    }
}

// KEYBOARD SUPPORT INFO BUTTON OPENER/CLOSER

document.addEventListener('keydown', handleKeyboard)

let modal = document.getElementById("info");
let btn = document.getElementById("info-button");
let span = document.getElementsByClassName("close")[0];

btn.onclick = function () {
    modal.style.display = "block";
}

span.onclick = function () {
    modal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}