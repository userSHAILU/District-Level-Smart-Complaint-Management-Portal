# File Structure & Description

## Frontend Files

### `/frontend/public/index.html`
- Main HTML entry point for React
- Contains the `<div id="root">` where React mounts the app

### `/frontend/src/index.js`
- React app entry point
- Renders App component into root element

### `/frontend/src/index.css`
- Global styles with Tailwind directives
- Base styles and utilities

### `/frontend/src/App.jsx`
- Main App component
- Sets up React Router with all routes
- Manages authentication state (user, token)
- Handles login state persistence

### `/frontend/src/components/Navbar.jsx`
- Navigation bar component
- Displays different links based on user role (citizen/admin)
- Shows user info and logout button
- Responsive navigation

### `/frontend/src/pages/Home.jsx`
- Landing page component
- Shows project overview with hero section
- Displays "How It Works" steps
- Lists issue categories
- Features section
- CTA buttons for registration

### `/frontend/src/pages/Login.jsx`
- Login form page
- Email and password input fields
- Form validation
- API call to backend authentication
- Stores JWT token and user data in localStorage
- Shows demo credentials info

### `/frontend/src/pages/Register.jsx`
- Registration form page
- Username, email, password, role selection
- Password confirmation validation
- API call to backend for registration
- Auto-login after successful registration
- Role selection (citizen/admin)

### `/frontend/src/pages/ReportIssue.jsx`
- Complaint submission form
- Form fields: title, description, category, location, image
- File upload with base64 encoding
- Category dropdown with predefined options
- Form validation before submission
- Redirects to My Complaints after submission

### `/frontend/src/pages/MyComplaints.jsx`
- Displays user's submitted complaints
- Shows complaint cards with status badges
- Color-coded status (Pending/In Progress/Resolved)
- Displays admin notes if available
- Link to view full complaint details
- Empty state when no complaints

### `/frontend/src/pages/ComplaintDetail.jsx`
- Detailed view of a single complaint
- Shows full description and image
- Displays category, location, submitted date
- Shows admin notes and who resolved it
- Back button to return to complaints list
- Read-only view for citizens

### `/frontend/src/pages/AdminDashboard.jsx`
- Admin-only page for managing complaints
- Statistics section (Total, Pending, In Progress, Resolved)
- Complaint list (scrollable with selection)
- Update form for selected complaint
- Status dropdown (Pending, In Progress, Resolved)
- Admin notes textarea
- Update button to save changes

### `/frontend/src/utils/api.js`
- Axios configuration and setup
- API base URL configuration
- Request interceptor for adding JWT token to headers
- API endpoint functions:
  - `authAPI.register()`
  - `authAPI.login()`
  - `authAPI.getProfile()`
  - `complaintAPI.createComplaint()`
  - `complaintAPI.getAllComplaints()`
  - `complaintAPI.getUserComplaints()`
  - `complaintAPI.getComplaint()`
  - `complaintAPI.updateComplaintStatus()`
  - `complaintAPI.deleteComplaint()`

### `/frontend/tailwind.config.js`
- Tailwind CSS configuration
- Content paths for scanning
- Custom color definitions (primary, secondary, success, warning, danger)
- Theme extensions

### `/frontend/postcss.config.js`
- PostCSS configuration
- Includes Tailwind CSS and Autoprefixer plugins

---

## Backend Files

### `/backend/server.js`
- Express server entry point
- Middleware setup (CORS, JSON parser)
- MongoDB connection setup
- Route mounting:
  - `/api/auth` - authentication routes
  - `/api/complaints` - complaint routes
- Server listener on PORT (default 5000)

### `/backend/models/User.js`
- Mongoose User schema
- Fields: username, email, password, role
- Pre-save hook for password hashing (bcryptjs)
- `matchPassword()` method to compare passwords
- Timestamps for creation/update tracking

### `/backend/models/Complaint.js`
- Mongoose Complaint schema
- Fields: title, description, category, location, image, status, createdBy, resolvedBy, adminNotes
- Status enum: Pending, In Progress, Resolved
- Category enum: Road Damage, Garbage Collection, Water Leakage, Street Light Problem, Other
- References to User model for createdBy and resolvedBy
- Timestamps for tracking

