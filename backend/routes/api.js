const express = require("express");

const notebooksRouter = require("./notebooks");
const notesRouter = require("./notes");
const searchRouter = require("./search");
const userRouter = require("./users");

const router = express.Router();

if (process.env.profile !== "nft" || process.env.CI !== "true") {
  router.use((req, res, next) => {
    if (req.url === "/users/signin" || req.url === "/users") {
      next();
    } else {
      if (!req.session || !req.session.user) {
        res.status(401).send();
      } else {
        next();
      }
    }
  });
}

router.use("/notebooks", notebooksRouter);
router.use("/notes", notesRouter);
router.use("/search", searchRouter);
router.use("/users", userRouter);

module.exports = router;
