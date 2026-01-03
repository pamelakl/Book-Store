# 📚 Book Store – Full Stack Web Application

A full-stack Book Store web application that allows users to browse books, manage a shopping cart, and place orders, with authentication and admin capabilities.  
Built as a **production-style project** to practice real-world backend and frontend patterns.

---

## 🚀 Features

### User Features
- User registration & login (JWT authentication)
- Browse available books
- View book details
- Add / remove books from cart
- Place orders
- View order history

### Admin Features
- Add new books
- Update existing books
- Delete books
- Manage inventory

---

## 🛠 Tech Stack

### Frontend
- React
- JavaScript (ES6+)
- HTML5 / CSS3
- Axios

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT (authentication & authorization)

---

## 🏗 Architecture Highlights

- RESTful API design
- Separation of concerns (routes / controllers / models)
- Middleware for authentication & authorization
- MongoDB schemas with validation
- Clear distinction between user and admin permissions

---

## 📂 Project Structure

book-store/
├── client/                 # React frontend
│   └── src/
│       ├── components/
│       ├── pages/
│       └── services/
│
├── server/                 # Node.js backend
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   └── config/
│
└── README.md


---

## ⚙️ Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB (local or Atlas)

### Installation

### 1. Clone the repository
```bash
git clone https://github.com/<your-username>/book-store.git

### 2. Install backend dependencies
cd server
npm install

### 3. Install frontend dependencies
cd ../client
npm install

### 4. Create a .env file in server/
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000

### 5. Run the application
Backend:
cd server
npm run dev

Frontend:
cd client
npm start



