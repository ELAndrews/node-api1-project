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
      res.status(500).json({ message: error.message, stack: error.stack });
    });
});

app.get("/users/:id", (req, res) => {
  const { id } = req.params;
  findById(id)
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      res.status(404).json(`user with the id of ${id} not found`);
    });
});

app.listen(8000, () => {
  console.log("listening on 8000");
});
