import express, { Request, Response } from "express";
import cors from "cors";
import pool from "./db.ts";

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// register a new user
app.post("/register", async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: "Username and password are required" });
    }
    const userExists = await pool.query(
      "SELECT * FROM userbase WHERE username = $1",
      [username]
    );
    if (userExists.rows.length > 0) {
      return res.status(409).json({ error: "Username already exists" });
    }
    const newUser = await pool.query(
      "INSERT INTO userbase (username, password) VALUES($1, $2) RETURNING *",
      [username, password]
    );
    res.status(201).json({ success: true, user: newUser.rows[0] });
  } catch (err) {
    console.error((err as Error).message);
    res.status(500).json({ error: "Server error" });
  }
});

// authenticate a user
app.post("/login", async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: "Username and password are required" });
    }
    const result = await pool.query(
      "SELECT * FROM userbase WHERE username = $1 AND password = $2",
      [username, password]
    );
    if (result.rows.length > 0) {
      // Authentication successful
      res.json({ success: true, user: result.rows[0] });
    } else {
      // Authentication failed
      res.status(401).json({ success: false, error: "Invalid credentials" });
    }
  } catch (err) {
    console.error((err as Error).message);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(3000, () => {
  console.log("server has started on port 3000");
});