### `/backend/controllers/authController.js`
- `register()` - User registration logic
  - Validates if user already exists
  - Hashes password
  - Generates JWT token
  - Returns user data and token
- `login()` - User login logic
  - Finds user by email
  - Compares password
  - Generates JWT token
  - Returns user data and token
- `getProfile()` - Get current user profile (protected route)

### `/backend/controllers/complaintController.js`
- `createComplaint()` - Creates new complaint
- `getAllComplaints()` - Fetches all complaints (admin only)
- `getUserComplaints()` - Fetches user's complaints
- `getComplaint()` - Gets single complaint by ID
- `updateComplaintStatus()` - Updates complaint status and notes (admin only)
- `deleteComplaint()` - Deletes complaint

### `/backend/routes/authRoutes.js`
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user
- `GET /auth/profile` - Get user profile (with auth middleware)

### `/backend/routes/complaintRoutes.js`
- `POST /complaints` - Create complaint (authenticated)
- `GET /complaints/user/my-complaints` - Get user's complaints (authenticated)
- `GET /complaints/:id` - Get complaint detail (authenticated)
- `GET /complaints` - Get all complaints (admin only)
- `PUT /complaints/:id` - Update complaint (admin only)
- `DELETE /complaints/:id` - Delete complaint (authenticated)

### `/backend/middleware/auth.js`
- JWT authentication middleware
- Extracts token from Authorization header
- Verifies token using JWT_SECRET
- Adds user data to request object
- Returns 401 if token is invalid/missing

### `/backend/middleware/adminAuth.js`
- Admin-only authentication middleware
- Uses JWT authentication
- Checks if user role is "admin"
- Returns 403 if user is not admin
- Returns 401 if token is invalid

### `/backend/.env.example`
- Template for environment variables
- MONGODB_URI - Database connection string
- PORT - Server port
- JWT_SECRET - Secret for JWT token signing

---

## Configuration Files

### `/tailwind.config.js` (Frontend)
- Tailwind CSS customization
- Defines custom colors

### `/postcss.config.js` (Frontend)
- PostCSS configuration for Tailwind

### `/package.json` (Both)
- Dependencies list
- Scripts for running projects
- Project metadata

---

## Root Files

### `/README.md`
- Comprehensive project documentation
- Setup instructions
- API endpoints
- Features overview
- Troubleshooting

### `/QUICK_START.md`
- Quick start guide for beginners
- Step-by-step setup
- Common commands
- Testing workflow

### `/SEED_DATA.md`
- Sample data for database
- Demo user creation
- Sample complaints

### `/.gitignore`
- Git ignore patterns
- Excludes node_modules, .env files, build artifacts

---

## Database Collections

### `users`
```javascript
{
  _id: ObjectId,
  username: String,
  email: String,
  password: String (hashed),
  role: String (citizen/admin),
  createdAt: Date,
  updatedAt: Date
}
```

### `complaints`
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  category: String,
  location: String,
  image: String (base64 or URL),
  status: String (Pending/In Progress/Resolved),
  createdBy: ObjectId (User reference),
  resolvedBy: ObjectId (User reference),
  adminNotes: String,
  createdAt: Date,
  updatedAt: Date
}
```

---

## API Request/Response Flow

### Example: Create Complaint
```
Frontend (ReportIssue.jsx)
  ↓ (form submission)
Frontend (api.js - complaintAPI.createComplaint())
  ↓ (POST /api/complaints)
Backend (Route - complaintRoutes.js)
  ↓ (auth middleware checks JWT)
Backend (Controller - complaintController.createComplaint())
  ↓ (create Complaint document)
MongoDB (complaints collection)
  ↓ (return created complaint)
Backend (response with populated user info)
  ↓ (response to frontend)
Frontend (redirect to MyComplaints)
```

---

This structure provides a clean separation of concerns and follows MERN stack best practices!
