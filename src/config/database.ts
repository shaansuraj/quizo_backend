import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

/**
 * @file database.ts
 * @desc Configures and exports a Pool instance for PostgreSQL database operations
 *       using a single DATABASE_URL environment variable.
 */

// 1. Read the DATABASE_URL from environment variables
const connectionString = process.env.DATABASE_URL;

// 2. If DATABASE_URL is not found, throw an error (helps catch config mistakes)
if (!connectionString) {
  throw new Error("DATABASE_URL not set in environment variables");
}

// 3. Create a new Pool using the connection string
const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
});

// 4. Optional: Test the connection immediately
pool
  .connect()
  .then((client) => {
    console.log('Database connected successfully.');
    client.release(); // Release the client back to the pool
  })
  .catch((err) => {
    console.error('Error connecting to the database:', err);
  });

export default pool;
