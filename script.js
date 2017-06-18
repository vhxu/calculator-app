var calculator = {
  equation: [],
  calculator: [],
  result:'',

  addValues: function(values) {
    this.calculator.push(values);
    if (this.calculator[this.calculator.length-1] === '+' || this.calculator[this.calculator.length-1] === '-' || this.calculator[this.calculator.length-1] === '*' || this.calculator[this.calculator.length-1] === '/') {
      // for (var i=0; i < this.calculator.length-1; i++) {
      //   this.equation1.push(this.calculator[i]);
    } else if (this.calculator[this.calculator.length-2] === '+' || this.calculator[this.calculator.length-2] === '-' || this.calculator[this.calculator.length-2] === '*' || this.calculator[this.calculator.length-2] === '/') {
      this.equation = [];
      this.equation.push(values);
    } else {
      this.equation.push(values);
    }
    console.log(this.calculator);
    console.log(this.equation);
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
