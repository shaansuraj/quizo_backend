import createApp from './app';
import dotenv from 'dotenv';

dotenv.config();

/**
 * @file server.ts
 * @desc Entry point that starts the Express server on a specified port.
 */

const PORT = process.env.PORT || 5000; 
(async () => {
  try {
    const app = createApp();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error starting the server:', error);
    process.exit(1);
  }
})();
