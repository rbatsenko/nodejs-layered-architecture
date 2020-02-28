setImmediate(() => console.log("immediate"));
setTimeout(function() {
    console.log("macrotask")
}, 0);
Promise.resolve("microtask").then(console.log);
process.nextTick(() => console.log("nextTick"));