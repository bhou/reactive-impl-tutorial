
const EventEmitter = require("eventemitter3");
const uuid = require("node-uuid");

class Node {
  constructor(options, eventemitter) {
    this.id = uuid.v1();
    this.options = options;
    this.ee = eventemitter ? eventemitter : new EventEmitter();
    this.observers = [];
  }

  push(signal) {
    setImmediate(() => {
      this.onReceive(signal);
    });
    return this;
  }

  onReceive(signal) {
    if (signal instanceof Error) {
      this.onError(signal);
      this.request();
      //$FlowIgnore
    } else if (signal === Node.END) {
        try {
          this.onEnd(signal);
        } catch (error) {
          this.send(error);
        }
      } else {
        try {
          this.onSignal(signal);
        } catch (error) {
          this.send(error);
        }
      }
    return this;
  }

  onSignal(signal) {
    this.send(signal);
    return this;
  }

  onError(error) {
    this.send(error);
    return this;
  }

  onEnd(signal) {
    this.send(signal);
    return this;
  }

  send(signal) {
    this.observers.forEach(fn => {
      fn(signal);
    });
    setImmediate(() => {
      this.ee.emit("outgoing-" + this.id, signal);
    });
    return this;
  }

  observe(observer) {
    this.observers.push(observer);
    return this;
  }

  to(downstream) {
    this.ee.on("outgoing-" + this.id, signal => {
      downstream.push(signal);
    });
    // for pull model
    downstream.ee.on("request-" + downstream.id, cmd => {
      this.pull(cmd);
    });
    downstream.from(this);
    return downstream;
  }

  pull(cmd) {
    setImmediate(() => {
      this.onRequest(cmd);
    });
    return this;
  }

  onRequest(cmd) {
    this.request(cmd);
    return this;
  }

  request(cmd) {
    setImmediate(() => {
      this.ee.emit("request-" + this.id, cmd);
    });
    return this;
  }

  from(upstream) {
    return this;
  }
}

//$FlowIgnore
Node.END = "__NODE_END__";

module.exports = Node;