from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
import bcrypt
import os
from openai import OpenAI

# ======== Load environment variables ========
load_dotenv()

app = FastAPI()

# ======== CORS setup ========
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",  # local frontend
        "https://chatbot-fullstack-delta.vercel.app",  # deployed frontend (Vercel)
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ======== MongoDB setup ========
MONGO_URI = os.getenv("MONGO_URI")
if not MONGO_URI:
    raise Exception("❌ MONGO_URI not found in environment variables.")

client = AsyncIOMotorClient(MONGO_URI)
db = client["chatbot_db"]
users_collection = db["users"]

# ======== OpenAI setup ========
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
if not OPENAI_API_KEY:
    raise Exception("❌ OPENAI_API_KEY not found in environment variables.")

client_ai = OpenAI(api_key=OPENAI_API_KEY)

# ======== MODELS ========
class RegisterModel(BaseModel):
    username: str
    email: str
    password: str


class LoginModel(BaseModel):
    email: str
    password: str


class ChatModel(BaseModel):
    text: str


# ======== ROUTES ========

@app.post("/register")
async def register(user: RegisterModel):
    existing_user = await users_collection.find_one({"email": user.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed_pw = bcrypt.hashpw(user.password.encode("utf-8"), bcrypt.gensalt())
    user_doc = {
        "username": user.username,
        "email": user.email,
        "password": hashed_pw.decode("utf-8"),
    }
    await users_collection.insert_one(user_doc)
    return {"message": "✅ User registered successfully", "username": user.username}


@app.post("/login")
async def login(user: LoginModel):
    db_user = await users_collection.find_one({"email": user.email})
    if not db_user:
        raise HTTPException(status_code=400, detail="User not found")

    if not bcrypt.checkpw(
        user.password.encode("utf-8"), db_user["password"].encode("utf-8")
    ):
        raise HTTPException(status_code=400, detail="Invalid password")

    return {
        "message": "✅ Login successful",
        "username": db_user["username"],
        "email": db_user["email"],
    }


@app.post("/chat")
async def chat(request: ChatModel):
    try:
        completion = client_ai.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": request.text},
            ],
        )
        reply = completion.choices[0].message.content
        return {"reply": reply}

    except Exception as e:
        print("🚨 OpenAI API error:", e)
        raise HTTPException(status_code=500, detail=f"Chatbot error: {str(e)}")


@app.get("/")
def home():
    return {"message": "🚀 Chatbot backend is running successfully!"}
