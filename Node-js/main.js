import http from "http";
import fs from "fs";

const server = http.createServer((req, res) => {
  if (req.url === "/users" && req.method === "GET") {
    fs.readFile("users.json", "utf8", (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.setHeader("Content-Type", "text/plain");
        res.end("There was an error reading the file.");
        return;
      }
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      const users = JSON.parse(data);
      res.end(JSON.stringify(users));
    });
  } else {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/plain");
    res.end("Not Found");
  }
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
