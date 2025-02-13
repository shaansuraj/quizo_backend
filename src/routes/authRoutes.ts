import { Router } from 'express';
import { loginUser } from '../controllers/authController';

/**
 * @file authRoutes.ts
 * @desc Defines routes for authentication operations (/api/auth).
 */

const router = Router();

/**
 * POST /api/auth/login
 * @description Logs the user in by verifying credentials.
 */
router.post('/login', loginUser);

export default router;
