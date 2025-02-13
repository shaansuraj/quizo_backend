import { Request, Response } from 'express';
import {
  createQuiz as createQuizModel,
  getAllQuizzesByTeacher,
  getQuizById,
  updateQuiz as updateQuizModel,
  deleteQuiz as deleteQuizModel,
} from '../models/quizModel';

/**
 * @file quizController.ts
 * @desc Controller functions that handle requests for quiz-related operations (CRUD).
 */

/**
 * @function createQuiz
 * @desc Creates a new quiz record.
 * @param {Request} req - Express request with quiz data in the body.
 * @param {Response} res - Express response.
 */
export async function createQuiz(req: Request, res: Response): Promise<void> {
  try {
    const { title, description, teacher_id } = req.body;

    if (!title || !description || !teacher_id) {
      res
        .status(400)
        .json({ message: 'Title, description, and teacher_id are required.' });
      return;
    }

    const newQuiz = await createQuizModel(title, description, Number(teacher_id));
    res.status(201).json(newQuiz);
  } catch (error) {
    console.error('[createQuiz] Error:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
}

/**
 * @function getQuizzes
 * @desc Retrieves all quizzes for a given teacher ID.
 * @param {Request} req - Express request with teacher_id in query params or body.
 * @param {Response} res - Express response returning an array of quizzes.
 */
export async function getQuizzes(req: Request, res: Response): Promise<void> {
  try {
    // teacher_id can come from query or from session in a real app
    const teacherId = Number(req.query.teacher_id);

    if (!teacherId) {
      res.status(400).json({ message: 'teacher_id is required.' });
      return;
    }

    const quizzes = await getAllQuizzesByTeacher(teacherId);
    res.status(200).json(quizzes);
  } catch (error) {
    console.error('[getQuizzes] Error:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
}

/**
 * @function getSingleQuiz
 * @desc Retrieves a single quiz by ID.
 * @param {Request} req - Express request with quiz ID in params.
 * @param {Response} res - Express response returning the quiz object.
 */
export async function getSingleQuiz(req: Request, res: Response): Promise<void> {
  try {
    const quizId = Number(req.params.id);
    if (!quizId) {
      res.status(400).json({ message: 'Invalid quiz ID.' });
      return;
    }

    const quiz = await getQuizById(quizId);
    if (!quiz) {
      res.status(404).json({ message: 'Quiz not found.' });
      return;
    }

    res.status(200).json(quiz);
  } catch (error) {
    console.error('[getSingleQuiz] Error:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
}

/**
 * @function updateQuiz
 * @desc Updates the title/description of an existing quiz.
 * @param {Request} req - Express request with quiz ID in params, updates in body.
 * @param {Response} res - Express response returning updated quiz data.
 */
export async function updateQuiz(req: Request, res: Response): Promise<void> {
  try {
    const quizId = Number(req.params.id);
    const { title, description } = req.body;

    if (!quizId || !title || !description) {
      res
        .status(400)
        .json({ message: 'Quiz ID, title, and description are required.' });
      return;
    }

    const updatedQuiz = await updateQuizModel(quizId, title, description);
    if (!updatedQuiz) {
      res.status(404).json({ message: 'Quiz not found.' });
      return;
    }

    res.status(200).json(updatedQuiz);
  } catch (error) {
    console.error('[updateQuiz] Error:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
}

/**
 * @function deleteQuiz
 * @desc Deletes a quiz by ID.
 * @param {Request} req - Express request with quiz ID in params.
 * @param {Response} res - Express response with success message or error.
 */
export async function deleteQuiz(req: Request, res: Response): Promise<void> {
  try {
    const quizId = Number(req.params.id);
    if (!quizId) {
      res.status(400).json({ message: 'Invalid quiz ID.' });
      return;
    }

    const success = await deleteQuizModel(quizId);
    if (!success) {
      res.status(404).json({ message: 'Quiz not found.' });
      return;
    }

    res.status(200).json({ message: 'Quiz deleted successfully.' });
  } catch (error) {
    console.error('[deleteQuiz] Error:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
}
