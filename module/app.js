const greet =  require("./message");
const os = require("os");
greet.greet();

var totalMemory = os.totalmem();

console.log(`Total memory ${totalMemory}`);