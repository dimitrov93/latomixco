# Express User API

This is a simple Express API for user registration using TypeScript, Mongoose, and express-validator.

## Registering a User

### Request

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
