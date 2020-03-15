let display = document.querySelector('#input');
let digits = document.querySelectorAll('.digit');
let operators = document.querySelectorAll('.operators');
let del = document.querySelector('.buttDEL');
let equal = document.querySelector('.equal');

class Calculator {
  constructor() {
    this.expression;
    this.operations = [];
    this.numbers = [];
  }

  setExpression(expression) {
    this.expression = expression;
    this.calculate();
  }

  calculate() {
    this.clearData();
    this.parseExpression();
    this.showResult(this.getResult());
  }

  clearData() {
    this.operations = [];
    this.numbers = [];
  }

  parseExpression() {
    let operands = ['+', '-', '*', '/'];
    let digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    let value = '';

    if (operands.indexOf(this.expression[this.expression.length - 1]) !== -1) {
      this.expression = this.expression.slice(0, this.expression.length - 1);
    }

    for (let i = 0; i < this.expression.length; i++) {
      if (operands.indexOf(this.expression[i]) !== -1) {
        this.operations.push(this.expression[i]);
        this.numbers.push(Number(value));
        value = '';
      }

      if (digits.indexOf(this.expression[i]) !== -1  || this.expression[i] === '.') {
        value += this.expression[i];
      }
    }

    if (value !== '') {
      this.numbers.push(Number(value));
    }
  }

  getResult() {
    let firstNumber = this.numbers[0];
    let secondNumber = this.numbers[1];

    for (let i = 0; i < this.numbers.length; i++) {

      switch (this.operations[i]) {
        case '+' :
          firstNumber += secondNumber;
          break;

        case '-' :
          firstNumber -= secondNumber;
          break;

        case '*' :
          firstNumber *= secondNumber;
          break;

        case '/' :
          if (secondNumber !== 0) {
            firstNumber /= secondNumber;
          } else
            return 'error';
          break;
      }
      secondNumber = this.numbers[i + 2];
    }
    return firstNumber;
  }

  showResult (result) {
    display.value = result;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const calculator = new Calculator();
  let operands = ['-', '+', '*', '/'];
  let numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  for (let digit of digits) {
    digit.onclick = function () {
      display.value += digit.textContent;
    }
  }

  for (let operator of operators) {
    operator.onclick = function () {
      if (display.value.length !== 0) {
        display.value += operator.textContent;
      }
      if (operands.indexOf(display.value[display.value.length - 2]) !== -1) {
        display.value = display.value.slice(0, display.value.length - 2) + display.value[display.value.length - 1];
      }
    };
  }

  display.oninput = function () {
    if (display.value[display.value.length - 1] === '=') {
      calculator.setExpression(display.value);
    }

    if (operands.indexOf(display.value[display.value.length - 1]) === -1 &&
      numbers.indexOf(display.value[display.value.length - 1]) === -1 &&
      display.value[display.value.length - 1] !== '.') {
      display.value = display.value.slice(0, display.value.length - 1);
    } else if (operands.indexOf(display.value[display.value.length - 2]) !== -1 &&
      operands.indexOf(display.value[display.value.length - 1]) !== -1) {
      display.value = display.value.slice(0, display.value.length - 2) + display.value[display.value.length - 1];
    } else if (operands.indexOf(display.value[0]) !== -1) {
      display.value = display.value.slice(1, display.value.length);
    }
  };

  del.onclick = function () {
    display.value = '';
  };

  equal.onclick = function () {
    calculator.setExpression(display.value);
  }
});
