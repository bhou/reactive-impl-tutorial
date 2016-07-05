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

  to(node) {
    this.ee.on("outgoing-" + this.id, signal => {
      node.push(signal);
    });
    return node;
  }
}

module.exports = Node;