class Calculator {
  constructor(option) {
    this.option; //Todo rename option to expression
    this.numbers = [];
    this.operation = [];
  }

  getOption(option) {
    this.option = option; // Todo setExpression
  }

  calculate() {
    this.clearCache();
    this.getNumbers();
    this.getOperation();
    this.showResult(this.getResults());
  }

  clearCache() { //Todo rename in clear
    this.numbers.splice(0, this.numbers.length);
    this.operation.splice(0, this.operation.length);
  }

  getNumbers() {
    let val = '';
    const operstors = ['+', '-', '*', '/'];
    for (let i = 0; i < this.option.length; i++) {
      if (operstors.indexOf(this.option[i])!==-1) {
        this.numbers.push(Number(val));
        val = '';
      } else {
        if (Number.isFinite(Number(this.option[i]))) {
          val += this.option[i];
        }
      }
    }
    this.numbers.push(Number(val));
  }

  getOperation() {
    for (let i = 0; i < this.option.length; i++) {
      if (this.option[i] === '-' || this.option[i] === '+' ||
        this.option[i] === '*' || this.option[i] === '/') {
        this.operation.push(this.option[i]);
      }
    }
  }

  getResults() {
    let result;
    switch (this.operation[0]) {
      case '+' :
        result = this.numbers[0] + this.numbers[1];
        break;

      case '-' :
        result = this.numbers[0] - this.numbers[1];
        break;

      case '*' :
        result = this.numbers[0] * this.numbers[1];
        break;

      case '/' :
        if (this.numbers[1] !== 0) {
          result = this.numbers[0] / this.numbers[1];
        } else result = 'error';
        break;
    }
    return result;
  }

  showResult(result) {
    document.querySelector('#screen').value = result;
  }

  showOperation(button) {
    document.querySelector('#screen').value += button;
  }

  clearScreen() {
    document.querySelector('#screen').value = '';
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const calculator = new Calculator();

  document.querySelector('#btnEqual').addEventListener('click', function () {
    const screen = document.querySelector('#screen').value;
    calculator.getOption(screen);
    calculator.calculate();
  })

  document.querySelector('#btn1').addEventListener('click', function () {
    calculator.showOperation('1');
  })

  document.querySelector('#btn2').addEventListener('click', function () {
    calculator.showOperation('2');
  })

  document.querySelector('#btn3').addEventListener('click', function () {
    calculator.showOperation('3');
  })

  document.querySelector('#btn4').addEventListener('click', function () {
    calculator.showOperation('4');
  })

  document.querySelector('#btn5').addEventListener('click', function () {
    calculator.showOperation('5');
  })

  document.querySelector('#btn6').addEventListener('click', function () {
    calculator.showOperation('6');
  })

  document.querySelector('#btn7').addEventListener('click', function () {
    calculator.showOperation('7');
  })

  document.querySelector('#btn8').addEventListener('click', function () {
    calculator.showOperation('8');
  })

  document.querySelector('#btn9').addEventListener('click', function () {
    calculator.showOperation('9');
  })

  document.querySelector('#btn0').addEventListener('click', function () {
    calculator.showOperation('0');
  })

  document.querySelector('#btnSlash').addEventListener('click', function () {
    calculator.showOperation('/');
  })

  document.querySelector('#btnPlus').addEventListener('click', function () {
    calculator.showOperation('+');
  })

  document.querySelector('#btnMinus').addEventListener('click', function () {
    calculator.showOperation('-');
  })

  document.querySelector('#btnStar').addEventListener('click', function () {
    calculator.showOperation('*');
  })

  document.querySelector('#btnC').addEventListener('click', function () {
    calculator.clearScreen();
  })
})

document.getElementById('container').addEventListener('click', (e)=> {
  console.log(e.target.value)
})

