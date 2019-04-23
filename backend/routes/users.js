const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

var crypto = require("crypto");

var algorithm = "aes256";
var inputEncoding = "utf8";
var outputEncoding = "hex";

var key = process.env.SECRET_KEY;

const User = require("../models/user");

router.get("/me", async (req, res) => {
  console.log("req.session.user", req.session.user);
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

router.post("/register", function(req, res) {
  bcrypt.hash(req.body.password, 10, function(err, hash) {
    if (err) {
      return res.status(500).json({
        error: err
      });
    } else {
      const user = new User({
        username: req.body.username.toLowerCase(),
        email: req.body.email.toLowerCase(),
        password: hash,
        activated: false
      });
      user
        .save()
        .then(function(result) {
          console.log("result1", result);
          sendConfirmationEmail(result);
          res.status(200).json({
            success: "New user has been created"
          });
        })
        .catch(error => {
          console.log("errror", error);

          res.status(500).json({
            error: err
          });
        });
    }
  });
});

function computeChunk(userId) {
  var text = String(userId);
  console.log("text", typeof text);

  // console.log('Ciphering "%s" with key "%s" using %s', text, key, algorithm);

  var cipher = crypto.createCipher(algorithm, key);

  var ciphered = cipher.update(text, inputEncoding, outputEncoding);
  ciphered += cipher.final(outputEncoding);

  console.log('Result in %s is "%s"', outputEncoding, ciphered);

  return ciphered;
}

function sendConfirmationEmail(user) {
  const sendmail = require("sendmail")();
  const chunk = computeChunk(user._id);

  const url = `https://www.scribblewebapp.com/verify/${user.username}/${chunk}`;

  sendmail(
    {
      from: "noreply@scribblewebapp.com",
      to: user.email,
      subject: "Verify your Scribble account",
      html: `
        <p>Hey ${user.username}, your account is now created!</p>
        <p>In order to use it, you have to follow this link and activate your account:</p>
        <br/>
        <a href="${url}">${url}</a>
       `
    },
    function(err, reply) {
      // console.log(err && err.stack);
      // console.dir(reply);
      if (err) {
        console.log("Error sending email:", err);
      } else {
        console.log("Email sent successfully!");
      }
    }
  );
}

function changePasswordEmail(userId) {
  const sendmail = require("sendmail")();
  const chunk = computeChunk(user._id);

  const url = `https://www.scribblewebapp.com/changepassword/${
    user.username
  }/${chunk}`;

  sendmail(
    {
      from: "noreply@scribblewebapp.com",
      to: user.email,
      subject: "Password change request",
      html: `
      <p>Hey ${
        user.username
      }, we have received a password change request from you!</p>
      <p>You can use the following link to reset your password: </p>
      <br/>
      <a href="${url}">${url}</a>
     `
    },
    function(err, reply) {
      // console.log(err && err.stack);
      // console.dir(reply);
      if (err) {
        console.log("Error sending email:", err);
      } else {
        console.log("Email sent successfully!");
      }
    }
  );
}

router.post("/signin", function(req, res) {
  const username = req.body.username.toLowerCase();
  User.findOne({
    $or: [{ username: username }, { email: username }]
  })
    .exec()
    .then(function(user) {
      if (!user) {
        res.status(401).json({
          failed: "Unauthorized Access"
        });
        return;
      }
      bcrypt.compare(req.body.password, user.password, function(err, result) {
        console.log("result", result);

        if (err) {
          console.log("error", err);
          res.status(401).json({
            failed: "Unauthorized Access"
          });
          return;
        }
        if (result) {
          console.log("user = ", user);
          if (/*!user.activated*/ false) {
            res.status(403).json({
              failed: "Your account has not been activated yet"
            });
          } else {
            req.session.user = user;
            res.status(200).send({
              username: user.username,
              email: user.email
            });
          }
        } else {
          res.status(401).json({
            failed: "Unauthorized Access"
          });
        }
      });
    });
});

function decryptChunk(chunk) {
  var decipher = crypto.createDecipher(algorithm, key);
  var deciphered = decipher.update(chunk, outputEncoding, inputEncoding);
  deciphered += decipher.final(inputEncoding);
  return deciphered;
}

router.post("/verify/:chunk", async (req, res) => {
  const chunk = req.params.chunk;
  const userId = decryptChunk(chunk);

  let targetUser = await User.findById(userId);
  if (targetUser) {
    targetUser.activated = true;
    targetUser.save();

    res.send();
  } else {
    res.status(404).send();
  }
});

// router.post("/changepassword/:chunk", function(req, res) => {
//
// });

router.post("/signout", (req, res) => {
  if (req.session && req.session.user) {
    delete req.session.user;
  }
  res.send("Logged out");
});
module.exports = router;
