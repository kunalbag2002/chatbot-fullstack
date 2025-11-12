# 🧠 Chatbot — Full Stack AI Assistant
*A modern ChatGPT-style chatbot built with React (frontend), FastAPI (backend), MongoDB, and OpenAI API.*

---

### 🚀 Tech Stack
| Layer | Technology |
|--------|-------------|
| **Frontend** | React + Vite + TailwindCSS |
| **Backend** | FastAPI (Python) |
| **Database** | MongoDB Atlas |
| **AI Engine** | OpenAI GPT model |
| **Authentication** | Local login/register (no JWT) |
| **Styling** | TailwindCSS (dark theme, modern UI) |

---

## 📸 Preview
*(Optional – add screenshots here)*  
```
/frontend/src/assets/screenshot.png
```

---

## ✨ Features

✅ Modern chat interface inspired by ChatGPT  
✅ FastAPI backend with MongoDB user management  
✅ Secure login and registration  
✅ Message persistence ready for extension  
✅ Integrated OpenAI GPT replies  
✅ Fully responsive dark-themed UI  
✅ Easy to deploy on any platform (Render / Vercel / Railway)

---

## 🧩 Project Structure

```
Chatbot-fullstack/
├── chatBot-frontend/         # React + Vite frontend
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Chat.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── tailwind.config.js
│
├── chatBot-backend/          # FastAPI backend
│   ├── main.py
│   ├── .env                  # (contains API keys – never push)
│   ├── requirements.txt
│   └── database.py (optional)
│
└── README.md
```

---

## ⚙️ Environment Variables

Create a `.env` file **inside your backend folder** (`chatBot-backend/.env`):

```
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/Chatbot_DB
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

> ⚠️ **Important:**  
> Do **NOT** commit `.env` to GitHub.  
> Add this to `.gitignore`:
> ```
> .env
> *.env
> chatBot-backend/.env
> ```

---

## 🧰 Installation & Setup

### 1️⃣ Clone the repo
```bash
git clone https://github.com/kunalbag2002/chatbot-fullstack.git
cd chatbot-fullstack
```

---

### 2️⃣ Frontend Setup
```bash
cd chatBot-frontend
npm install
npm run dev
```
Access at → **http://localhost:5173**

---

### 3️⃣ Backend Setup
```bash
cd ../chatBot-backend
pip install -r requirements.txt
uvicorn main:app --reload
```
Backend runs on → **http://127.0.0.1:8000**

---

### 4️⃣ Test Chat
- Register a new user → `/register`
- Login → `/login`
- Start chatting → `/chat`

---

## 🧠 API Endpoints (FastAPI)

| Method | Endpoint | Description |
|---------|-----------|-------------|
| `POST` | `/register` | Register new user |
| `POST` | `/login` | Login existing user |
| `POST` | `/chat` | Send message to AI assistant |

---

## 🔐 Security Notes
- Never push `.env` to GitHub.
- Use environment variables for all keys.
- If a secret was committed accidentally, rotate the API key immediately.

---

## 💬 Future Enhancements
- JWT authentication  
- Chat history persistence in MongoDB  
- Multi-user conversations  
- Deployment with Docker + CI/CD pipeline  

---

## 🧑‍💻 Author
**Kunal Bag**  
[GitHub](https://github.com/kunalbag2002) · [LinkedIn](https://linkedin.com/in/kunalbag2002)

---

## 📝 License
This project is licensed under the **MIT License**.  
Feel free to use and modify it for your learning or projects.
