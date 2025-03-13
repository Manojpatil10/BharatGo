# Full-Stack Project

## Project Overview
This project is a full-stack web application built using React.js for the frontend and Node.js with Express for the backend. It provides e-commerce functionality where users can browse products, add them to the cart, and place orders. However, users must first log in before using these features. For authentication, JWT tokens are stored in `localStorage` to verify if a user is logged in or not.

Other key features include:
- User authentication with JWT-based login and registration.
- Secure storage of authentication tokens using `localStorage`.
- Product listing with the ability to add items to the cart.
- Order management functionality for users.
- Backend APIs for handling user authentication, product management, and order processing.
- MongoDB as the database for storing user details, products, and orders.

## Technologies Used
- Frontend: React.js, React Router, Axios
- Backend: Node.js, Express.js, MongoDB
- Database: MongoDB (Local & Atlas)
- Authentication: JWT-based authentication with token management in `localStorage`

## Installation and Setup

### Prerequisites
Ensure you have the following installed:
- Node.js (vXX.X.X or later)
- npm or yarn
- MongoDB (if applicable)

### Clone the Repository
git clone [repository-url]
cd [project-folder]

### Install Dependencies
Since `node_modules` are not included in the repository, install them manually before running the project.

#### Backend Setup
cd backend
npm install

Create a `.env` file inside the `backend` directory and add the following environment variables:
<br>
PORT=8080
<br>
MONGODB_URL="mongodb://127.0.0.1:27017/bharatgo"
<br>
ATLAS_URL="mongodb+srv://mrpnashik:12345@cluster0.xgjf1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
<br>
SECRET_KEY="ManojPatil10"

Start the backend server:
npm start

The backend will run on `http://localhost:8080`.

#### Frontend Setup
cd frontend
npm install
npm start

The frontend will run on `http://localhost:3000`.

## API Endpoints
[List the key API endpoints if applicable]
- `POST /api/login` - User login
- `POST /api/signup` - User registration
- `GET /api/cart](https://api.escuelajs.co/api/v1/products` - Fetch all products
- `POST /api/cart` - Add a product to the cart (requires authentication)
- `POST /api/checkout` - Place an order (requires authentication)

## Deployment
For deployment:
1. Use Netlify for frontend deployment.
2. Use Render for backend deployment.
3. Ensure environment variables are properly set in the deployment platforms.

## Additional Notes
- Ensure MongoDB is running locally or provide a cloud database connection.
- Always install dependencies using `npm install` before running the project.
- Update `.env` file before starting the project.
- JWT token is used for authentication and stored in `localStorage` for managing user sessions.
- Proper validation and error handling are implemented in both frontend and backend.

---
Feel free to modify the instructions based on your project specifics!

