# Student Task Manager - Server API

Production-ready backend API for the Student Task Manager application built with Node.js, Express.js, and MongoDB.

## 🚀 Quick Start

### Prerequisites
- Node.js v14+
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Install dependencies:**
```bash
npm install
```

2. **Create .env file:**
```bash
cp .env.example .env
```

3. **Configure environment variables:**
```env
MONGODB_URI=mongodb://localhost:27017/student-task-manager
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
PORT=5000
NODE_ENV=development
```

4. **Start the server:**
```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

Server will be running on `http://localhost:5000`

## 📁 Project Structure

```
server/
├── config/              # Configuration files
├── controllers/         # Request handlers (business logic)
├── middleware/          # Custom middleware (auth, error handling)
├── models/             # MongoDB schemas
├── routes/             # API route definitions
├── utils/              # Utility functions
├── server.js           # Main application file
└── package.json
```

## 🔗 API Endpoints

### Base URL
```
http://localhost:5000/api
```

### Authentication

#### Register New User
```
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "confirmPassword": "securePassword123"
}

Response: {
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### Login
```
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}

Response: {
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### Tasks

**All task endpoints require JWT authentication. Include token in Authorization header:**
```
Authorization: Bearer YOUR_JWT_TOKEN
```

#### Get All Tasks
```
GET /tasks?priority=all&category=all&status=all&sort=newest

Query Parameters:
- priority: 'all' | 'High' | 'Medium' | 'Low' (default: 'all')
- category: 'all' | 'Assignment' | 'Exam' | 'Project' | 'Personal' (default: 'all')
- status: 'all' | 'pending' | 'completed' (default: 'all')
- sort: 'newest' | 'dueDate' | 'priority' (default: 'newest')

Response: {
  "success": true,
  "tasks": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "title": "Complete Assignment",
      "description": "Math assignment due soon",
      "dueDate": "2024-12-31T00:00:00.000Z",
      "priority": "High",
      "category": "Assignment",
      "completed": false,
      "userId": "507f1f77bcf86cd799439011",
      "createdAt": "2024-12-20T10:30:00.000Z"
    }
  ]
}
```

#### Get Single Task
```
GET /tasks/:id

Response: {
  "success": true,
  "task": { ...task object... }
}
```

#### Create Task
```
POST /tasks
Content-Type: application/json

{
  "title": "Complete Assignment",
  "description": "Math assignment - Chapters 5-7",
  "dueDate": "2024-12-31",
  "priority": "High",
  "category": "Assignment"
}

Response: {
  "success": true,
  "message": "Task created successfully",
  "task": { ...created task... }
}
```

#### Update Task
```
PATCH /tasks/:id
Content-Type: application/json

{
  "title": "Updated Title",
  "completed": true,
  "priority": "Medium"
}

Response: {
  "success": true,
  "message": "Task updated successfully",
  "task": { ...updated task... }
}
```

#### Delete Task
```
DELETE /tasks/:id

Response: {
  "success": true,
  "message": "Task deleted successfully"
}
```

#### Toggle Task Completion
```
PATCH /tasks/:id/toggle

Response: {
  "success": true,
  "message": "Task status updated",
  "task": { ...task with updated completed status... }
}
```

## 📊 Database Schema

### User Model
```javascript
{
  _id: ObjectId,
  name: String (required, trimmed),
  email: String (required, unique, lowercase, validated),
  password: String (required, min 6 chars, hashed),
  createdAt: Date (default: now)
}
```

### Task Model
```javascript
{
  _id: ObjectId,
  title: String (required, trimmed),
  description: String (optional, trimmed),
  dueDate: Date (optional),
  priority: String (enum: 'High', 'Medium', 'Low', default: 'Medium'),
  category: String (enum: 'Assignment', 'Exam', 'Project', 'Personal', default: 'Personal'),
  completed: Boolean (default: false),
  userId: ObjectId (reference to User, required),
  createdAt: Date (default: now)
}
```

## 🔐 Security Features

### Authentication
- JWT-based authentication
- Tokens expire after 7 days
- Secure token verification
- Protected API endpoints

### Password Security
- Bcrypt hashing with 10 salt rounds
- Minimum 6 character requirement
- Never stored in plaintext
- Validated before storage

### Input Validation
- Required field validation
- Email format validation
- Data type checking
- Sanitized inputs

### CORS
- Configurable origin
- Handles production and development environments
- Credentials support

## 📝 Error Handling

The API returns standardized error responses:

```javascript
{
  "success": false,
  "message": "Error description here"
}
```

Common HTTP Status Codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `409` - Conflict (e.g., email already exists)
- `500` - Server Error

## 🔄 Middleware

### Authentication Middleware
- Verifies JWT tokens
- Extracts user ID from token
- Protects private routes
- Returns 401 for invalid/missing tokens

### Error Handling Middleware
- Catches unhandled errors
- Formats error responses
- Logs errors
- Prevents server crashes

## 🧪 Testing with Postman/cURL

### Register a User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "confirmPassword": "password123"
  }'
```

### Create a Task
```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "title": "Study for exam",
    "description": "Math exam on Friday",
    "dueDate": "2024-12-31",
    "priority": "High",
    "category": "Exam"
  }'
```

## 🌐 Deployment

### Environment Variables for Production
```env
NODE_ENV=production
MONGODB_URI=<your_production_mongodb_uri>
JWT_SECRET=<strong_random_secret>
PORT=<port_number>
```

### Deployment Platforms

#### Render
1. Connect GitHub repository
2. Set environment variables
3. Deploy

#### Railway
1. Create project
2. Connect repository
3. Configure environment variables
4. Deploy

#### Heroku (if still available)
```bash
heroku create your-app-name
heroku config:set MONGODB_URI=<uri>
git push heroku main
```

## 📦 Dependencies

### Production Dependencies
- **express** ^4.18.2 - Web framework
- **mongoose** ^7.5.0 - MongoDB ODM
- **dotenv** ^16.3.1 - Environment variables
- **cors** ^2.8.5 - Cross-origin middleware
- **bcryptjs** ^2.4.3 - Password hashing
- **jsonwebtoken** ^9.0.2 - JWT authentication
- **express-validator** ^7.0.0 - Input validation

### Development Dependencies
- **nodemon** ^3.0.1 - Auto-reload on file changes

## 🔧 Configuration

### CORS Configuration
Update CORS origins in `server.js`:
```javascript
cors({
  origin: process.env.NODE_ENV === 'production' 
    ? 'https://yourdomain.com' 
    : 'http://localhost:5173',
  credentials: true
})
```

### MongoDB Connection
Ensure your `MONGODB_URI` is correctly formatted:
- Local: `mongodb://localhost:27017/student-task-manager`
- Atlas: `mongodb+srv://username:password@cluster.mongodb.net/database`

## 🐛 Troubleshooting

### MongoDB Connection Failed
- Check MongoDB is running
- Verify connection string
- Check network firewall
- Ensure database exists

### JWT Invalid Token Error
- Verify token format in Authorization header
- Check JWT secret matches
- Ensure token hasn't expired

### CORS Errors
- Check frontend origin is whitelisted
- Verify correct protocol (http/https)
- Check port numbers

### Port Already in Use
- Change PORT in .env
- Kill process using port: `lsof -ti:5000 | xargs kill -9` (macOS/Linux)

## 📚 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [JWT.io](https://jwt.io/)

## 🎯 API Health Check

```
GET /api/health

Response:
{
  "status": "Server is running"
}
```

## 📄 License

MIT License - Feel free to use this in your projects

## 🤝 Support

For issues and questions, create an issue in the repository.

---

**Built with Node.js and Express.js**
