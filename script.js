var calculator = {
  equation: [],
  calculator: [],
  result:'',

  addValues: function(values) {
    this.calculator.push(values);
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
    this.calculator.push(operator);
    console.log(this.calculator);
  },
  deleteValues: function() {
    this.calculator.splice(-1, 1);
    console.log(this.calculator);
  },
  doMath: function() {
    var equation = this.calculator.join('');
    this.result = eval(equation);
    this.calculator.splice(0,this.calculator.length,this.result.toString());
    this.equation.splice(0,this.calculator.length,this.result.toString());
    console.log(this.result);
    console.log(this.calculator);
  },
  clearAll: function() {
    this.calculator.splice(0,this.calculator.length);
    console.log(this.calculator);
  },
  plusMinus: function() {
    if (this.calculator[0] === "-") {
      this.calculator.shift();
    } else {
      this.calculator.unshift("-");
    }
    console.log(this.calculator);
  },
  percent: function() {


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
  }
};

var view = {
  displayMath: function() {
    var equation = document.querySelector('ul');
    equation.innerHTML = '';
    var equationLi = document.createElement('li');
    equationLi.innerHTML = calculator.equation.join('');
    equation.appendChild(equationLi);
  },
  displayResults: function() {
    var equation = document.querySelector('ul');
    equation.innerHTML = '';
    var equationLi = document.createElement('li');
    equationLi.innerHTML = calculator.result;
    equation.appendChild(equationLi);
  }
};

//AC, +/-, %, /
//7, 8, 9 , x
//4, 5, 6, -
//1, 2, 3, +
//0, ., =
