import pool from '../config/database';
import { Quiz } from '../types/quizTypes';

/**
 * @file quizModel.ts
 * @desc Provides database queries and logic for quiz-related data.
 */

/**
 * Creates a new quiz in the database.
 * @param {string} title - Quiz title.
 * @param {string} description - Quiz description.
 * @param {number} teacherId - The ID of the teacher creating the quiz.
 * @returns {Promise<Quiz>} The newly created quiz record.
 */
export async function createQuiz(
  title: string,
  description: string,
  teacherId: number
): Promise<Quiz> {
  const query = `
    INSERT INTO quizzes (title, description, teacher_id)
    VALUES ($1, $2, $3)
    RETURNING *
  `;
  const values = [title, description, teacherId];

  const result = await pool.query<Quiz>(query, values);
  return result.rows[0];
}

/**
 * Retrieves all quizzes for a specific teacher.
 * @param {number} teacherId - The teacher's ID.
 * @returns {Promise<Quiz[]>} An array of quiz records.
 */
export async function getAllQuizzesByTeacher(
  teacherId: number
): Promise<Quiz[]> {
  const query = `
    SELECT * FROM quizzes
    WHERE teacher_id = $1
    ORDER BY created_at DESC
  `;
  const values = [teacherId];

  const result = await pool.query<Quiz>(query, values);
  return result.rows;
}

/**
 * Retrieves a single quiz by its ID.
 * @param {number} quizId - The quiz ID.
 * @returns {Promise<Quiz | null>} The quiz record or null if not found.
 */
export async function getQuizById(quizId: number): Promise<Quiz | null> {
  const query = `SELECT * FROM quizzes WHERE id = $1 LIMIT 1`;
  const values = [quizId];

  const result = await pool.query<Quiz>(query, values);
  if ((result.rowCount ?? 0) > 0) {
    return result.rows[0];
  }
  return null;
}

/**
 * Updates an existing quiz.
 * @param {number} quizId - The quiz ID.
 * @param {string} title - The new quiz title.
 * @param {string} description - The new quiz description.
 * @returns {Promise<Quiz | null>} The updated quiz or null if not found.
 */
export async function updateQuiz(
  quizId: number,
  title: string,
  description: string
): Promise<Quiz | null> {
  const query = `
    UPDATE quizzes
    SET title = $1, description = $2
    WHERE id = $3
    RETURNING *
  `;
  const values = [title, description, quizId];

  const result = await pool.query<Quiz>(query, values);
  if ((result.rowCount ?? 0) > 0) {
    return result.rows[0];
  }
  return null;
}

/**
 * Deletes a quiz by ID.
 * @param {number} quizId - The quiz ID.
 * @returns {Promise<boolean>} True if successfully deleted, false otherwise.
 */
export async function deleteQuiz(quizId: number): Promise<boolean> {
  const query = `DELETE FROM quizzes WHERE id = $1 RETURNING id`;
  const values = [quizId];

  const result = await pool.query(query, values);
  return (result.rowCount ?? 0) > 0;
}
