const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const uuid = require("uuid");

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// Routes

// GET - READ
app.get("/students", async (req, res) => {
  try {
    const students = await pool.query("SELECT * FROM students");
    res.json(students.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// POST - CREAT
app.post("/add-student", async (req, res) => {
  try {
    const { fname, lname, email } = req.body;

    const addStudent = await pool.query(
      "INSERT INTO students(student_id, student_fname, student_lname, student_email) VALUES($1, $2, $3, $4) RETURNING *",
      [uuid.v4(), fname, lname, email]
    );

    res.json(addStudent.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// PUT - Update
app.put("/edit-student", async (req, res) => {
  try {
    const { id, fname, lname } = req.body;

    const updateStudent = await pool.query(
      "UPDATE students SET student_fname = $1, student_lname = $2 WHERE student_id = $3",
      [fname, lname, id]
    );

    res.json(updateStudent.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// DELETE
app.delete("/delete-student", async (req, res) => {
  try {
    const { id } = req.body;

    const deleteStudent = await pool.query(
      "DELETE FROM students WHERE student_id = $1 RETURNING *",
      [id]
    );

    res.json(deleteStudent.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

app.listen(PORT, () => {
  console.log("server is running on port 5000");
});
