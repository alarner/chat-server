const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
let nextId = 1;

app.use(bodyParser.json());

const messages = [];

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/message", (req, res) => {
  if (!req.body.user) {
    return res.status(400).json({ error: "Missing user" });
  }
  if (!req.body.message) {
    return res.status(400).json({ error: "Missing message" });
  }
  const message = {
    id: nextId++,
    user: req.body.user,
    message: req.body.message,
    createdAt: new Date(),
  };
  messages.push(message);
  res.json(message);
});

app.get("/messages", (req, res) => {
  const afterId = req.query.afterId || 0;
  if (parseInt(afterId) != afterId) {
    res.status(400).json({ error: "Invalid afterId" });
  }
  res.json(messages.slice(afterId));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
