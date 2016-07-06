const RP = require("./index");
// require the Operators file to register them
const Operators = require("./Operators");

RP.asList([1, 2, 3]).map(v => {
  // throw an error if value is even
  if (v % 2 == 0) throw new Error("Expect an Odd, but get an Even");
  // for odd value, turn number to a string
  return "value is " + v;
}).map(v => {
  return v + "!";
}).errors((err, rethrow) => {
  // print the error message
  console.error(err.message);
}).map(v => console.log(v)).done(() => {
  console.log("done");
});