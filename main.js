const http = require("http");
const fs = require("fs");
const _ = require("lodash");

const server = http.createServer((req, res) => {
  //lodash

  // ser header contenet typed
  res.setHeader("Content-type", "text/html");

  let path = "./files/";
  switch (req.url) {
    case "/":
      res.statusCode = 200;
      path += "index.html";
      break;
    case "/about":
      res.statusCode = 200;
      path += "about.html";
      break;
    case "/about-me":
      res.statusCode = 301;
      res.setHeader("Location", "/about");
      break;
    case "/contact":
      res.statusCode = 200;
      path += "contact.html";
      break;
    default:
      res.statusCode = 404;
      path += "notfound.html";
      break;
  }
  fs.readFile(path, (err, data) => {
    if (err) {
      console.log(err);
      res.end();
    } else {
      res.end(data);
    }
  });
});

server.listen(3000, "localhost", () => {
  console.log("lestining for requests on port 3000");
});
