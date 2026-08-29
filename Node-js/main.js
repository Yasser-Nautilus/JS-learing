import http from "http";
import { UrlStore } from "./urlStore.js";

const store = new UrlStore();
const BASE_URL = "http://localhost:3000";

const server = http.createServer((req, res) => {
  const parsedUrl = new URL(req.url, BASE_URL);
  const path = parsedUrl.pathname;

  if (path === "/shorten" && req.method === "GET") {
    const link = parsedUrl.searchParams.get("link");
    if (!link) {
      res.statusCode = 400;
      res.setHeader("Content-Type", "text/plain");
      res.end("Bad Request: link parameter is required");
      return;
    }
    const code = store.shorten(link);
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ code, shortUrl: `${BASE_URL}/${code}` }));
    return;
  }

  if (path !== "/" && req.method === "GET") {
    const code = path.substring(1);
    const longUrl = store.resolve(code);
    if (longUrl) {
      res.statusCode = 302;
      res.setHeader("Location", longUrl);
      res.end();
      return;
    }
  }

  res.statusCode = 404;
  res.setHeader("Content-Type", "text/plain");
  res.end("Not Found");
});
server.listen(3000, () => {
  console.log("Server running on port http://localhost:3000");
});
