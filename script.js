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
  }
}
