The Smart Public Complaint System is a web-based application designed to help citizens report and track public issues such as water problems, drainage, garbage, potholes, and streetlights. The main problem is that traditional complaint systems are often slow, difficult to track, and lack proper communication between citizens and authorities. The system requires a user-friendly interface, complaint registration, issue details, image/document upload, complaint tracking, status updates, and an admin panel. The proposed solution provides a centralized platform where citizens can submit complaints and monitor their progress. Administrators can view, manage, update, and resolve complaints efficiently. The system was developed using React.js for the frontend, Node.js and Express.js for the backend, and MongoDB for database management. REST APIs connect the frontend and backend. It improves transparency, reduces manual work, and enables faster complaint management.


## Tech Stack

### Frontend
- **React** 18.2
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Axios** for API calls

### Backend
- **Node.js** with **Express.js**
- **MongoDB** with **Mongoose** for database
- **JWT** for authentication
- **Bcrypt** for password hashing
- **CORS** for cross-origin requests

## Project Structure

```
JanSewa-Citizen-Issue-Reporting-Platform/
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── ReportIssue.jsx
│   │   │   ├── MyComplaints.jsx
│   │   │   ├── ComplaintDetail.jsx
│   │   │   └── AdminDashboard.jsx
│   │   ├── components/
│   │   │   └── Navbar.jsx
│   │   ├── utils/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── index.js
│   │   └── index.css
│   ├── public/
│   │   └── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── .env.example
│
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   └── Complaint.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── complaintController.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── complaintRoutes.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── adminAuth.js
│   ├── server.js
│   ├── package.json
│   ├── .env.example
│   └── .gitignore
│
├── README.md
└── .gitignore
```

## Features

### Citizen Features
- **User Registration & Login**: Simple authentication using JWT
- **Report Issues**: Submit complaints with title, description, category, location, and optional image
- **View Complaints**: Track all their submitted complaints
- **Status Tracking**: See real-time status updates (Pending, In Progress, Resolved)
- **Admin Notes**: View admin feedback and notes on their complaints

### Admin Features
- **Dashboard**: View all complaints submitted by citizens
- **Statistics**: See count of Pending, In Progress, and Resolved complaints
- **Status Management**: Update complaint status
- **Add Notes**: Add admin notes/feedback to complaints
- **Complaint Details**: View full complaint information including images

### Issue Categories
- Road Damage
- Garbage Collection
- Water Leakage
- Street Light Problem
- Other

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (running locally or cloud connection string)
- npm or yarn

### Backend Setup

1. Navigate to backend folder:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file (copy from `.env.example`):
```
MONGODB_URI=mongodb://localhost:27017/jansewa
PORT=5000
JWT_SECRET=your_secret_key_here
```

4. Start MongoDB (if running locally):
```bash
mongod
```

