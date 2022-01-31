const Sequelize = require('sequelize');
const db = require('../config/database');

const Todo = db.define('todo', {
  title: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.STRING
  },
});

module.exports = Todo;