const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.post("/", async (req, res) => {
  const user = new User();
  user.username = req.body.username;
  user.password = req.body.password;
  user.email = req.body.email;
  await user.save();

  res.status(201).send();
});

module.exports = router;
