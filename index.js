const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 3000;
let nextId = 1;

app.use(cors());
app.use(bodyParser.json());

const messages = [];
const reactions = [];

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

app.post("/message/:id/reaction", (req, res) => {
  if (!req.body.user) {
    return res.status(400).json({ error: "Missing user" });
  }
  if (!req.body.reaction) {
    return res.status(400).json({ error: "Missing reaction" });
  }
  const reaction = {
    user: req.body.user,
    reaction: req.body.reaction,
    createdAt: new Date(),
  };
  reactions.push(reaction);
  res.json(reaction);
});

app.get("/messages", (req, res) => {
  const afterId = req.query.afterId || 0;
  if (parseInt(afterId) != afterId) {
    res.status(400).json({ error: "Invalid afterId" });
  }
  res.json(messages.slice(afterId));
});

app.put("/message/:id", (req, res) => {
  if (!messages[req.params.id - 1]) {
    return res.status(404).json({ error: "Unknown item" });
  }
  if (req.body.message) {
    messages[req.params.id - 1].message = req.body.message;
  }
  if (req.body.user) {
    messages[req.params.id - 1].user = req.body.user;
  }
  res.json(messages[req.params.id - 1]);
});

app.delete("/message/:id", (req, res) => {
  // doesn't work
  if (!messages[req.params.id - 1]) {
    return res.status(404).json({ error: "Unknown item" });
  }
  const index = messages.indexOf(req.body.message);
  if (req.body.message) {
    messages.splice(index, 1);
  }
  res.json({ message: "message deleted" });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
