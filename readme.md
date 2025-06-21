## 📚 Library Management API
A Library Management System built with Express, TypeScript, and MongoDB, enabling book creation, borrowing, filtering, and reporting.

## 🚀 Live URL
[🔗](https://library-management-api-a3.vercel.app/)

### 📺 Video Walkthrough
 [🎥]()

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
| POST	  | /api/books	 | Create a book |
| GET	  | /api/books	 | Get all books (filter/sort) |
| GET	  | /api/books/:bookId	| Get book by ID |
| PUT	  | /api/books/:bookId	| Update book |
| DELETE  | /api/books/:bookId	| Delete book |

## Filtering Example
```Http
GET /api/books?filter=FANTASY&sortBy=createdAt&sort=desc&limit=5
```

## 📙 Borrow
| Method	 | Endpoint	| Description |
| ----------- | -------- | ----------- |
| POST	  | /api/borrow	 | Borrow a book (quantity check + update copies) |
| GET	  | /api/borrow	 | Borrowed books summary (aggregation) |

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

-   [Public Github Repo Link ] (https://github.com/DeveloperMonirBD/Library_Management_API_A3)
-   [Live Deployment Link] (https://library-management-api-a3.vercel.app/)
-   [Video Explanation (Public Link)] ()

## 🙌 Author
Md. Monirul Islam