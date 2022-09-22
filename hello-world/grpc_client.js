var PROTO_PATH = __dirname + "/hello.proto";

var parseArgs = require("minimist");
var grpc = require("@grpc/grpc-js");
var protoLoader = require("@grpc/proto-loader");
var packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
var helloProto = grpc.loadPackageDefinition(packageDefinition).hello;

function main() {
  var argv = parseArgs(process.argv.slice(2), { string: "target" });
  var target;
  if (argv.target) {
    target = argv.target;
  } else {
    target = "localhost:50051";
  }
  var client = new helloProto.Greeter(
    target,
    grpc.credentials.createInsecure()
  );

  client.sayHello({ name: "Dino" }, (err, response) => {
    console.log("Response: ", response);
  });
}

main();
