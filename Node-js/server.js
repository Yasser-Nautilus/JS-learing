import express from "express";
import http from "http";
import { UrlStore } from "./urlStore.js";

const store = new UrlStore();
const BASE_URL = "http://localhost:5000";
const app = express();
app.use(express.json());
app.use(requestLogger);

app.get("/stats", (req, res) => {
  res.send(Object.fromEntries(apiUsage));
});
app.post("/shorten", apiKeyAuth, apiUsageTracker, (req, res) => {
  const link = req.body.link;
  if (!link) {
    res.status(400).send("Bad Request: link is required in body");
    return;
  }
  const code = store.shorten(link);
  res.status(200).json({ code, shortUrl: `${BASE_URL}/${code}` });
});

app.get("/:code", apiKeyAuth, apiUsageTracker, (req, res) => {
  const code = req.params.code;
  const longUrl = store.resolve(code);
  console.log(`Resolving code: ${code} to long URL: ${longUrl}`);
  if (longUrl) {
    res.redirect(longUrl);
    return;
  }
  res.status(404).send("NotFound");
});

app.listen(5000, () => {
  console.log("Server running on port http://localhost:5000");
});
