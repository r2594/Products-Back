const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const express = require('express');
const cors = require('cors');

const dbFile = 'test1.db';
const db = new sqlite3.Database(dbFile);

const app = express();
app.use(cors());

db.serialize( () => {

  db.run('CREATE TABLE IF NOT EXISTS students (student_id INTEGER PRIMARY KEY AUTOINCREMENT, student_name TEXT)');

  db.run('INSERT INTO students (student_name) VALUES (?)', 'Harry Potter');
  db.run('INSERT INTO students (student_name) VALUES (?)', 'Ron Weasley');
  db.run('INSERT INTO students (student_name) VALUES (?)', 'Hermione Granger');
  db.run('INSERT INTO students (student_name) VALUES (?)', 'Luna Lovegood');
  db.run('INSERT INTO students (student_name) VALUES (?)', 'Draco Malfoy');


  db.run('CREATE TABLE IF NOT EXISTS animals (animal_id INTEGER PRIMARY KEY AUTOINCREMENT, animal_name TEXT UNIQUE, type TEXT UNIQUE, student_id INTEGER, FOREIGN KEY(student_id) REFERENCES students(id) )');

  db.run('INSERT INTO animals (animal_name, type, student_id) VALUES (?, ?, ?)', 'Hedwige', 'chouette', 1);
  db.run('INSERT INTO animals (animal_name, type, student_id) VALUES (?, ?, ?)', 'Scabbers', 'rat', 2);
  db.run('INSERT INTO animals (animal_name, type, student_id) VALUES (?, ?, ?)', 'Crookshanks', 'cat', 3);
  db.run('INSERT INTO animals (animal_name, type, student_id) VALUES (?, ?, ?)', 'Muppet', 'turtle', 4);
  db.run('INSERT INTO animals (animal_name, type, student_id) VALUES (?, ?, ?)', 'Bubo bubo', 'aigle-chouette', 5);


  db.run('CREATE TABLE IF NOT EXISTS teachers (teacher_id INTEGER PRIMARY KEY AUTOINCREMENT, teacher_name TEXT)');

  db.run('INSERT INTO teachers (teacher_name) VALUES (?)', 'Sybill Trelawney');
  db.run('INSERT INTO teachers (teacher_name) VALUES (?)', 'Gilderoy Lockhart');
  db.run('INSERT INTO teachers (teacher_name) VALUES (?)', 'Minerva McGonagall');
  db.run('INSERT INTO teachers (teacher_name) VALUES (?)', 'Albus Dumbledore');
  db.run('INSERT INTO teachers (teacher_name) VALUES (?)', 'Severus Snape');


  db.run('CREATE TABLE IF NOT EXISTS students_to_teachers (students_to_teachers_id INTEGER PRIMARY KEY AUTOINCREMENT, teacher_id INTEGER, student_id INTEGER, FOREIGN KEY (teacher_id) REFERENCES teachers(teacher_id), FOREIGN KEY (student_id) REFERENCES students(student_id))');

  db.run('INSERT INTO students_to_teachers (teacher_id, student_id) VALUES (?,?)', 1, 1);
  db.run('INSERT INTO students_to_teachers (teacher_id, student_id) VALUES (?,?)', 1, 2);
  db.run('INSERT INTO students_to_teachers (teacher_id, student_id) VALUES (?,?)', 1, 3);
  db.run('INSERT INTO students_to_teachers (teacher_id, student_id) VALUES (?,?)', 1, 4);
  db.run('INSERT INTO students_to_teachers (teacher_id, student_id) VALUES (?,?)', 1, 5);
  db.run('INSERT INTO students_to_teachers (teacher_id, student_id) VALUES (?,?)', 2, 1);
  db.run('INSERT INTO students_to_teachers (teacher_id, student_id) VALUES (?,?)', 2, 2);
  db.run('INSERT INTO students_to_teachers (teacher_id, student_id) VALUES (?,?)', 2, 3);
  db.run('INSERT INTO students_to_teachers (teacher_id, student_id) VALUES (?,?)', 2, 4);
  db.run('INSERT INTO students_to_teachers (teacher_id, student_id) VALUES (?,?)', 2, 5);
  db.run('INSERT INTO students_to_teachers (teacher_id, student_id) VALUES (?,?)', 3, 1);
  db.run('INSERT INTO students_to_teachers (teacher_id, student_id) VALUES (?,?)', 3, 2);
  db.run('INSERT INTO students_to_teachers (teacher_id, student_id) VALUES (?,?)', 3, 3);
  db.run('INSERT INTO students_to_teachers (teacher_id, student_id) VALUES (?,?)', 3, 4);
  db.run('INSERT INTO students_to_teachers (teacher_id, student_id) VALUES (?,?)', 3, 5);
  db.run('INSERT INTO students_to_teachers (teacher_id, student_id) VALUES (?,?)', 4, 1);
  db.run('INSERT INTO students_to_teachers (teacher_id, student_id) VALUES (?,?)', 4, 2);
  db.run('INSERT INTO students_to_teachers (teacher_id, student_id) VALUES (?,?)', 4, 3);
  db.run('INSERT INTO students_to_teachers (teacher_id, student_id) VALUES (?,?)', 4, 4);
  db.run('INSERT INTO students_to_teachers (teacher_id, student_id) VALUES (?,?)', 4, 5);
  db.run('INSERT INTO students_to_teachers (teacher_id, student_id) VALUES (?,?)', 5, 1);
  db.run('INSERT INTO students_to_teachers (teacher_id, student_id) VALUES (?,?)', 5, 2);
  db.run('INSERT INTO students_to_teachers (teacher_id, student_id) VALUES (?,?)', 5, 3);
  db.run('INSERT INTO students_to_teachers (teacher_id, student_id) VALUES (?,?)', 5, 4);
  db.run('INSERT INTO students_to_teachers (teacher_id, student_id) VALUES (?,?)', 5, 5);


  db.all('SELECT teacher_name, student_name FROM teachers NATURAL JOIN students_to_teachers NATURAL JOIN students NATURAL JOIN animals WHERE teacher_name="Albus Dumbledore"', function (error, data) {
    if (!error) console.log(data);
    else console.log(error);
  });

});

app.get('/', function (request, response) {
  db.all('SELECT * FROM students_to_teachers', function (error, data) {
    response.send(data);
  });
});

app.listen(3000, function (error) {
  if (!error) console.log('app listening port 3000');
});
