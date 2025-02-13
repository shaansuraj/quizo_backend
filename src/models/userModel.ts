import pool from '../config/database';
import { User } from '../types/userTypes';

/**
 * @file userModel.ts
 * @desc Provides database queries and logic for user-related data.
 */

/**
 * Finds a user by username and password in the database.
 * @param {string} username - The username to search for.
 * @param {string} password - The password to match.
 * @returns {Promise<User | null>} The matching user or null if none found.
 */
export async function findUserByCredentials(
  username: string,
  password: string
): Promise<User | null> {
  const query = `SELECT * FROM users WHERE username = $1 AND password = $2 LIMIT 1`;
  const values = [username, password];

  const result = await pool.query<User>(query, values);
  if ((result.rowCount ?? 0) > 0) {
    return result.rows[0];
  }
  return null;
}
