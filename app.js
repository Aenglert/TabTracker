const express = require('express');
const app = express();
const cors = require("cors");

app.use(cors());

app.use(express.json());

const PORT = process.env.PORT || 3001;

app.listen(PORT, console.log(`Server started on port ${PORT}`));



const inTodos = [
  {
    title: 'Work',
    description: 'Painting'
  }
];

const getAllTodos = async (req, res) => {
  res.status(200).json(inTodos);
};

const getTodosById = (req, res) => {
  res.status(200).jsons(inTodos);
};

const addTodos = async (req, res) => {
  const { title, description } = req.body;
  inTodos.push({ title, description});
  res.status(201).send('Todo added successfully.');
};

const updateTodos = (req, res) => {
  const { title, description } = req.body;
  inTodos[0] = { title, description };
  res.status(200).send('Todo updated.');
};

const deleteTodos = (req, res) => {
  inTodos.shift();
  res.status(200).send('Todo deleted');
};

module.exports = {
  
}