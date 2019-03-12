const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const User = require("../models/user");

router.get("/me", async (req, res) => {
  if (!req.session.user) {
    res.status(404);
    res.send("Sorry, user not found");
  } else {
    res.send({
      username: req.session.user.username,
      email: req.session.user.email
    });
  }
});

router.get("/:id", async (req, res) => {
  let targetUserId = req.params.id;

  let user = await User.findById(targetUserId);

  if (!targetUserId) {
    res.status(404);
    res.send("Sorry, user not found");
  } else {
    res.send(targetUserId);
  }

  console.log("targetUserId", targetUserId);
});

router.post("/", function(req, res) {
  bcrypt.hash(req.body.password, 10, function(err, hash) {
    if (err) {
      return res.status(500).json({
        error: err
      });
    } else {
      const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hash
      });
      user
        .save()
        .then(function(result) {
          console.log(result);
          res.status(200).json({
            success: "New user has been created"
          });
        })
        .catch(error => {
          res.status(500).json({
            error: err
          });
        });
    }
  });
});
router.post("/signin", function(req, res) {
  console.log("req.body: ", req.body);
  User.findOne({ username: req.body.username })
    .exec()
    .then(function(user) {
      bcrypt.compare(req.body.password, user.password, function(err, result) {
        if (err) {
          res.status(401).json({
            failed: "Unauthorized Access"
          });
        }
        if (result) {
          req.session.user = user;
          res.status(200).send({
            username: user.username,
            email: user.email
          });
        } else {
          res.status(401).json({
            failed: "Unauthorized Access"
          });
        }
      });
    });
  // .catch(error => {
  //   res.status(500).json({
  //     error
  //   });
  // });
});

router.post("/signout", (req, res) => {
  if (req.session && req.session.user) {
    delete req.session.user;
  }
});
module.exports = router;
