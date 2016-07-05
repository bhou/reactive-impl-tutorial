const RP = require("./index");
// require the Operators file to register them
const Operators = require("./Operators");

RP.asList([1, 2, 3])
  .times(2)
  .print();
