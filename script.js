function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    if (num2 !== 0) {
        return num1 / num2;
    }
    else {
        return alert('Oh my silly man.You cannot divide by 0')
    }
}

function operate(first, operator, second) {
    if (operator === "+") {
        return add(first, second);
    }
    else if (operator === "-") {
        return subtract(first, second);
    }
    else if (operator === "*") {
        return multiply(first, second);
    }
    else if (operator === "/") {
        return divide(first, second);
    }
}

let display;
window.addEventListener('DOMContentLoaded', () => {
    display = document.getElementById('display');
});

function updateDisplay(element) {
    if (display.textContent === '0') {
        display.textContent = '';
    }
    display.textContent += element;
}

function clearDisplay() {
    display.textContent = '0';
}

function removeElement() {
    display.textContent = display.textContent.slice(0, -1);
}

function solve() {
    const expression = display.textContent;
    let splitedExpression = expression.split(/([+\-*/])/);

    prioritizeOperator(splitedExpression, '*');
    prioritizeOperator(splitedExpression, '/');
    splitedExpression = splitedExpression.filter(x => x !== undefined);

    let result = parseFloat(splitedExpression[0]);
    let currentOperator = '';
    for (let i = 1; i < splitedExpression.length; i++) {
        if (i % 2 !== 0) {
            currentOperator = splitedExpression[i];
        } else {
            result = operate(result, currentOperator, parseFloat(splitedExpression[i]));
        }
    }
    display.textContent = result;
}

function prioritizeOperator(splitedExpression, operator) {
    let countOfMultipleOperators = splitedExpression.filter(x => x === operator).length;
    if (countOfMultipleOperators) {
        let replaced = 0;
        let lastMultipleOperatorIndex = splitedExpression.lastIndexOf(operator);
        if (lastMultipleOperatorIndex !== -1) {
            while (replaced !== countOfMultipleOperators) {
                replaced++;
                if (replaced === countOfMultipleOperators) {
                    const lastOperator = splitedExpression[lastMultipleOperatorIndex - 2];
                    delete splitedExpression[lastMultipleOperatorIndex - 2];
                    splitedExpression.unshift(lastOperator);
                }

                const left = splitedExpression[++lastMultipleOperatorIndex - 1];
                const operator = splitedExpression[lastMultipleOperatorIndex];
                const right = splitedExpression[lastMultipleOperatorIndex + 1];

                delete splitedExpression[lastMultipleOperatorIndex - 1];
                delete splitedExpression[lastMultipleOperatorIndex];
                delete splitedExpression[lastMultipleOperatorIndex + 1];

                splitedExpression.unshift(right);
                splitedExpression.unshift(operator);
                splitedExpression.unshift(left);

                lastMultipleOperatorIndex = splitedExpression.lastIndexOf(operator);
            }
        }
    }
}