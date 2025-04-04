# Comment Search Challenge

The goal is to implement a search UI that interacts with a public API and displays filtered comments.

---

## 📦 Stack

- **Next.js 15 (App Router)**
- **React**
- **TypeScript**
- **TailwindCSS + shadcn/ui**
- **Jest** for testing
- **Docker** for containerization

---

## ✨ Features

- 🔍 Search for comments by a specific text inside their `body`
- ✅ Search is triggered **only on form submit**
- 🚫 Does nothing if the query is 3 characters or fewer
- 📄 Returns a **maximum of 20 results**
- 📬 Displays `name`, `email`, and a summary of `body` (up to 64 characters)
- 💬 Modal dialog to expand the comment
- 📦 Fully Dockerized – runs in a container on port `8080`

---

## 🚀 Run Instructions with Docker

### 1. Clone the repository

```bash
git clone git@github.com:nashmonzon/Comments-Search.git
cd Comments-Search
```
```bash
docker build -t comment_search:latest .
```
```bash
docker run -p 8080:8080 comment_search:latest
```
Visit http://localhost:8080

## 🧪 Testing
This project uses Jest for testing.
Tests are focused on the most critical logic: filtering and limiting results.

To run tests:
```bash
npx jest
```

## 📁 Project structure
```bash
/app             → Next.js App Router entry point
/components      → UI components
/lib             → Logic (fetching, helpers)
/types           → Shared types
/utils           → Utility functions (e.g., getAvatarColor, truncate)
__tests__        → Unit tests (Jest)
```

## 👤 Author
Ignacio Monzón
linkedin.com/in/ignaciomonzon

