import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import slowDown from 'express-slow-down';
import hpp from 'hpp';
import authRoutes from './routes/authRoutes';
import quizRoutes from './routes/quizRoutes';

dotenv.config();

/**
 * @file app.ts
 * @desc Creates and configures the Express application with security enhancements.
 */

/**
 * Initialize and configure the Express application.
 * @returns {Application} The configured Express application.
 */
function createApp(): Application {
  const app: Application = express();

  // ----------------------------------------------------------------------------
  //                            Security Middlewares
  // ----------------------------------------------------------------------------

  // ✅ Rate Limiting: Allow max 100 requests per 15 minutes per IP
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per window
    message: { message: 'Too many requests, please try again later.' },
    headers: true,
  });

  // ✅ Slow Down: Gradually slow down repeated requests from the same IP
  const speedLimiter = slowDown({
    windowMs: 15 * 60 * 1000, // 15 minutes
    delayAfter: 50, // Allow first 50 requests at normal speed
    delayMs: (hits) => hits * 100, // Add 100ms delay per extra request
  });

  // ✅ Configure CORS: Only allow frontend requests
  app.use(
    cors({
      origin: ['https://quizo-frontend.vercel.app'], // Allow only the frontend
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true,
    })
  );

  // ✅ Secure HTTP Headers
  app.use(helmet());

  // ✅ Prevent HTTP Parameter Pollution (HPP)
  app.use(hpp());

  // ✅ Apply Rate Limiting and Slowdown
  app.use(limiter);
  app.use(speedLimiter);

  // ✅ Parse JSON request bodies
  app.use(express.json());

  // ----------------------------------------------------------------------------
  //                              Routes
  // ----------------------------------------------------------------------------

  // Authentication routes
  app.use('/api/auth', authRoutes);

  // Quiz routes
  app.use('/api/quizzes', quizRoutes);

  // Health check route
  app.get('/api/health', (_req: Request, res: Response) => {
    res.status(200).json({ status: 'ok' });
  });

  // ----------------------------------------------------------------------------
  //                            404 Fallback
  // ----------------------------------------------------------------------------
  app.use((_req: Request, res: Response) => {
    res.status(404).json({ message: 'Resource not found' });
  });

  // ----------------------------------------------------------------------------
  //                      Global Error-Handling Middleware
  // ----------------------------------------------------------------------------
  app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error('[Global Error Handler]', err);
    res.status(500).json({
      message: 'An unexpected error occurred on the server.',
      error: err.message,
    });
  });

  return app;
}

export default createApp;
