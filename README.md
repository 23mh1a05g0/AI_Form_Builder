# 🚀 AI-Powered Conversational Form Builder

An intelligent full-stack application that converts natural language into dynamic forms using AI.  
Users can describe a form in plain English, and the system generates a structured JSON schema and renders a live interactive form.

---

## 📌 Features

- 💬 Conversational UI for form creation
- 🤖 AI-powered JSON Schema generation (Groq API)
- 🔁 Multi-turn conversation (schema updates)
- ✅ Schema validation with retry mechanism
- 🧠 Ambiguity detection with clarification questions
- 📄 Dynamic form rendering (React JSON Schema Form)
- 🔀 Schema diff visualization
- ⚡ Export options (JSON, cURL, Download)
- 🎨 Modern dark UI

---

## 🏗️ Tech Stack

### 🔹 Frontend
- React (Vite)
- CSS (Custom Styling)
- @rjsf/core (Form Rendering)

### 🔹 Backend
- Node.js
- Express.js
- Groq API (LLM)
- AJV (Schema Validation)

### 🔹 Tools
- Docker & Docker Compose
- Postman (Testing)

---

## 📂 Project Structure
AI_Form_Builder/
│
├── backend/
│ ├── src/
│ │ ├── controllers/
│ │ ├── routes/
│ │ ├── services/
│ │ ├── utils/
│ │ └── app.js
│ ├── .env.example
│ └── Dockerfile
│
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── styles.css
│ │ └── App.jsx
│ └── Dockerfile
│
├── docker-compose.yml
└── README.md


---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/ai-form-builder.git
cd ai-form-builder

Create .env inside backend/:

LLM_API_KEY=your_groq_api_key_here
PORT=8080

docker-compose up --build

```

## 🌐 Access Application
Frontend → http://localhost:3000
       
       OR

Frontend → http://localhost:3001
Backend → http://localhost:8080

## 🧪 API Endpoint
🔹 Generate Form
POST /api/form/generate

## 📥 Request
{
  "prompt": "Create a signup form with email and password"
}

## 📤 Response
{
  "formId": "abc123",
  "version": 1,
  "schema": {
    "type": "object",
    "properties": {
      "email": { "type": "string", "format": "email" },
      "password": { "type": "string" }
    }
  }
}

## 🧠 How It Works

User Input → AI (Groq) → JSON Schema → Validation → React UI → Form Rendering
User describes form in chat
Backend sends prompt to LLM
AI returns structured JSON schema
Schema validated using AJV
Frontend dynamically renders form
Updates happen in real-time

## 🔄 Advanced Features
🔹 Multi-turn Conversation

Update existing forms instead of recreating them.

🔹 Ambiguity Handling

AI asks clarification questions for unclear prompts.

🔹 Schema Diff

Shows changes between form versions.

🔹 Conditional Logic

Supports dynamic fields using x-show-when.

## 🎨 UI Highlights
Dark theme 🌙
Chat-style interface 💬
Real-time form preview 📄
Export tools ⚡