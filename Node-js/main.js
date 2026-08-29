import { nanoid } from "nanoid";
import http from "http";
import { Logger } from "./logger.js";

const requestCounts = new Map();
const allowedRoutes = new Set(["/users", "/health"]);
const logger = new Logger();

const server = http.createServer((req, res) => {
  const requestId = nanoid();
  logger.log(requestId);

  const ip = req.socket.remoteAddress.replace("::ffff:", "");
  console.log(`Request from IP: ${ip}, Request ID: ${requestId}`);
  requestCounts.set(ip, (requestCounts.get(ip) || 0) + 1);
  if (requestCounts.get(ip) > 5) {
    res.statusCode = 429;
    res.setHeader("Content-Type", "text/plain");
    res.end("Too Many Requests");
    return;
  }

  if (!allowedRoutes.has(req.url)) {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/plain");
    res.end("Not Found");
    return;
  }
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Request successful");
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});

// import http from "http";
// import fs from "fs";

// const server = http.createServer((req, res) => {
//   if (req.url === "/users" && req.method === "GET") {
//     fs.readFile("users.json", "utf8", (err, data) => {
//       if (err) {
//         res.statusCode = 500;
//         res.setHeader("Content-Type", "text/plain");
//         res.end("There was an error reading the file.");
//         return;
//       }
//       res.statusCode = 200;
//       res.setHeader("Content-Type", "application/json");
//       const users = JSON.parse(data);
//       res.end(JSON.stringify(users));
//     });
//   } else {
//     res.statusCode = 404;
//     res.setHeader("Content-Type", "text/plain");
//     res.end("Not Found");
//   }
// });

// server.listen(3000, () => {
//   console.log("Server running on port 3000");
// });
