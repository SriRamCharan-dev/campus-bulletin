const express = require('express');
const path = require('path');
require('dotenv').config();
const app = express();
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override');
const mysql = require('mysql2');
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, "/public")));
app.set("views", path.join(__dirname, '/views'));
app.set("view engine", "ejs");

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
};

const connection = mysql.createConnection(dbConfig);

const createUsersTable = `
  CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
  )
`;

const createNoticesTable = `
  CREATE TABLE IF NOT EXISTS notices (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    category VARCHAR(255),
    event_date DATE,
    venue VARCHAR(255),
    roles VARCHAR(255),
    interested_count INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`;

connection.query(createUsersTable, (err) => {
  if (err) console.log("Error creating users table:", err);
  else console.log("Users table checked/created");
});

connection.query(createNoticesTable, (err) => {
  if (err) console.log("Error creating notices table:", err);
  else {
    console.log("Notices table checked/created");
    connection.query("SELECT * FROM notices LIMIT 1", (err, result) => {
      if (!err) console.log("Database connection & query verified.");
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/login`);
});

app.get("/admin", (req, res) => {
  try {
    connection.query("SELECT * FROM notices", (err, results) => {
      if (err) throw err;
      res.render("index.ejs", { announcements: results });
    });
  } catch (err) {
    console.log(err);
  }
});

app.get("/users", (req, res) => {
  try {
    connection.query("SELECT * FROM notices", (err, results) => {
      if (err) throw err;
      res.render("users.ejs", { announcements: results });
    });
  } catch (err) {
    console.log(err);
  }
});

app.get("/new", (req, res) => {
  res.render("new.ejs");
});

app.post("/new", (req, res) => {
  const { title, content, category, event_date, venue, admin_id } = req.body;
  const roles = 'admin';
  connection.query("INSERT INTO notices (title, content, category, event_date, venue, roles) VALUES (?, ?, ?, ?, ?, ?)", [title, content, category, event_date, venue, roles], (err, results) => {
    if (err) throw err;
    res.redirect("/admin");
  });
});

app.get("/edit/:id", (req, res) => {
  let { id } = req.params;
  connection.query("SELECT * FROM notices WHERE id = ?", [id], (err, results) => {
    if (err) throw err;
    if (results.length === 0) {
      return res.redirect("/admin");
    }
    res.render("edit.ejs", { announcement: results[0] });
  });
});

app.get("/delete/:id", (req, res) => {
  let { id } = req.params;
  connection.query("SELECT * FROM notices WHERE id = ?", [id], (err, results) => {
    if (err) throw err;
    if (results.length === 0) {
      return res.redirect("/admin");
    }
    res.render("delete.ejs", { announcement: results[0] });
  });
});

app.delete("/delete/:id", (req, res) => {
  let { id } = req.params;
  connection.query("DELETE FROM notices WHERE id = ?", [id], (err, results) => {
    if (err) throw err;
    res.redirect("/admin");
  });
});

app.patch("/edit/:id", (req, res) => {
  let { id } = req.params;
  let { title, content, category, event_date, venue } = req.body;
  connection.query(
    "UPDATE notices SET title = ?, content = ?, category = ?, event_date = ?, venue = ? WHERE id = ?",
    [title, content, category, event_date, venue, id],
    (err, results) => {
      if (err) throw err;
      res.redirect("/admin");
    }
  );
});

app.get("/signup", (req, res) => {
  res.render("signup.ejs");
});

app.post("/signup", (req, res) => {
  const { username, email, password } = req.body;
  connection.query("INSERT INTO users (username, email, password) VALUES (?, ?, ?)", [username, email, password], (err, results) => {
    if (err) {
      console.error(err);
      return res.redirect("/signup");
    }
    res.redirect("/login");
  });
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  connection.query("SELECT * FROM users WHERE email = ? AND password = ?", [email, password], (err, results) => {
    if (err) {
      console.error(err);
      return res.redirect("/login");
    }
    if (results.length > 0) {
      res.redirect("/users");
    } else {
      res.redirect("/login");
    }
  });
});

app.post("/interested/:id", (req, res) => {
  const { id } = req.params;
  connection.query("UPDATE notices SET interested_count = interested_count + 1 WHERE id = ?", [id], (err, results) => {
    if (err) {
      console.log(err);
      return res.redirect("/users");
    }
    res.redirect("/users");
  });
});
