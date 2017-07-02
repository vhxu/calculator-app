var calculator = {
  equation: [],
  calculator: [],
  result:'',
  operatorLocation:'',
  savedOperation:[],

  addValues: function(values) {
    this.calculator.push(values);
    if (this.operatorLocation > 0) {
      this.savedOperation.push(values);
    }
    if (this.calculator[0] == this.result && !isNaN(this.calculator[1])) {
      this.equation.splice(0, 1);
      this.equation.push(values);
      this.calculator.splice(0, 1);
    } else if (this.calculator[this.calculator.length-2] === '+' || this.calculator[this.calculator.length-2] === '-' || this.calculator[this.calculator.length-2] === '*' || this.calculator[this.calculator.length-2] === '/') {
      // if second to last value in array is an operator, make euqation array empty
      this.equation = [];
      this.equation.push(values);
    } else {
      this.equation.push(values);
    }
    console.log(this.calculator);
    console.log(this.equation);
  },
  addOperator: function(operator) {
    this.savedOperation=[];
    if (operator == this.calculator[this.calculator.length-1]) {

    } else if (this.calculator[this.calculator.length-1] === '+' || this.calculator[this.calculator.length-1] === '-' || this.calculator[this.calculator.length-1] === '*' || this.calculator[this.calculator.length-1] === '/'){
      this.calculator.splice(this.calculator.length-1, 1, operator);
      this.savedOperation[0] = operator;
    } else {
      this.calculator.push(operator);
      this.operatorLocation = 1;
      this.savedOperation.push(operator);
    }
    console.log(this.operatorLocation);
    console.log(this.savedOperation);
    console.log(this.calculator);
    console.log(this.equation);
  },
  addDecimal: function() {
    var joinedEquation = this.equation.join('');
    if (joinedEquation.split('.').length === 1 && this.equation[this.equation.length-1] != '.') {
      this.equation.push('.');
      this.calculator.push('.');
    }
    console.log(this.equation);
    console.log(this.calculator);
  },
  deleteValues: function() {
    this.calculator.splice(-1, 1);
    console.log(this.calculator);
  },
  doMath: function() {
    if (this.calculator[0] == this.result && this.calculator.length == 1) {
      this.result = eval((this.calculator.concat(this.savedOperation)).join(''));
      this.calculator.splice(0, 1, this.result.toString());
      this.equation.splice(0, 1, this.result.toString());
    } else {
      this.result = eval(this.calculator.join(''));
      this.calculator.splice(0,this.calculator.length,this.result.toString());
      this.equation.splice(0,this.calculator.length,this.result.toString());
    }


    console.log(this.result);
    console.log(this.equation);
    console.log(this.calculator);
  },
  clearAll: function() {
    this.equation.splice(0,this.equation.length);
    this.calculator.splice(0,this.calculator.length);
    console.log(this.calculator);
  },
  plusMinus: function() {
    if (this.equation[0] === "-") {
      this.calculator.splice(this.calculator.length-this.equation.length, 1);
      this.equation.shift();
    } else {
      this.calculator.splice(this.calculator.length-this.equation.length, 0, '-');
      this.equation.unshift('-');
    }
    console.log(this.calculator);
    console.log(this.equation);
  },
  percent: function() {
    if (this.equation.length > 0) {
      var percentNumber = eval(this.equation.join('') + '/100');
      var percentNumberString = percentNumber.toString();
      this.calculator.splice(this.calculator.length-this.equation.length, this.equation.length);
      this.equation = [];
      for (var i = 0; i < percentNumberString.length; i++) {
        this.equation.push(percentNumberString[i]);
      }
      this.calculator = this.calculator.concat(this.equation);
      console.log(this.calculator);
      console.log(this.equation);
    }
  }
};

var handlers = {
  addValues: function(value) {
    calculator.addValues(value);
    view.displayMath();
  },
  addOperator: function(operator) {
    calculator.addOperator(operator);
    view.displayMath();
  },
  addDecimal: function() {
    calculator.addDecimal();
    view.displayMath();
  },
  equals: function() {
    calculator.doMath();
    view.displayResults();
  },
  clear: function() {
    calculator.clearAll();
    view.displayMath();
  },
  plusMinus: function() {
    calculator.plusMinus();
    view.displayMath();
  },
  percent: function() {
    calculator.percent();
    view.displayMath();
  }
};

var keys = [];
window.addEventListener('keydown', myEventHandler);

function myEventHandler(e) {
  keys[e.keyCode] = true;
  if (keys[48] || keys[96]) {
    handlers.addValues('0');
  } else if (keys[49] || keys[97]) {
    handlers.addValues('1');
  } else if (keys[50] || keys[98]) {
    handlers.addValues('2');
  } else if (keys[51] || keys[99]) {
    handlers.addValues('3');
  } else if (keys[52] || keys[100]) {
    handlers.addValues('4');
  } else if (keys[53] || keys[101]) {
    handlers.addValues('5');
  } else if (keys[54] || keys[102]) {
    handlers.addValues('6');
  } else if (keys[55] || keys[103]) {
    handlers.addValues('7');
  } else if (keys[56] || keys[104]) {
    handlers.addValues('8');
  } else if (keys[57] || keys[105]) {
    handlers.addValues('9');
  } else if (keys[190] || keys[110]) {
    handlers.addDecimal('.');
  } else if (keys[191] || keys[111]) {
    handlers.addOperator('/');
  } else if (keys[56] && keys[16] || keys[106] || keys[88]) {
    handlers.addOperator('*');
  } else if (keys[189] || keys[109]) {
    handlers.addOperator('-');
  } else if (keys[187] && keys[16] || keys[107]) {
    handlers.addOperator('+');
  } else if (keys[187] || keys[13]) {
    handlers.equals();
  } else if (keys[8] || keys[46]) {
    handlers.clear();
  } else if (keys[53] && keys[16]) {
    handlers.percent();
  }
};

window.addEventListener('keyup', keyReset)
function keyReset(e) {
  keys[e.keyCode] = false;
};

var view = {
  displayMath: function() {
    // var equation = document.querySelector('ul');
    // equation.innerHTML = '';
    // var equationLi = document.createElement('li');
    // equationLi.innerHTML = calculator.equation.join('');
    // equation.appendChild(equationLi);
    var equation = document.querySelector('.result');
    equation.innerHTML = '';
    equation.innerHTML = calculator.equation.join('');
  },
  displayResults: function() {
    var equation = document.querySelector('.result');
    equation.innerHTML = '';
    equation.innerHTML = calculator.result;
  }
};

//AC, +/-, %, /
//7, 8, 9 , x
//4, 5, 6, -
//1, 2, 3, +
//0, ., =
