import pg from "pg";

const Pool = pg.Pool;

const pool = new Pool({
  user: "postgres",
  password: ".-.--..---...-",
  host: "localhost",
  port: 5432,
  database: "loginsystem"
});

export default pool;