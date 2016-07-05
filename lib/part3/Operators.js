const RP = require("./index");
const Node = RP.Node;

RP.addOperator("times", n => {
  class TimesNode extends Node {
    constructor(options, eventemitter) {
      super(options, eventemitter);
      this.n = this.options;
    }

    onReceive(signal) {
      this.send(signal * this.n);
    }
  }
  return new TimesNode(n);
});

RP.addOperator("print", () => {
  class PrintNode extends Node {
    onReceive(signal) {
      console.log(signal);
      this.send(signal);
    }
  }
  return new PrintNode();
});

RP.addOperator("map", fn => {
  class MapNode extends Node {
    constructor(options, eventemitter) {
      super(options, eventemitter);
      this.fn = options;
    }

    onReceive(signal) {
      let out = this.fn(signal);
      this.send(out);
    }
  }
  return new MapNode(fn);
});