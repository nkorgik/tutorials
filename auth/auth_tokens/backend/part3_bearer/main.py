from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn
import uuid
import sys
import os

# Add parent directory to path to import database
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from database import get_user, create_user

app = FastAPI()
security = HTTPBearer()

# In-memory token storage for simplicity
# token -> username
TOKENS = {}

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class LoginRequest(BaseModel):
    username: str
    password: str

@app.post("/login")
def login(data: LoginRequest):
    user = get_user(data.username)
    # In a real app, use password hashing!
    if not user or user["password_hash"] != data.password:
        raise HTTPException(status_code=400, detail="Invalid credentials")
    
    token = str(uuid.uuid4())
    TOKENS[token] = data.username
    return {"access_token": token, "token_type": "bearer"}

def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials
    username = TOKENS.get(token)
    if not username:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return username

@app.get("/protected")
def get_protected_data(username: str = Depends(get_current_user)):
    return {
        "message": f"Hello {username}, you accessed this with a Bearer token!",
        "auth_type": "Bearer Token",
        "status": "success"
    }

if __name__ == "__main__":
    # Create user if not exists
    create_user("user", "password")
    uvicorn.run(app, host="0.0.0.0", port=8003)
