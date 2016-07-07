const RP = require("./index");
// require the Operators file to register them
const Operators = require("./Operators");

class PullSource extends RP.Node {
  constructor(options, eventemitter) {
    super(options, eventemitter);
    this.source = this.options;
    this.index = 0;
  }

  onRequest(cmd) {
    if (this.source.length === this.index) {
      // console.log("send", "end", this.index)
      this.send(RP.Node.END);
    } else {
      // console.log("send", this.source[this.index], this.index);
      this.send(this.source[this.index]);
      this.index++;
    }
  }
}

class SinkNode extends RP.Node {
  onSignal(signal) {
    this.request();
  }

  from(node) {
    this.request();
  }
}

new PullSource([1, 2, 3])
// RP.asList([1, 2, 3])
  .map((v) => {
    // throw an error if value is even
    if (v % 2 == 0) throw new Error("Expect an Odd, but get an Even");
    // for odd value, turn number to a string
    return "value is " + v;
  })
  .map((v) => {
    return v + "!"
  })
  .errors((err, rethrow) => {
    // print the error message
    console.error(err.message);
  })
  .map(v => {
    console.log(v)
    return v;
  })
  .to(new SinkNode());
  // .done(()=> {
  //   console.log("done");
  // });
