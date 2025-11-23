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

from passlib.context import CryptContext

# Switching to pbkdf2_sha256 to avoid compatibility issues between passlib and newer bcrypt versions
pwd_context = CryptContext(schemes=["pbkdf2_sha256"], deprecated="auto")

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

# Create a demo user for testing with HASHED password
# Note: In a real app, you wouldn't hash it on startup every time if it exists, 
# but create_user handles "if exists" check.
# We need to make sure we don't overwrite the existing "user" with a different hash format if it was already created.
# For this tutorial, let's just create a new user "user_hashed" or update the existing one if we could.
create_user("basic_user", get_password_hash("password"))

def get_current_username(credentials: HTTPBasicCredentials = Depends(security)):
    user = get_user(credentials.username)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Basic"},
        )
    
    correct_password_hash = user["password_hash"] 
    if not verify_password(credentials.password, correct_password_hash):
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
