## 📚 Library Management API
A Library Management System built with Express, TypeScript, and MongoDB, enabling book creation, borrowing, filtering, and reporting.

## 🚀 Live URL
[🔗](https://library-management-api-a4.vercel.app/)

## 📦 Features
-   ✅ Book CRUD operations with schema validation
-   ✅ Genre filtering & sorting support
-   ✅ Borrowing books with availability enforcement
-   ✅ Aggregation pipeline for summary reports
-   ✅ Global error handling (including validation & 404)
-   ✅ Uses Mongoose middleware & static/instance methods

## 🧑‍💻 Tech Stack
-   Node.js + Express.js
-   TypeScript
-   MongoDB + Mongoose
-   ESLint, Prettier
-   Postman (for API testing)

## 🛠️ Installation & Setup
```Bash
git clone https://github.com/your-username/library-management-api.git
cd library-management-api
npm install
```

## 🌐 Create `.env` File
```Bash
PORT=5000
DATABASE_URL=your_mongodb_connection_string
```

## 🔧 Run Locally
```Bash
npm run dev
```

## 🧪 API Endpoints
### 📘 Books
| Method	 | Endpoint	| Description |
| ----------- | -------- | ----------- |
| POST	  | /create-book	 | Create a book |
| GET	  | /books	 | Get all books (filter/sort) |
| GET	  | /books/:id	| Get book by ID |
| PUT	  | /edit-book/:id	| Update book |
| DELETE  | /books/:id	| Delete book |

## Filtering Example
```Http
GET /books?filter=FANTASY&sortBy=createdAt&sort=desc&limit=5
```

## 📙 Borrow
| Method	 | Endpoint	| Description |
| ----------- | -------- | ----------- |
| POST	  | /borrow/:bookId	 | Borrow a book (quantity check + update copies) |
| GET	  | /borrow-summary | Borrowed books summary (aggregation) |

## 🧩 Business Logic Highlights

-   ✅ Borrow operation ensures book has enough copies
-   ✅ available status is updated via Mongoose static method
-   ✅ Uses aggregation pipeline to summarize total borrows
-   ✅ Mongoose middleware handles createdAt & updatedAt

## ⚠️ Error Handling Example
```Json
{
  "message": "Validation failed",
  "success": false,
  "error": {
    "name": "ValidationError",
    "errors": {
      "copies": {
        "message": "Copies must be a positive number",
        "kind": "min",
        "value": -5
      }
    }
  }
}
```

## What to Submit

-   [Public Github Repo Link ] (https://github.com/DeveloperMonirBD/Library_Management_API)
-   [Live Deployment Link] (https://library-management-api-a4.vercel.app/)
-   [Video Explanation (Public Link)] ()

## 🙌 Author
Md. Monirul Islam