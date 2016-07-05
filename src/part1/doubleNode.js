const Node = require("./Node");

class DoubleNode extends Node {
  onReceive(signal) {
    this.send(signal * 2);
  }
}

class PrintNode extends Node {
  onReceive(signal) {
    console.log(signal);
  }
}

var double = new DoubleNode();
var print = new PrintNode();

double
  .to(print);

double
  .push(1)
  .push(2)
  .push(3);
