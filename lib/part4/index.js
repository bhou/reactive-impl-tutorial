const Node = require("./Node");

class ArraySourceNode extends Node {
  constructor(options, eventemitter) {
    super(options, eventemitter);
    this.source = this.options;

    this.source.forEach(v => this.send(v));

    this.send(Node.END);
  }
}

module.exports = {
  Node: Node,

  addOperator: (name, operator) => {
    function fn(...args) {
      let node = operator(...args);
      return this.to(node);
    };

    Node.prototype[name] = fn;
  },

  asList: array => {
    return new ArraySourceNode(array);
  }
};