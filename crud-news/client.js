const grpc = require("@grpc/grpc-js");
var protoLoader = require("@grpc/proto-loader");
const PROTO_PATH = __dirname + "/news.proto";

const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};
var packageDefinition = protoLoader.loadSync(PROTO_PATH, options);

const NewsService = grpc.loadPackageDefinition(packageDefinition).NewsService;

const client = new NewsService(
  "localhost:50051",
  grpc.credentials.createInsecure()
);

client.getAllNews({}, (error, news) => {
  if (!error) {
    console.log("get All News");
    console.log(news);
    console.log("");
  } else throw error;
});

client.addNews(
  {
    title: "Additional News",
    body: "No content for this news",
    postImage: "noImage.png",
  },
  (error, news) => {
    if (!error) {
      console.log("After add news News");
      console.log(news);
      console.log("");
    } else throw error;
  }
);

client.deleteNews({ id: "1" }, (error, news) => {
  if (!error) {
    console.log("deleted News with id=1");
    console.log(news);
    console.log("");
  } else throw error;
});

client.editNews(
  {
    id: "2",
    title: "Edited News",
    body: "No content for this news",
    postImage: "noImage.png",
  },
  (error, news) => {
    if (!error) {
      console.log("Edited News with id=2");
      console.log(news);
      console.log("");
    } else throw error;
  }
);

client.getNews({ id: "2" }, (error, news) => {
  if (!error) {
    console.log("Get news with id=2");
    console.log(news);
    console.log("");
  } else throw error;
});
