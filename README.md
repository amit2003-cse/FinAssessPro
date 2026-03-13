# 🚀 FinAssessPro – Advanced Borrower Eligibility & Risk Assessment

**FinAssessPro** is a full-stack financial assessment platform designed to evaluate borrower eligibility using structured financial, credit, and behavioral inputs.  
It calculates an automated eligibility score with risk classification and generates a professional email report for users.

🔗 **Live Demo:** https://finassess-pro.netlify.app/

---

## 📌 Features

- ✅ Multi-step financial assessment form (5-step workflow)
- ✅ Conditional flow (Salaried vs Business users)
- ✅ Automated eligibility score & risk classification
- ✅ Backend scoring engine with breakdown logic
- ✅ Email report delivery using Resend API
- ✅ Form validation with React Hook Form + Zod
- ✅ Persistent state using Zustand
- ✅ Production deployment with monitoring setup

---

## 🧠 Workflow

1️⃣ User Info  
2️⃣ Career / Business Details  
3️⃣ Banking Behaviour  
4️⃣ Assets & Liabilities  
5️⃣ Final Score & Email Report  

The system evaluates inputs and generates:

- 📊 Eligibility Score (out of 100)  
- ⚠️ Risk Band (Low / Moderate / High)  
- 📧 Professional email summary  

---

## 🛠️ Tech Stack

### 🔹 Frontend
- React (Vite)
- Tailwind CSS
- React Hook Form
- Zod Validation
- Zustand (State Management)

### 🔹 Backend
- Node.js
- Express.js
- MongoDB Atlas
- Custom BI Scoring Engine

### 🔹 Services & Deployment
- Resend (Email Service)
- Netlify (Frontend)
- Render (Backend)
- StatusIntel (Uptime Monitoring)

---

## ⚙️ Installation (Local Setup)

### 🔹 Clone Repository
```bash
git clone https://github.com/amit2003-cse/FinAssessPro
cd finassesspro

Frontend Setup
cd frontend
npm install
npm run dev
🔹 Backend Setup
cd backend
npm install
npm run dev
🔐 Environment Variables (Backend)

Create .env file:

PORT=5000
MONGO_URI=your_mongodb_uri
RESEND_API_KEY=your_resend_key
📊 Scoring Logic (Overview)

The eligibility score is calculated using weighted evaluation:

Profile Stability

Employment / Business Strength

Credit Behaviour

Banking Behaviour

Financial Strength

Each category contributes to the final eligibility score and risk band.

📬 Email Reporting

After submission:

✔ Score generated
✔ Stored in MongoDB
✔ Email sent automatically

Includes:

Score Summary

Risk Band

Breakdown

User Inputs Snapshot

🚀 Deployment

Frontend → Netlify

Backend → Render

Monitoring → StatusIntel

👨‍💻 Author

Amit
Full Stack Developer

⭐ Future Improvements

Admin dashboard for lead tracking

PDF BI report generation

Advanced analytics dashboard

Role-based access control

⭐ If you like this project, consider starring the repo!