5. Run the backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Open a new terminal and navigate to frontend folder:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file (copy from `.env.example`):
```
REACT_APP_API_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## Demo / Default Credentials

### Admin Account
- **Email**: admin@example.com
- **Password**: password
- **Role**: Admin

### Citizen Account
- **Email**: citizen@example.com
- **Password**: password
- **Role**: Citizen

**Note**: You can register new accounts from the registration page.

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (requires token)

### Complaints
- `POST /api/complaints` - Create new complaint (requires auth)
- `GET /api/complaints/user/my-complaints` - Get user's complaints (requires auth)
- `GET /api/complaints/:id` - Get complaint details (requires auth)
- `GET /api/complaints` - Get all complaints (requires admin auth)
- `PUT /api/complaints/:id` - Update complaint status (requires admin auth)
- `DELETE /api/complaints/:id` - Delete complaint (requires auth)

## Workflow

1. **User Registration**: Citizen or Admin registers with email and password
2. **Login**: User logs in with their credentials and receives JWT token
3. **Report Issue**: Citizen can report issues with details and optional image
4. **Admin Reviews**: Admin sees all complaints in dashboard
5. **Status Update**: Admin updates complaint status and adds notes
6. **Citizen Tracking**: Citizen can view their complaints and see status updates

## File Descriptions

### Frontend Files
- **Home.jsx**: Landing page with project info and CTA
- **Login.jsx**: User login page
- **Register.jsx**: User registration page
- **ReportIssue.jsx**: Form to submit new complaints
- **MyComplaints.jsx**: List of user's complaints
- **ComplaintDetail.jsx**: Detailed view of a single complaint
- **AdminDashboard.jsx**: Admin dashboard for managing complaints
- **Navbar.jsx**: Navigation header component
- **api.js**: Axios configuration and API endpoints

### Backend Files
- **User.js**: User model with schema
- **Complaint.js**: Complaint model with schema
- **authController.js**: Authentication logic (register, login)
- **complaintController.js**: Complaint operations logic
- **authRoutes.js**: Authentication API routes
- **complaintRoutes.js**: Complaint API routes
- **auth.js**: JWT authentication middleware
- **adminAuth.js**: Admin authentication middleware
- **server.js**: Express server configuration

## Usage Tips

1. **Image Upload**: Image upload works with base64 encoding. For production, use cloud storage like AWS S3 or Cloudinary
2. **Password Hashing**: Passwords are hashed using bcryptjs before storage
3. **JWT Tokens**: Tokens are stored in localStorage and sent with each request
4. **CORS**: Configured to allow requests from localhost:3000

## Future Enhancements

- Location mapping (Google Maps integration)
- Email notifications for status updates
- Image upload to cloud storage
- Advanced filtering and search
- Complaint analytics and reports
- Rating system for resolved complaints
- File uploads for complaints
- Mobile-responsive improvements

## Common Issues & Solutions

### MongoDB Connection Error
- Ensure MongoDB is running: `mongod`
- Check MONGODB_URI in .env file
- Verify local MongoDB port (default: 27017)

### CORS Errors
- Ensure both frontend and backend are running
- Check API_URL in frontend api.js (should be http://localhost:5000/api)

### Token Issues
- Clear localStorage and re-login
- Check JWT_SECRET matches between requests

## Learning Outcomes

This project demonstrates:
- MERN stack fundamentals
- JWT authentication
- RESTful API design
- Password hashing and security
- React routing and state management
- Form handling and validation
- Database schema design with Mongoose
- Admin role-based access control
- Tailwind CSS for responsive design

## License

This is a college prototype project. Feel free to use it for learning purposes.

## Support

For issues or questions, refer to the code comments or documentation in individual files.

---

**Happy Learning! Build Amazing Projects! 🚀**

## Problem Statement

Citizens often face civic problems such as:

- Garbage not collected
- Potholes on roads
- Broken street lights
- Water leakage
- Drainage issues

In many cases, people do not know where to report these issues or their complaints remain unheard. There is a need for a simple digital platform that allows citizens to easily report such problems and track their resolution.

---

## Proposed Solution

JanSewa provides a web-based system where:

- Citizens can register and log in
- Users can submit complaints with details
- Complaints are stored in a database
- Administrators can review complaints
- Admin can update complaint status
- Citizens can track progress of their complaints

This ensures transparency and better issue management.

---

## Tech Stack

**Frontend**
- React
- Tailwind CSS

**Backend**
- Node.js
- Express.js

**Database**
- MongoDB with Mongoose

---

## System Roles

### Citizen

A citizen can:

- Register an account
- Login to the platform
- Submit a complaint
- View complaints submitted by them
- Track complaint status

Complaint fields include:

- Title
- Description
- Category
- Location
- Image (optional)
- Status

---

### Admin

Admin can:

- Login to admin dashboard
- View all complaints
- Update complaint status
- Monitor issue resolution progress

Complaint statuses include:

- Pending
- In Progress
- Resolved

---

## Complaint Workflow

1. Citizen registers and logs in.
2. Citizen submits a complaint describing the issue.
3. Complaint is stored in the database.
4. Admin views complaints from the dashboard.
5. Admin updates the complaint status.
6. Citizen can check updated complaint status.

---

## Features

- User registration and login
- Submit issue with details
- View submitted complaints
- Admin dashboard to manage complaints
- Status tracking for complaints
- Clean UI using Tailwind CSS

---


