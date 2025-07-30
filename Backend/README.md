# Uber Backend API

## User Registration

### POST `/users/register`

**HTTP Method:** POST

**Description:**
Register a new user account. Creates a new user with email, password, and full name. Password is automatically hashed and a JWT authentication token is returned upon successful registration.

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

## User Login

### POST `/users/login`

**HTTP Method:** POST

**Description:**
Authenticate a user and return a JWT token upon successful login. Validates email and password, then returns the authentication token along with user information.

**Request:**

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Field Requirements:**

- `email`: String, required, valid email format
- `password`: String, required, min 6 characters

**Response (200):**

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
    },
    {
      "msg": "Password must be at least 6 characters",
      "path": "password"
    }
  ]
}
```

**Error (401):**

```json
{
  "message": "Invalid email or password"
}
```

## 📝 Notes

### 1. Why We Use `select: false` in Mongoose Models - Simple Explanation

Think of `select: false` as a **security blanket** for sensitive data like passwords.

🔒 **What happens in your Mongoose schema:**

```javascript
const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true, select: false }, // 👈 This hides password
});
```

💡 **What `select: false` does (in simple terms):**

- ❌ **By default**: Don't include password in any query results
- ✅ **Only when needed**: Manually ask for password when you really need it

🔍 **Real Example - Without `select: false`:**

```javascript
// DANGEROUS! Password is always included
const user = await User.findOne({ email: "user@example.com" });
console.log(user.password); // ✅ Shows password (BAD for security!)
```

🔐 **With `select: false` (SAFE):**

```javascript
// SAFE! Password is hidden by default
const user = await User.findOne({ email: "user@example.com" });
console.log(user.password); // ❌ password is undefined (GOOD!)
```

✅ **Why is this important?**

- **Security**: Prevents accidental password leaks
- **API Safety**: Won't accidentally send passwords in responses
- **Data Protection**: Keeps sensitive data hidden unless explicitly needed

### 2. Why Do We Use `.select('+password')` During Login?

Great question! Let's break this down step by step.

🧠 **The Problem:**
When you have `select: false` on password, this happens:

```javascript
// ❌ This won't work for login!
const user = await User.findOne({ email: "user@example.com" });
// user.password is undefined because of select: false
```

🔧 **The Solution:**
We need to tell Mongoose: _"Hey, I know password is usually hidden, but I need it this time for login"_

```javascript
// ✅ This works for login!
const user = await User.findOne({ email: "user@example.com" }).select(
  "+password"
);
// user.password now exists because we explicitly asked for it
```

### 3. Your Login Code Explained

Looking at your actual code:

```javascript
// In your service
module.exports.findUserByEmail = async (email) => {
  return await userModel.findOne({ email }).select("+password"); // ✅ NEEDED!
};

// In your controller
module.exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await userService.findUserByEmail(email); // Gets user WITH password
  const isMatch = await user.comparePassword(password); // ✅ This works because password exists
};
```

❓ **Why do you need `.select('+password')` even though you're calling `user.comparePassword(password)`?**

Because inside your `comparePassword` method, it does something like:

```javascript
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password); // 👈 Needs this.password to exist!
};
```

If you don't use `.select('+password')`, then `this.password` is `undefined`, and the comparison fails!

### 4. Complete Login Flow with `select: false`

✅ **Step-by-step what happens:**

1. **User submits login:**

```javascript
POST /login
Body: { email: "user@example.com", password: "mypassword123" }
```

2. **Server fetches user WITH password:**

```javascript
const user = await User.findOne({ email: "user@example.com" }).select(
  "+password"
);
// user.password now exists (because of +password)
```

3. **Compare passwords:**

```javascript
const isMatch = await user.comparePassword("mypassword123");
// This works because user.password exists from step 2
```

4. **If match, login successful!**

### 5. Summary - Why This Approach is Smart

🔐 **Security Benefits:**

- Passwords are hidden by default (no accidental leaks)
- Only included when actually needed (login)
- Prevents sensitive data exposure in API responses

⚡ **Practical Benefits:**

- Clean API responses (no passwords in user lists)
- Automatic protection against data leaks
- Explicit control over when sensitive data is accessed

💡 **Remember:**

- `select: false` = hide password by default
- `.select('+password')` = include password only when needed
- This gives you **security + flexibility**
