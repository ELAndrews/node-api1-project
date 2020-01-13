// implement your API here

const express = require("express");

const { find, findById, insert, update, remove } = require("./data/db");

const app = express();

app.use(express.json());

app.post("/api/users", (req, res) => {
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
      res.status(500).json({
        errorMessage: "There was an error while saving the user to the database"
      });
    });
});

app.get("/api/users", (req, res) => {
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

app.get("/api/users/:id", (req, res) => {
  const { id } = req.params;
  findById(id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({
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

app.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;
  remove(id)
    .then(user => {
      if (user) {
        res.status(200).json(`The user with the id: ${id} has been removed`);
      } else {
        res.status(404).json({
          errorMessage: "The user with the specified ID does not exist."
        });
      }
    })
    .catch(error => {
      res.status(500).json({ errorMessage: "The user could not be removed" });
    });
});

app.put("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const userToUpdate = req.body;
  update(id, userToUpdate)
    .then(user => {
      if (user) {
        const updatedUserInfo = findById(id);
        res.status(200).json(updatedUserInfo);
      } else {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      }
    })
    .catch(error => {
      if (!userToUpdate.name || !userToUpdate.bio) {
        res
          .status(400)
          .json({ errorMessage: "Please provide name and bio for the user." });
      } else {
        res.status(500).json({
          errorMessage: "The user information could not be modified."
        });
      }
    });
});

app.listen(8000, () => {
  console.log("listening on 8000");
});
