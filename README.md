# 📊 FinAssessPro

**FinAssessPro** is a high-performance, AI-driven financial assessment platform designed for modern lending ecosystems. It provides a comprehensive analysis of borrower eligibility and risk profiles using an advanced **Borrower Intelligence (BI) Score** engine.

![Banner](https://img.shields.io/badge/FinAssessPro-v1.0.0-emerald?style=for-the-badge&logo=rocket)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)

---

## 🚀 Vision
FinAssessPro aims to bridge the transparency gap between borrowers and lenders. By analyzing **20+ critical financial parameters**, it delivers an instant, data-backed assessment that empowers users to understand their financial standing before approaching institutional lenders.

---

## ✨ Key Features

- **🏆 Dynamic BI Score Engine**: A proprietary algorithm that evaluates Age, Employment Stability, Credit History (CIBIL), Banking Behavior, and Asset-to-Liability ratios.
- **🛡️ Risk Categorization**: Instant classification into **Low**, **Moderate**, or **High Risk** bands with color-coded visual indicators.
- **🎨 Premium UX/UI**: A glassmorphic, responsive interface built with Tailwind CSS 4, featuring a smooth multi-step assessment flow.
- **📬 Automated Intelligence Reports**: Real-time integration with **Resend** to deliver detailed score breakdowns directly to the user's inbox.
- **🔒 Enterprise-Grade Security**: Built-in protection against common vulnerabilities using `mongo-sanitize`, `xss-clean`, and sophisticated rate-limiting.
- **⚡ Root-Level Orchestration**: Single-command execution for the entire full-stack environment.

---

## 🛠️ Tech Stack

| Component | Technology |
| :--- | :--- |
| **Frontend** | React 19, Vite, Tailwind CSS 4, Zustand, React Hook Form, Zod |
| **Backend** | Node.js, Express 5, Mongoose, Resend API |
| **Database** | MongoDB Atlas (NoSQL) |
| **Security** | Express Rate Limit, Mongo Sanitize, XSS Clean |
| **Icons** | Lucide React |

---

## 📂 Project Architecture

```text
FinAssessPro/
├── root/                    # Orchestration & Concurrency
├── frontend/                # React (Vite) Client
│   ├── src/components/      # Premium Step-based UI Components
│   ├── src/store/           # Centralized Form State
│   └── src/validation/      # Zod Schema Definitions
└── backend/                 # API & Logic Server
    ├── src/controllers/     # Lead Processing Logic
    ├── src/utils/           # BI Scoring Algorithms
    └── src/config/          # Mailer & DB Connectors
```

---

## 🏁 Getting Started

### 1. Installation
Clone the repository and install dependencies for all modules from the root directory:
```bash
git clone https://github.com/amit2003-cse/FinAssessPro.git
cd FinAssessPro
npm run install-all
```

### 2. Environment Configuration
Create a `.env` file in the `backend/` directory:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
RESEND_API_KEY=your_resend_api_key
```

### 3. Launch the Platform
Run both the frontend and backend concurrently with a single command from the root:
```bash
npm run dev
```
Explore the application at **`http://localhost:5173`**.

---

## 👩‍💻 Developed By

**Amit Kumar**  
*Fullstack Developer | Financial Tech Enthusiast*

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/amit-cse/)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/amit2003-cse)

---

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
