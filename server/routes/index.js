const express = require("express");
const User = require("../models/user");
const router = express.Router();

router.get("/count", async (req, res) => {
  try {
    const count = await User.estimatedDocumentCount();
    res.json({count});
  } catch (e) {
    console.log(e);
    res.json(e);
  }
});

module.exports = router;
