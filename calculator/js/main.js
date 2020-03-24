class Calculator {
  constructor(expression) {
    this.expression = expression;
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

    console.log(this.numbers);
    console.log(this.operations);

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

}

class ExpressionValidator {
  constructor(display) {
    this.display = display;
    this.digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    this.operators = ['-', '+', '*', '/',];
    this.char = null;
    this.isDot = false;
  }

  setChar(value) {
    this.char = value;
  }

  getExpression() {
  if(this.checkExpression()) {
    this.display.value += this.char;
  }

  }

  checkExpression() {
    return this.checkEqual() && this.checkChar() && this.checkDoubleSymbols() && this.checkDot() && this.checkOperators();
  }

  checkChar(){
    if(this.digits.indexOf(this.char) === -1 &&
      this.operators.indexOf(this.char) === -1 && this.char !== '.'){
      return 0;
    }
    return 1;
  }

  checkDoubleSymbols() {
    if (this.operators.indexOf(this.display.value[this.display.value.length - 1]) !== -1
      && this.operators.indexOf(this.char) !== -1) {
      this.display.value = this.display.value.slice(0, [this.display.value.length - 1]) + this.char;
      return 0;
    }

    if (this.display.value[this.display.value.length - 1] === '.' && this.char === '.') {
      return 0;
    }

    if (this.operators.indexOf(this.display.value[this.display.value.length - 1]) !== -1 && this.char === '.' ||
      this.operators.indexOf(this.char) !== -1 && this.display.value[this.display.value.length - 1] === '.') {
      return 0;
    }

    return 1;
  }

  checkDot() {
    if(this.char === '.') {
      if(this.display.value === ''){
        return 0;
      }

      if (this.isDot) {
        return 0;
      }
      else {
        this.isDot = true;
      }
    }

    return 1;
  }

  checkOperators() {
    if (this.operators.indexOf(this.char) !== -1) {
      if(this.display.value === ''){
        return 0;
      }
      if (this.isDot) {
        this.isDot = false;
      }
    }
    return 1;
  }

  checkEqual() {
    if (this.char === '=') {
      if (this.operators.indexOf(this.display.value[this.display.value.length - 1]) !== -1) {
        this.display.value = this.display.value.slice(0, this.display.value.length - 1);
      }
      const calculator = new Calculator(this.display.value);
      calculator.parseExpression();
      this.display.value = calculator.getResult();

      return 0;
    }

    return 1;
  }

  clearScreen() {
    this.display.value = '';
  }

}

document.addEventListener("DOMContentLoaded", function () {
  let display = document.querySelector('#input');
  const deleteBtn = document.querySelector('.buttDel');
  const buttons = document.querySelector('.bottom');
  const expressionValidator = new ExpressionValidator(display);

  deleteBtn.addEventListener('click', () => {
    expressionValidator.clearScreen();
  });

  buttons.addEventListener('click', (e)=> {
    expressionValidator.setChar(e.target.textContent);
    expressionValidator.getExpression(display);
  });

  display.addEventListener('input', () => {
    expressionValidator.setChar(display.value[display.value.length - 1]);
    display.value = display.value.slice(0, display.value.length - 1);
    expressionValidator.getExpression(display);
  })

});
