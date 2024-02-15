const mysql = require('mysql');
const db = require('../Config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
  const { name, email, password } = req.body;

  // Hash the password using bcrypt
  const hashedPassword = await bcrypt.hash(password, 10);
  const sql = "INSERT INTO login (`name`,`email`,`password`) VALUES (?)";
  const values = [name, email, hashedPassword];

  db.query(sql, [values], (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Error creating user" });
    }
    return res.status(201).json({ message: "User created successfully" });
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM login WHERE `email` = ?";
  db.query(sql, [email], async (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Error fetching user" });
    }

    if (data.length > 0) {
      // Compare the hashed password using bcrypt
      const isPasswordValid = await bcrypt.compare(password, data[0].password);

      if (isPasswordValid) {
        // Generate JWT token
        const token = jwt.sign({ userId: data[0].id }, '5b1a5a6da7adf5a3f46d938d9dbdc8158985177329e0c9130cfd22973771ce4db85d57d1c446ce77231915b1aa43e4777110d64a9256686405b8a014ef624d8e', { expiresIn: '1d' });

        return res.status(200).json({ message: "Login successful", token });
      } else {
        return res.status(401).json({ error: "Invalid credentials" });
      }
    } else {
      return res.status(404).json({ error: "User not found" });
    }
  });
};

module.exports = {
  signup,
  login,
};