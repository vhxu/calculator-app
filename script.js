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
  // setEventListeners: function() {
  //   var keyPad = document.querySelector('.buttons');
  //   keyPad.addEventListener('click', function(event) {
  //     if (event.target.className ==='button') {
  //       console.log('hi');
  //       var button = event.target.dataset.char;
  //     }
  //   });
  // }
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

//handlers.setEventListeners();

//AC, +/-, %, /
//7, 8, 9 , x
//4, 5, 6, -
//1, 2, 3, +
//0, ., =
