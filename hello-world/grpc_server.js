var PROTO_PATH = __dirname + "/hello.proto";
console.log(PROTO_PATH);

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

function sayHello(call, callback) {
  console.log("function called!");
  callback(null, { message: "Hello " + call.request.name + "!" });
}

function main() {
  var server = new grpc.Server();
  server.addService(helloProto.Greeter.service, { sayHello: sayHello });
  server.bindAsync(
    "0.0.0.0:50051",
    grpc.ServerCredentials.createInsecure(),
    () => {
      console.log("grpc up and running at localhost:50051");
      server.start();
    }
  );
}

main();
