const Node = require("../part1/Node");
const http = require("http");

class LongRunNode extends Node {
  onReceive(signal) {
    let last,
        cur,
        duration = 1000;
    for (let i = 0; i < 20; i++) {
      // it takes 20 seconds
      last = new Date().getTime();
      cur = last;
      while (cur - last < duration) {
        // loop 1 second
        cur = new Date().getTime();
      }
      process.stdout.write(".");
    }
    console.log("");
    this.send(signal + 1);
  }
}
// create a server to handle http I/O
const server = http.createServer((req, res) => {
  console.log("http request");
  res.end('Hello World\n');
});

server.listen(3000, "127.0.0.1", () => {
  // expect a time out at 15th second
  setTimeout(() => {
    console.log("time out");
  }, 15000);
  // run the long run node
  var node1 = new LongRunNode();
  node1.push(1);
});