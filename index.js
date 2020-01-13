// implement your API here

const express = require("express");

const { find, findById, insert, update, remove } = require("./data/db");

const app = express();

app.use(express.json());

app.get("/users", (req, res) => {
  find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "The users information could not be retrieved." });
    });
});

app.post("/users", (req, res) => {
  const newUser = req.body;
  insert(newUser)
    .then(user => {
      if (user) {
        res.status(201).json(user);
      } else {
        res
          .status(400)
          .json({ errorMessage: "Please provide name and bio for the user." });
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({
          errorMessage:
            "There was an error while saving the user to the database"
        });
    });
});

app.get("/users/:id", (req, res) => {
  const { id } = req.params;
  findById(id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res
          .status(404)
          .json({
            errorMessage: "The user with the specified ID does not exist."
          });
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ errorMessage: "The user information could not be retrieved." });
    });
});

// INSERT

//update

app.delete("./users/:id", (req, res) => {
  const { id } = req.params;
  remove(id)
    .then(user => {
      if (user) {
        res.status(200).json(`The user with the id: ${id} has been removed`);
      } else {
        res
          .status(404)
          .json({
            errorMessage: "The user with the specified ID does not exist."
          });
      }
    })
    .catch(error => {
      res.status(500).json({ errorMessage: "The user could not be removed" });
    });
});

app.listen(8000, () => {
  console.log("listening on 8000");
});
