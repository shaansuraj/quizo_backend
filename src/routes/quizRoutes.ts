import { Router } from 'express';
import {
  createQuiz,
  getQuizzes,
  getSingleQuiz,
  updateQuiz,
  deleteQuiz,
} from '../controllers/quizController';


/**
 * @file quizRoutes.ts
 * @desc Defines routes for quiz-related operations (/api/quizzes).
 */

const router = Router();

/**
 * POST /api/quizzes
 * Create a new quiz record.
 */
router.post('/', /* requireAuth, */ createQuiz);

/**
 * GET /api/quizzes
 * Retrieve all quizzes belonging to a specific teacher (teacher_id in query).
 */
router.get('/', /* requireAuth, */ getQuizzes);

/**
 * GET /api/quizzes/:id
 * Retrieve a single quiz by ID.
 */
router.get('/:id', /* requireAuth, */ getSingleQuiz);

/**
 * PUT /api/quizzes/:id
 * Update a quiz's title/description by ID.
 */
router.put('/:id', /* requireAuth, */ updateQuiz);

/**
 * DELETE /api/quizzes/:id
 * Delete a quiz by ID.
 */
router.delete('/:id', /* requireAuth, */ deleteQuiz);

export default router;
