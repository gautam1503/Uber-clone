# Uber Backend API

## User Registration

### POST `/users/register`

**Request:**

```json
{
  "email": "user@example.com",
  "password": "password123",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  }
}
```

**Field Requirements:**

- `email`: String, required, valid email format, min 5 characters, unique
- `password`: String, required, min 6 characters
- `fullname.firstname`: String, required, min 3 characters
- `fullname.lastname`: String, required, min 3 characters

**Response (201):**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "64f8a1b2c3d4e5f6a7b8c9d0",
    "email": "user@example.com",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    }
  }
}
```

**Error (400):**

```json
{
  "errors": [
    {
      "msg": "Invalid email",
      "path": "email"
    }
  ]
}
```

**Error (409):**

```json
{
  "message": "User already exists"
}
```
