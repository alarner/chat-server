const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 3000;
let nextId = 1;
let reactionNextId = 1;

app.use(cors());
app.use(bodyParser.json());

let messages = [];

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
    reactions: [],
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
  // handling duplicate user reactions
  const userReaction = req.body.reaction;
  const user = req.body.user;
  const messageId = parseInt(req.params.id);
  const index = messages.findIndex((e) => {
    return e.id === messageId;
  });
  function compareReactions(e) {
    if (e.user === user && e.reaction === userReaction) {
      return true;
    }
  }
  if (messages[index].reactions.some(compareReactions)) {
    res.status(400).json({ error: " Duplicate reaction" });
  } else {
    const reaction = {
      id: reactionNextId++,
      user: user,
      reaction: userReaction,
      createdAt: new Date(),
    };
    messages[index].reactions.push(reaction);
    res.json(reaction);
  }
});

app.get("/messages", (req, res) => {
  const afterId = req.query.afterId || 0;
  if (parseInt(afterId) != afterId) {
    res.status(400).json({ error: "Invalid afterId" });
  }
  const index = messages.findIndex((e) => {
    return e.id === parseInt(afterId);
  });
  res.json(messages.slice(index + 1));
});

app.put("/message/:id", (req, res) => {
  const index = messages.findIndex((e) => {
    return e.id === parseInt(req.params.id);
  });
  if (!messages[index]) {
    return res.status(404).json({ error: "Unknown item" });
  }
  if (req.body.message) {
    messages[index].message = req.body.message;
  }
  if (req.body.user) {
    messages[index].user = req.body.user;
  }
  res.json(messages[index]);
});

app.delete("/message/:id", (req, res) => {
  const index = messages.findIndex((e) => {
    return e.id === parseInt(req.params.id);
  });
  if (index === -1) {
    return res.status(404).json({ error: "Unknown item" });
  }
  messages.splice(index, 1);
  res.json({ message: "message deleted" });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
