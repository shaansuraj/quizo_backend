import { Request, Response } from 'express';
import { findUserByCredentials } from '../models/userModel';

/**
 * @file authController.ts
 * @desc Handles authentication-related requests (login).
 */

/**
 * @function loginUser
 * @desc Logs a user in by verifying the provided credentials.
 *       For demonstration, we do not issue any token/session; we simply return a success status.
 * @param {Request} req - Express request object, containing username and password in body.
 * @param {Response} res - Express response object.
 */
export async function loginUser(req: Request, res: Response): Promise<void> {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      res.status(400).json({ message: 'Username and password are required.' });
      return;
    }

    const user = await findUserByCredentials(username, password);
    if (!user) {
      res.status(401).json({ message: 'Invalid credentials.' });
      return;
    }

    // For the assignment, I am simply returning success without JWT or session as mentioned in the assignment doc.
    res.status(200).json({ message: 'Login successful.' });
  } catch (error) {
    console.error('[loginUser] Error:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
}
