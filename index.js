/* const Joi = require("joi"); */
const express = require("express");
const app = express();
const cors = require('cors');
const Pool = require('pg').Pool 
const pool = new Pool({
  user: 'lesu',
  host: 'localhost',
  database: 'todos',
  password: 'password',
  port: 5432,
}) 

app.use(cors())

app.use(express.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:8080");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Request-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,OPTIONS,DELETE");
  next();
});

const courses = [
  { id: 2, title: "Einkaufen", description: "Farbe" },
];

app.get("/api/courses", (req, res, next) => {
  pool.query('SELECT * FROM todoTable ORDER BY id ASC');
  if (!courses)
    return res.status(404).send("The course was not found.");
  res.send(courses);
  next();
});

app.get("/api/courses/:id", (req, res, next) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send("The course with the given ID was not found.");
  res.send(course);
  next();
});

app.post("/api/courses", (req, res, next) => {
/*   const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message); */
  const course = {
    id: courses.length + 1,
    title: req.body.title,
    description: req.body.description
  };
  courses.push(course);
  res.send(course);
  next();
});

app.put("/api/courses/:id", (req, res, next) => {
  console.log(req);
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send("The course with the given ID was not found.");

/*   const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message); */

  course.title = req.body.title;
  course.description = req.body.description;
  res.send(course);
  next();
});

app.delete("/api/courses/:id", (req, res, next) => {
  console.log("req.query: ", req.query);
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(403).send("The course with the given ID was not found.");

  const index = courses.indexOf(course);
  courses.splice(index, 1);

  res.send(course);
  next();
});

/* function validateCourse(course) {
  const schema = {
    title: Joi.string().min(1).required(),
    description: Joi.string().min(1).required(),
  };

  return Joi.validate(course, schema);
} */

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
