var calculator = {
  calculator: [],
  result:'',

  addValues: function(values) {
    this.calculator.push(values);
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
  }
};

var handlers = {
  addValues: function(value) {
    calculator.addValues(value);
    view.displayMath();
  },
  equals: function() {
    calculator.doMath();
    view.displayMath();
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
    equationLi.innerHTML = calculator.calculator.join('');
    equation.appendChild(equationLi);
  }
};

//AC, +/-, %, /
//7, 8, 9 , x
//4, 5, 6, -
//1, 2, 3, +
//0, ., =
