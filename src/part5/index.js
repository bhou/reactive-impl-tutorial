const Node = require("./Node");

class ArraySourceNode extends Node {
  constructor(options, eventemitter) {
    super(options, eventemitter);
    this.source = this.options;
    this.index = 0;
  }

  onRequest(cmd) {
    if (this.source.length === this.index) {
      this.send(Node.END);
      this.index++;
    } else if (this.source.length > this.index) {
      this.send(this.source[this.index]);
      this.index++;
    }
  }
}

module.exports = {
  Node : Node,

  addOperator : (name, operator) => {
    function fn(...args) {
      let node = operator(...args);
      return this.to(node);
    };

    Node.prototype[name] = fn;
  },

  asList : (array) => {
    return new ArraySourceNode(array);
  }
}
