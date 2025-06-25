## Overview
This repository contains the backend for a blog application that implements Role-Based Access Control (RBAC). It is designed to manage user roles and permissions in a secure and efficient manner. The backend is built using Node.js and Express, with MongoDB for data storage and JWT for authentication.

## Tech Stack
- **Node.js**: A runtime for executing JavaScript on the server-side.
- **Express**: A minimal and flexible Node.js web application framework for building APIs.
- **MongoDB**: A NoSQL database for storing application data.
- **Mongoose**: An Object Data Modeling (ODM) library for MongoDB and Node.js.
- **JWT Authentication**: A method for securely transmitting information between parties as a JSON object.
- **Firebase Google Sign-In**: Integration to simplify user authentication through Google accounts.
- **Role-Based Access Control (RBAC)**: A method for regulating access to resources based on user roles.

## Environment Variables
To ensure the application runs smoothly, set the following environment variables in a `.env` file at the root of the backend project:

```env
PORT=5000                   # The port on which the server listens
MONGO_URI=your-mongodb-uri  # MongoDB connection string
JWT_SECRET=your_jwt_secret  # Secret key for signing JWT tokens
```

# To run this 

##in blog-rbac-backend
npm run dev

##in blog-rbac-frontend
npm start
