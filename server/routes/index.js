const express = require("express");
const User = require("../models/user");
const Messages = require("../models/messages");

const router = express.Router();

router.post("/messages", async (req, res) => {
  try {
    const { body, email } = req.body;
    const message = await Messages.create({ body, email });
    res.json(message);
  } catch (e) {
    console.log(e);
    res.json(e);
  }
});

router.get("/messages", async (req, res) => {
  try {
    const messages = await Messages.find({});
    res.json(messages);
  } catch (e) {
    console.log(e);
    res.json(e);
  }
});

router.get("/count", async (req, res) => {
  try {
    const count = await User.estimatedDocumentCount();
    res.json({ count });
  } catch (e) {
    console.log(e);
    res.json(e);
  }
});

router.get("/users", async (req, res) => {
  try {
    const users = await User.find({ isBanned: true });
    res.json(users);
  } catch (e) {
    console.log(e);
    res.json(e);
  }
});

router.post("/users/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(
      id,
      { isBanned: false },
      { new: true }
    );
    res.json(user);
  } catch (e) {
    console.log(e);
    res.json(e);
  }
});

module.exports = router;
