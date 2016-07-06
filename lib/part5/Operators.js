const RP = require("./index");
const Node = RP.Node;

RP.addOperator("times", n => {
  class TimesNode extends Node {
    constructor(options, eventemitter) {
      super(options, eventemitter);
      this.n = this.options;
    }

    onSignal(signal) {
      this.send(signal * this.n);
    }
  }
  return new TimesNode(n);
});

RP.addOperator("print", () => {
  class PrintNode extends Node {
    onSignal(signal) {
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

    onSignal(signal) {
      let out = this.fn(signal);
      this.send(out);
    }
  }
  return new MapNode(fn);
});

RP.addOperator("errors", fn => {
  class ErrorsNode extends Node {
    constructor(options, eventemitter) {
      super(options, eventemitter);
      this.fn = options;
    }

    onError(error) {
      this.fn(error, signal => {
        this.send(signal);
      });
    }
  }
  return new ErrorsNode(fn);
});

RP.addOperator("done", fn => {
  class DoneNode extends Node {
    constructor(options, eventemitter) {
      super(options, eventemitter);
      this.fn = options;
    }

    onEnd(signal) {
      this.fn(signal);
    }
  }
  return new DoneNode(fn);
});