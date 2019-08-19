// requried
const express = require("express");
const cors = require("cors");

// other files including db
const db = require("./data/db.js");

// global objects
const server = express();
const port = 4001;

// middleware
server.use(express.json());
server.use(cors());

// request handlers ***********

// GET /api/users
// Test GET connection
// server.get("/api/users", (req, res) => {
//   res.send("Testing API and /api/users");
// });

server.get("/api/users", (req, res) => {
  db.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({
        error: "The users information could not be retrieved."
      });
    });
});

// GET /api/users/ :id
server.get("/api/users/:id", (req, res) => {
  // use params and deconstruct id
  const { id } = req.params;

  db.findById(id)
    .then(user => {
      user
        ? res.status(200).json(user)
        : res.status(404).json({
            message: "The user with the specified ID does not exist."
          });
    })
    .catch(err => {
      res.status(500).json({
        error: "The user information could not be retrieved."
      });
    });
});

// POST /api/users
server.post("/api/users", (req, res) => {
  // Uses req.body to access body content
  const newUser = req.body;
  console.log("new user", newUser);
  db.insert(newUser)
    .then(user => {
      user.name.length === 0 || user.bio.length === 0
        ? res
            .status(400)
            .json({ errorMessage: "Please provide name and bio for the user." })
        : res.json(user);
    })
    .catch(err => {
      res.status(500).json({
        error: "There was an error while saving the user to the database"
      });
    });
});

// DELETE /api/users/:id
server.delete("/api/users/:id", (req, res) => {
  // use params to deconstruct id
  const { id } = req.params;

  db.remove(id)
    .then(deleteUser => {
      deleteUser
        ? res.status(200).json(deleteUser)
        : res.status(404).json({
            message: "The user with the specified ID does not exist."
          });
    })
    .catch(err => {
      res.status(500).json({
        error: "The user could not be removed"
      });
    });
});

// PUT /api/users/:id
server.put("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  db.update(id, changes)
    .then(updated => {
      if (updated) {
        res.status(201).json(updated);
        // } else if () {
      } else {
        res.status(400).json({
          errorMessage: "Please provide name and bio for the user."
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        error: "The user information could not be modified."
      });
    });
});

// LISTENER ~ Last thing on page and required for index, even if server.js is used
server.listen(port, () => {
  console.log(`Server is listening on port ${port} ...`);
});
