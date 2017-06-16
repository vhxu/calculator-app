var calculator = {
  calculator: [],

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
    console.log(eval(equation));
  },
  clear: function() {
    this.calculator.splice(0,this.calculator.length);
    console.log(this.calculator);
  }
};

var handlers = {
  addValues: function(value) {
    //var addValueInput = document.getElementById('test');
    calculator.addValues(value);
    // addValueInput.value = '';
  },
  equals: function() {
    calculator.doMath();
  }
}

//AC, +/-, %, /
//7, 8, 9 , x
//4, 5, 6, -
//1, 2, 3, +
//0, ., =
