from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import HTTPBasic, HTTPBasicCredentials
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import secrets
import sys
import os

# Add parent directory to path to import database
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from database import get_user, create_user

app = FastAPI()
security = HTTPBasic()

# Allow CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create a demo user for testing
create_user("user", "password") # In real app, hash this!

def get_current_username(credentials: HTTPBasicCredentials = Depends(security)):
    user = get_user(credentials.username)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Basic"},
        )
    
    # Simple password check (plaintext for this part, or simple comparison)
    # In this part, we just compare plaintext for simplicity of "Basic Auth" concept
    # But since database.py stores "password_hash", let's assume we stored plaintext there for Part 2
    # OR we can just hardcode the check here for the tutorial flow.
    
    # Let's use the DB value.
    correct_password = user["password_hash"] 
    if not secrets.compare_digest(credentials.password, correct_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Basic"},
        )
    return credentials.username

@app.get("/protected")
def get_protected_data(username: str = Depends(get_current_username)):
    return {
        "message": f"Hello {username}, this is protected data!",
        "auth_type": "Basic Auth",
        "status": "success"
    }

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8002)
