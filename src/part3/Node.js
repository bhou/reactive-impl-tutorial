const EventEmitter = require("eventemitter3");
const uuid = require("node-uuid");

class Node {
  id : string;
  options: any;
  ee: EventEmitter;
  observers : [(signal : any) => void];
  constructor(options : any, eventemitter : ?EventEmitter) {
    this.id = uuid.v1();
    this.options = options;
    this.ee = eventemitter ? eventemitter : new EventEmitter();
    this.observers = [];
  }

  push(signal : any) : Node {
    setImmediate(()=>{
      this.onReceive(signal);
    });
    return this;
  }

  onReceive(signal : any) : Node {
    return this;
  }

  send(signal : any) : Node {
    this.observers.forEach(fn => {
      fn(signal);
    });
    setImmediate(()=> {
      this.ee.emit("outgoing-" + this.id, signal);
    });
    return this;
  }

  observe(observer : (signal : any) => void) : Node {
    this.observers.push(observer);
    return this;
  }

  to(node : Node) : Node {
    this.ee.on("outgoing-" + this.id, (signal) => {
      node.push(signal);
    });
    return node;
  }
}

module.exports = Node;
