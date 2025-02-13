/**
 * @file userTypes.ts
 * @desc Defines TypeScript interfaces/types for user entities.
 */

/**
 * @interface User
 * @property {number} id - The unique ID of the user.
 * @property {string} username - The username of the user.
 * @property {string} password - The user's password.
 */
export interface User {
    id: number;
    username: string;
    password: string;
  }
  