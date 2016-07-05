const Node = require("../part1/Node");
const http = require("http");

class LongRunNode extends Node {
  onReceive(signal) {
    let last, cur, duration = 1000;
    for (let i = 0; i < 5; i++) { // last 5 seconds
      last = new Date().getTime();
      cur = last;
      while (cur - last < duration) {
        cur = new Date().getTime();
      }
      process.stdout.write(".");
    }
    console.log("");
    this.send(signal + 1);
  }
}

const server = http.createServer((req, res) => {
  console.log("http request");
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

server.listen(3000, "127.0.0.1", () => {
  setTimeout(()=>{
    console.log("time out");
  }, 15000);
  // chain 4 nodes to make a 20 seconds pipeline
  var node1 = new LongRunNode();
  var node2 = new LongRunNode();
  var node3 = new LongRunNode();
  var node4 = new LongRunNode();

  node1
    .to(node2)
    .to(node3)
    .to(node4)

  node1.push(1);
});
