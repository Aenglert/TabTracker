const express = require('express');
const router = express.Router();
/* const db = require('../config/database'); */
const Todo = require('../models/Todo');

// Get todo list
router.get('/', (req, res) =>
Todo.findAll()
.then(todos => {
  console.log(todos);
  res.sendStatus(200);
}) 
  .catch(error => console.log(error)));

// Add a todo
router.get('/add', (req, res) => {
  const data = {
    title: 'Arbeiten',
    description: 'Wände streichen'
  }
  
  let { title, description } = data;

  // Insert into Table
  Todo.create({
    title,
    description
  })
    .then(todo => res.redirect('/todos'))
    .catch(error => console.log(error));
});


module.exports = router;