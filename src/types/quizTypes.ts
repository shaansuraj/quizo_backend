/**
 * @file quizTypes.ts
 * @desc Defines TypeScript interfaces/types for quiz entities.
 */

/**
 * @interface Quiz
 * @property {number} id - The unique ID of the quiz.
 * @property {string} title - The title of the quiz.
 * @property {string} description - A brief description of the quiz.
 * @property {number} teacher_id - The ID of the teacher who created this quiz.
 * @property {Date} created_at - The timestamp for when the quiz was created.
 */
export interface Quiz {
    id: number;
    title: string;
    description: string;
    teacher_id: number;
    created_at: Date;
  }
  