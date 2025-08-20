# Auth-Flow-Integration
A Stylish frontend project that integrates with an external Authentication API for user login, registration, and password reset via OTP.

# Features

User Registration (via /auth/newuser)

User Login (via /auth/login) with JWT token

Welcome Screen (shows token-based user data)

Password Reset with OTP (via reset endpoint)



# Setup Instructions

Clone this repository:

git clone https://github.com/<your-username>/jwt-auth-frontend.git
cd jwt-auth-frontend


Open index.html in a browser.

Make sure you are connected to the provided API:

https://os-project-server.vercel.app/

# Authentication Flow

Register: Create a new user with username, email, and password.

Login: Authenticate with username & password → receive JWT token.

Welcome: Token is stored in localStorage → user info displayed.

Password Reset:

User requests OTP via email.

Enters OTP + new password → reset successful.

# Testing the App

Register a new user.

Login with credentials → should redirect to welcome page.

Logout → removes token.

Reset password using reset form with OTP → check if login works with new password.