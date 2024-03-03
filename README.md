# Express User API

This is a simple Express API for user management, including signup, login, logout, and profile retrieval and update functionalities.

## Features

- **User Authentication:** Register, log in, and log out securely with JWT.
- **User Management:** CRUD operations for users.
- **Password Change:** Allow currently logged in user to change their password only.
- **Express Rate Limiting:** Prevent abuse with IP-based rate limiting.
- **Custom Error Handling:** Consistent error responses for better debugging.

## :warning: Prerequisites
- [Node.js](https://nodejs.org/en/)
- [ExpressJs](https://expressjs.com/en/starter/installing.html)
- [MongoDB](https://www.mongodb.com/try/download/community)

## Configuration

### Environment Variables

Create a `.env` file in the root of your project with the following variables:

- PORT
- MONGO_URL 
- SALT_ROUNDS 
- JWT_KEY 
- SECTER_KEY_ONE 
- SECTER_KEY_TWO 

## Installation

npm install
npm start

## Usage

### JWT Authentication

- This API uses JSON Web Tokens (JWT) for user authentication. The tokens are generated during login and are required for accessing protected routes.

### Rate Limiting

- To prevent abuse, the API employs express rate limiting. Requests exceeding the defined rate limit will receive a 429 Too Many Requests response.

### Error handling

- Custom error handling provides consistent and informative error responses. Errors are categorized and include detailed messages for easier debugging.


## :information_source: API ROUTES

#### Users 
- GET /api/user - currently logged in user
- GET /api/user/all - all users currently registered
- PUT /api/user/:userId: Update user data. Password is forbidden to be updated here.
- PUT /api/user/:userId/password: Change user password for currently logged in user only.

### Authentication
- POST /api/auth/register: Register a new user.
- POST /api/auth/login: Log in an existing user.
- POST /api/auth/logout: Log out the current user.


## Auth Requests

### User registration

POST /register - send a JSON payload with user's information where username is not required

{
  "username": "your_username", 
  "email": "your_email@example.com",
  "password": "your_password"
}

Validation

{
    "errors": [
        {
            "message": "Email must be valid",
            "field": "email"
        },
        {
            "message": "Password is required!",
            "field": "password"
        }
    ]
}

### User login

POST /login - send a JSON payload with user's email and password

{
  "email": "your_email@example.com",
  "password": "your_password"
}

Validation

{
    "errors": [
        {
            "message": "A valid email required",
            "field": "email"
        },
        {
            "message": "Password is required!",
            "field": "password"
        }
    ]
}

### User logout

POST /logout - no JSON payload required

## User Requests

GET /user/all - No JSON Payload required.Returns all currently logged in users

GET /api/user - No JSON Payload required.Returns currently logged in user

{
    "currentUser": {
        "id": "user_id",
        "email": "user_email",
    }
}


PUT /user/:userId/password - send a JSON payload with user's old and new password. ONLY FOR CURRENTLY LOGGED IN USER

{
    "currentPassword": "old_password",
    "newPassword": "new_password"
}

Validation if currently logged in user tries to change another user's password

{
    "errors": [
        {
            "message": "Not authorized to change this password!"
        }
    ]
}

Validation if the old password is incorrect

{
    "errors": [
        {
            "message": "Password is incorrect!"
        }
    ]
}



PUT /user/:userId/edit - send a JSON payload with user's new username or email

{
    "username": "new_username",
    "email": "new_email"
}

Validation

{
    "errors": [
        {
            "message": "Password update not authorized!"
        }
    ]
}