exports["test Node"] = {
  "test single node" : (test) => {
    const Node = require("./Node");

    // Create a new Node class
    class MyNode extends Node {
      // override onReceive function
      onReceive(signal) {
        console.log(signal);
        this.send(signal * 2);
      }
    }

    // create a node
    var node = new MyNode();
    // observe it
    node.observe((signal) => {
      test.equal(signal, 2);
      test.done();
    });
    // push a value to it
    node.push(1);
  }
}
