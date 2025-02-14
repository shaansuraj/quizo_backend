import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet'; // Adds security headers
import authRoutes from './routes/authRoutes';
import quizRoutes from './routes/quizRoutes';

dotenv.config();

/**
 * @file app.ts
 * @desc Creates and configures the Express application. Sets up middlewares, routes, etc.
 */

/**
 * Initialize and configure the Express application.
 * @returns {Application} The configured Express application.
 */
function createApp(): Application {
  const app: Application = express();

  // ----------------------------------------------------------------------------
  //                            Global Middlewares
  // ----------------------------------------------------------------------------

  // Configuring CORS to allow requests from any origin
  app.use(
    cors({
      origin: 'https://quizo-frontend.vercel.app', // Allowing only the frotnend
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    })
  );

  // Using helmet for basic security headers
  app.use(helmet());

  // Parse JSON request bodies
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
  // If none of the routes above matched, it's a 404 Not Found
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
