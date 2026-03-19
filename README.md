# FinAssessPro 📊

![FinAssessPro Status](https://img.shields.io/badge/Status-Active-brightgreen) ![License](https://img.shields.io/badge/License-MIT-blue.svg)

**Advanced Borrower Eligibility & Risk Assessment System**

FinAssessPro is a modern, comprehensive financial assessment platform designed to evaluate borrower eligibility and risk. It calculates a dynamic Business/Borrower Intelligence (BI) Score using advanced algorithms based on an applicant's profile, employment, credit history, and banking strength.

🌐 [**Live Demo**](https://finassess-pro.netlify.app/)

---

## ✨ Key Features

- **Multi-Step Assessment Form**: Seamless and intuitive UI guiding users through Profile, Employment/Business, Credit & Banking, and Financial Strength sections.
- **Dynamic BI Score Engine**: Calculates an intelligent score out of 100 based on core risk parameters (Age, Income, CIBIL, Bounce rates, Net Worth).
- **Risk Band Categorization**: Automatically categorizes the application into *Low Risk*, *Moderate Risk*, or *High Risk*.
- **Automated Email Notifications**: Real-time evaluation reports sent directly to the borrower via Resend integration.
- **Secure Architecture**: Implemented with robust backend security including Express Rate Limit, Mongo Sanitize, and XSS Clean.
- **Responsive & Accessible UI**: A beautiful, modern interface powered by Tailwind CSS and optimized for optimal user experience across all devices.

---

## 🛠️ Tech Stack

### Frontend
- **React (Vite ⚡)**: Fast and efficient frontend framework.
- **Tailwind CSS**: Utility-first CSS framework for a responsive and modern design.
- **Zustand**: Lightweight and scalable state management.
- **React Hook Form & Zod**: Robust form validation and error handling.
- **Lucide React**: Beautiful and cohesive icon set.

### Backend
- **Node.js & Express**: Fast and scalable web server.
- **MongoDB & Mongoose**: Flexible and powerful NoSQL database.
- **Resend**: Reliable and instant email delivery service.
- **Security Middlewares**: `cors`, `express-mongo-sanitize`, `express-rate-limit`, `xss-clean`.

---

## 📂 Project Structure

```text
FinAssessPro/
├── frontend/                # React (Vite) Application
│   ├── src/
│   │   ├── assets/          # Static assets
│   │   ├── components/      # Reusable UI components & Form Steps
│   │   ├── services/        # API integration logic
│   │   ├── store/           # Zustand state management
│   │   ├── validation/      # Zod validation schemas
│   │   ├── App.jsx          # Main App Component
│   │   └── main.jsx         # React Entry Point
│   └── package.json
└── backend/                 # Node.js / Express Server
    ├── src/
    │   ├── config/          # Database & Mailer configuration
    │   ├── controllers/     # API request handlers (Lead Controller)
    │   ├── middlewares/     # Rate Limiter & Security checks
    │   ├── models/          # Mongoose Schemas (Lead)
    │   ├── routes/          # Express Routers
    │   ├── utils/           # BI Score Calculator Logic
    │   └── app.js           # Express App Setup
    ├── server.js            # Server Entry Point
    └── package.json
```

---

## 🚀 Installation & Local Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-repo/FinAssessPro.git
   cd FinAssessPro
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   
   # Create a .env file based on environment variables needed
   # e.g., PORT=5000, MONGO_URI=..., RESEND_API_KEY=...

   # Start the backend server
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install

   # Start the vite development server
   npm run dev
   ```

4. **Access the application** at `http://localhost:5173`.

---

## 📬 Contact & Author

**Amit Kumar**

- 💼 **LinkedIn**: [linkedin.com/in/amit-cse](https://www.linkedin.com/in/amit-cse/)
- 📧 **Email**: [amit4321sg@gmail.com](mailto:amit4321sg@gmail.com)
- 🌐 **Project Live Link**: [FinAssessPro](https://finassess-pro.netlify.app/)
  
> *Developed with a passion for modern web technologies and secure financial systems. If you find this project interesting, feel free to reach out for a chat!*
