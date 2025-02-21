# NoSQL  
# Blogging Platform Backend  

Final assignment for Advanced Databases (NoSQL). Teamwork by Togzhan Oral and Yelnura Akhmetova.  

## Overview  
This is the backend service for a blogging platform, built using Node.js and Express. It provides APIs for user authentication and blog management, utilizing MongoDB as the database.  

## Features  
- User authentication (JWT-based)  
- Blog management (Create, Read, Update, Delete blogs)  
- Input validation  
- Secure password hashing  
- Cross-Origin Resource Sharing (CORS) enabled  

## Technologies Used  
- Node.js (Express.js framework)  
- MongoDB (via Mongoose ODM)  
- JWT for authentication  
- bcryptjs for password hashing  
- Express Validator for input validation  
- dotenv for environment variable management  


## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/togzhan23/nosql-.git
   ```

2. Navigate to the project directory:
   ```sh
   cd blogging-platform-backend
   ```

3. Install dependencies:
   ```sh
   npm install
   ```

4. Create a `.env` file and configure it:
   ```sh
   MONGO_URI=mongodb://127.0.0.1:27017/todo
   JWT_SECRET=your_secret_key
   ```

5. Start the server:
   ```sh
   npm start
   


## API Endpoints
### Authentication
- POST /api/auth/register - Register a new user
- POST /api/auth/login - User login (returns JWT token)

### Tasks
- GET /api/blogs - Fetch all blogs (Authenticated users only)
- POST /api/tasks - Create a new blog
- PUT /api/tasks/:id - Update a blog
- DELETE /api/tasks/:id - Delete a blog 

## License
This project is licensed under the ISC License.

