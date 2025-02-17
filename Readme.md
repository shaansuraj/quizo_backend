# Quizo Backend - Quiz Management System

## 📌 Project Overview
The **Quizo Backend** is a Node.js-based API built with **Express** and **TypeScript**, designed to manage quizzes for teachers. It provides authentication, quiz creation, retrieval, modification, and deletion features. The backend interacts with a **PostgreSQL** database and is deployed on **Render**.

### 🌐 Live API: [https://quizo-backend-brm8.onrender.com](https://quizo-backend-brm8.onrender.com)

> **Note:** Render **spins down free instances** after inactivity, so the **first request may take up to 50 seconds** before responding.

---

## 🚀 Features

- **Authentication**: Static credential-based login (no JWT).
- **CRUD Operations**: Create, Read, Update, and Delete quizzes.
- **PostgreSQL Integration**: Uses a relational database for persistent data.
- **RESTful API**: Standard RESTful API design principles.
- **Security Enhancements**: Helmet for security headers, HPP to prevent HTTP Parameter Pollution, and rate limiting.
- **Rate Limiting & Request Throttling**: Prevents API abuse with `express-rate-limit` and `express-slow-down`.
- **CORS Handling**: Configured to allow frontend interactions.

---

## 🛠️ Technologies Used

### **Backend Stack**
- **Node.js (with TypeScript)** - Backend runtime
- **Express.js** - Web framework
- **PostgreSQL** - Database
- **pg (node-postgres)** - PostgreSQL client
- **Cors** - Handling cross-origin requests
- **Helmet** - Security headers middleware
- **HPP (HTTP Parameter Pollution Prevention)** - Prevents query manipulation attacks
- **express-rate-limit** - Prevents excessive requests
- **express-slow-down** - Gradually increases response time for repeated requests
- **Dotenv** - Environment variable management

---

## 📂 Project Structure

```plaintext
backend/
│── src/
│   ├── config/
│   │   ├── database.ts    # Database connection setup
│   ├── controllers/
│   │   ├── authController.ts  # Handles authentication logic
│   │   ├── quizController.ts  # Handles quiz CRUD operations
│   ├── routes/
│   │   ├── authRoutes.ts  # Authentication routes
│   │   ├── quizRoutes.ts  # Quiz-related routes
│   ├── models/
│   │   ├── userModel.ts   # Database queries for users
│   │   ├── quizModel.ts   # Database queries for quizzes
│   ├── types/
│   │   ├── quizTypes.ts   # Type definitions for quizzes
│   │   ├── authTypes.ts   # Type definitions for authentication
│   ├── app.ts  # Express app setup
│   ├── server.ts  # Server entry point
│── .env  # Environment variables
│── package.json  # Dependencies and scripts
│── tsconfig.json  # TypeScript configuration
│── README.md  # Documentation
```

---

## 🔧 Setup & Installation

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/shaansuraj/quizo-backend.git
cd quizo-backend
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Configure Environment Variables
Create a **.env** file in the project root and add the following:
```env
PORT=5000
DATABASE_URL=postgresql://your-db-user:your-db-password@your-db-host/quizzo_db?sslmode=require
```

### 4️⃣ Run Database Migrations (If applicable)
```bash
npm run migrate
```

### 5️⃣ Start the Server
```bash
npm run dev
```
The API should now be running at **http://localhost:5000**.

---

## 📡 API Endpoints

### 🔐 Authentication
| Method | Endpoint | Description |
|--------|---------|-------------|
| `POST` | `/api/auth/login` | Logs in a teacher with static credentials |

#### Request Example
```json
{
  "username": "teacher",
  "password": "password"
}
```

#### Response Example (Success)
```json
{
  "message": "Login successful."
}
```

#### Response Example (Failure)
```json
{
  "message": "Invalid credentials."
}
```

---

### 📘 Quiz Management

| Method | Endpoint | Description |
|--------|---------|-------------|
| `POST` | `/api/quizzes` | Creates a new quiz |
| `GET`  | `/api/quizzes` | Retrieves all quizzes for a teacher |
| `GET`  | `/api/quizzes/:id` | Retrieves a specific quiz |
| `PUT`  | `/api/quizzes/:id` | Updates an existing quiz |
| `DELETE` | `/api/quizzes/:id` | Deletes a quiz |

---

## 🛡️ Security Enhancements
- **Rate Limiting (`express-rate-limit`)** → Prevents excessive API calls (100 requests per 15 min per IP).
- **Slow Down Requests (`express-slow-down`)** → Increases response time for repeated requests to prevent abuse.
- **Helmet Security Headers** → Protects against known vulnerabilities.
- **CORS Restricted** → Only allows requests from `https://quizo-frontend.vercel.app`.
- **HPP (`hpp`)** → Prevents HTTP Parameter Pollution attacks.

---

## 📝 Known Issues & Notes
- **Render Free Tier Delay:** The first request to the backend **may take up to 50 seconds** due to Render spinning down inactive instances.
- **No JWT Authentication:** Currently, authentication is done using static credentials.

---

## 📜 License
This project is open-source under the **MIT License**.

---

## 👨‍💻 Contributing
1. Fork the repo
2. Create a new branch (`git checkout -b feature-branch`)
3. Make your changes
4. Commit (`git commit -m "Added feature"`)
5. Push (`git push origin feature-branch`)
6. Open a Pull Request 🚀

---

## 🎯 Summary
- 🛠 **Built with:** Node.js, Express, PostgreSQL, TypeScript
- 🔗 **Live API Hosted at:** [https://quizo-backend-brm8.onrender.com](https://quizo-backend-brm8.onrender.com)
- 🎯 **Key Features:** Authentication, Quiz CRUD, PostgreSQL integration, Security Enhancements
- 🚀 **How to run:** Clone, install dependencies, start the server

Enjoy building your Quiz Management System with Quizo! 🚀

