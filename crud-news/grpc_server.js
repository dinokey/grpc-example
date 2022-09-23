const grpc = require("@grpc/grpc-js");
const PROTO_PATH = __dirname + "/news.proto";
var protoLoader = require("@grpc/proto-loader");

const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};
var packageDefinition = protoLoader.loadSync(PROTO_PATH, options);
const newsProto = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();
let newsList = [
  { id: "1", title: "News 1", body: "Content 1", postImage: "Post image 1" },
  { id: "2", title: "News 2", body: "Content 2", postImage: "Post image 2" },
];

server.addService(newsProto.NewsService.service, {
  getNews: (call, callback) => {
    console.log("getNews called!");
    const newsId = call.request.id;
    const news = newsList.find((nItem) => nItem.id == newsId);
    callback(null, news);
  },

  getAllNews: (_, callback) => {
    console.log("getAllNews called!");
    callback(null, { news: newsList });
  },

  addNews: (call, callback) => {
    console.log("addNews called!");
    const news = {
      id: Date.now(),
      title: call.request.title,
      body: call.request.body,
      postImage: call.request.postImage,
    };
    newsList.push(news);
    callback(null, { news: newsList });
  },

  deleteNews: (call, callback) => {
    console.log("deleteNews called!");
    const idWantToDelete = call.request.id;
    newsList = newsList.filter((news) => news.id !== idWantToDelete);
    callback(null, { news: newsList });
  },

  editNews: (call, callback) => {
    console.log("editNews called!");
    const newsId = call.request.id;
    const news = newsList.find((news) => news.id == newsId);
    news.title = call.request.title;
    news.body = call.request.body;
    news.postImage = call.request.postImage;
    callback(null, news);
  },
});

server.bindAsync(
  "127.0.0.1:50051",
  grpc.ServerCredentials.createInsecure(),
  (error, port) => {
    console.log("Server running at http://127.0.0.1:50051");
    server.start();
  }
);