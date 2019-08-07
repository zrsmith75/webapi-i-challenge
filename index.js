const express = require("express");

// other files
const db = require("./data/db.js");

// global objects
const server = express();
const port = 4001;

// middleware
server.use(express.json());

// request handlers ***********

// GET /api/users
// Test GET connection
// server.get("/api/users", (req, res) => {
//   res.send("Testing API and /api/users");
// });

server.get("/api/users", (req, res) => {
  db.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.status(500).json({
        error: "The users information could not be retrieved."
      });
    });
});

// GET /api/users/:id

// POST /api/users
server.post("/api/users", (req, res) => {
  const newUser = req.body;
  console.log("new user", newUser);
  db.insert(newUser)
    .then(user => {
      // if(user) {
      //   res.json(user)
      // } else {
      //   res.status(400).json({
      //     errorMessage: "Please provide name and bio for the user."
      //   })
      // }

      if (!user.name || !user.bio) {
        res.status(400).json({
          errorMessage: "Please provide name and bio for the user."
        });
      } else {
        res.json(user);
        console.log("Posted", user);
      }
    })
    .catch(err => {
      res.status(500).json({
        error: "There was an error while saving the user to the database"
      });
    });
});

// DELETE /api/users/:id

// PUT /api/users/:id

// LISTEN
server.listen(port, () => {
  console.log(`Server is listening on port ${port} ...`);
});
