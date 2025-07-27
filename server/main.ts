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
    const newUser = await pool.query(
      "INSERT INTO userbase (username, password) VALUES($1, $2) RETURNING *",
      [username, password]
    );
    res.json(newUser.rows[0]);
  } catch (err) {
    console.error((err as Error).message);
    res.status(500).json({ error: "Server error" });
  }
});

// authenticate a user
app.post("/login", async (_req: Request, res: Response) => {
  try {
    const authUser = await pool.query("SELECT * FROM userbase");
    console.log(authUser);
  } catch (err) {
    console.error((err as Error).message);
    res.status(500).json({ error: "Server error" });
  }
});


app.listen(3000, () => {
  console.log("server has started on port 3000");
});
