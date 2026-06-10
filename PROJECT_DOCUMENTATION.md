# District_Level_Smart_Complaint_System
## Complete Project Documentation

---

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Project Structure](#project-structure)
5. [Installation & Setup](#installation--setup)
6. [Database Schema](#database-schema)
7. [API Documentation](#api-documentation)
8. [Frontend Pages & Components](#frontend-pages--components)
9. [User Roles & Permissions](#user-roles--permissions)
10. [How to Use](#how-to-use)
11. [Troubleshooting](#troubleshooting)

---

## 🎯 Project Overview

**JanSewa** is a MERN (MongoDB, Express, React, Node.js) stack web application that empowers citizens to report civic issues in their communities and track their resolution in real-time.

### Core Purpose:
- Citizens report civic issues (roads, water, garbage, etc.)
- Admins review and manage complaints
- Community members interact through comments, likes, and evidence uploads
- Transparent tracking of issue resolution

### Key Highlights:
- ✅ Location-based issue discovery
- ✅ Real-time community interaction
- ✅ Admin dashboard for issue management
- ✅ Role-based access control (Citizen vs Admin)
- ✅ Resolution proof and documentation
- ✅ Community support system (likes & comments)

---

## ✨ Features

### 1. **User Authentication & Registration**
- Register as Citizen (only Citizen role for new users)
- Secure login with JWT tokens
- Token stored in localStorage
- Session management
- Logout functionality

### 2. **Citizen Features**

#### Report Issue
- Title and description
- Category selection (Road Damage, Garbage Collection, Water Leakage, Street Light)
- Location input
- Image upload
- Auto-created as "Pending" status
- Visible only to citizens (not admins)

#### My Complaints
- View all complaints reported by the user
- Filter by status (Pending, In Progress, Resolved)
- See admin notes and updates
- View resolution details with proof images
- Track complaint progress

#### Nearby Issues
- Search issues by location
- Browse all complaints in a specific area
- **Community Interaction:**
  - 👍 Like complaints to show support
  - 💬 Add comments with observations
  - 📷 Upload additional evidence images
  - View community engagement metrics

#### Community Interaction Features
- **Likes System:** Support complaints that need attention
- **Comments:** Share observations and updates
- **Evidence Uploads:** Upload additional images showing the issue status
- **View Interactions:** See likes count, comments, and evidence from community
- **Persistence:** Interactions remain visible even after issue is resolved

### 3. **Admin Features**

#### Admin Dashboard
- 📊 Complaint statistics (Total, Pending, In Progress, Resolved)
- 🔍 Advanced search functionality
- 🎯 Filter by status
- 📋 Complete complaints list
- ⚙️ Update complaint status
- 📝 Add admin notes
- ✅ Mark as resolved with proof

#### Complaint Management
- **View Details:** See full complaint information
- **Update Status:** Change between Pending → In Progress → Resolved
- **Add Admin Notes:** Internal notes for other admins
- **Resolution Details:**
  - Upload resolution proof image
  - Add resolution message to citizens
  - Record resolution timestamp
  - Track which admin resolved it

#### Navigation
- Hidden "Report Issue" and "My Complaints" from admin view
- Direct access to Admin Dashboard after login
- Admin-only links in navigation bar

### 4. **Issue Resolution Workflow**

```
1. Citizen Reports Issue (Status: Pending)
   ↓
2. Admin Reviews (Status: In Progress)
   - Adds notes
   - Updates status
   ↓
3. Admin Resolves Issues (Status: Resolved)
   - Uploads proof image
   - Adds resolution message
   ↓
4. Citizens See Resolution
   - Can still comment and like
   - View proof image
   - Read admin's resolution details
```

---

## 🛠️ Tech Stack

### **Frontend**
- **Framework:** React.js 18
- **Routing:** React Router v6
- **Styling:** Tailwind CSS
- **HTTP Client:** Axios
- **Build Tool:** Webpack (via Create React App)
- **State Management:** React Hooks (useState, useContext)

### **Backend**
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Tokens)
- **ORM:** Mongoose
- **Development:** Nodemon

### **Database**
- **MongoDB:** NoSQL database
- **mongoose:** Schema validation and modeling

### **Deployment Ready:**
- Frontend can be built and deployed as static assets
- Backend API is RESTful and deployable on any Node.js server

---

## 📁 Project Structure

```
JanSewa-Citizen-Issue-Reporting-Platform/
│
├── backend/
│   ├── controllers/
│   │   ├── authController.js          # Auth logic (register, login)
│   │   ├── complaintController.js     # Complaint CRUD operations
│   │   └── communityController.js     # Community interaction (likes, comments, evidence)
│   │
│   ├── models/
│   │   ├── User.js                    # User schema
│   │   └── Complaint.js               # Complaint schema with likes, comments, images
│   │
│   ├── routes/
│   │   ├── authRoutes.js              # Auth endpoints
│   │   ├── complaintRoutes.js         # Complaint endpoints
│   │   └── communityRoutes.js         # Community interaction endpoints
│   │
│   ├── middleware/
│   │   ├── auth.js                    # JWT authentication middleware
│   │   └── adminAuth.js               # Admin authorization middleware
│   │
│   ├── server.js                      # Express app setup
│   └── package.json                   # Backend dependencies
│
├── frontend/
│   ├── public/
│   │   └── index.html                 # Entry HTML
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx             # Navigation bar (role-aware)
│   │   │   ├── ComplaintCard.jsx      # Complaint display with interactions
│   │   │   └── CommentsSection.jsx    # Comments & discussion
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.jsx               # Landing page (hides Report Issue for admins)
│   │   │   ├── Login.jsx              # User login
│   │   │   ├── Register.jsx           # User registration (Citizen only)
│   │   │   ├── ReportIssue.jsx        # Create new complaint
│   │   │   ├── MyComplaints.jsx       # View user's complaints
│   │   │   ├── NearbyIssues.jsx       # Location-based community issues
│   │   │   ├── ComplaintDetail.jsx    # Full complaint view
│   │   │   └── AdminDashboard.jsx     # Admin complaint management
│   │   │
│   │   ├── utils/
│   │   │   └── api.js                 # Axios API client with endpoints
│   │   │
│   │   ├── App.jsx                    # Main app component with routing
│   │   ├── index.js                   # React entry point
│   │   └── index.css                  # Global styles
│   │
│   └── package.json                   # Frontend dependencies
│
├── README.md                          # Project readme
├── QUICK_START.md                     # Quick start guide
└── PROJECT_DOCUMENTATION.md           # This file
```

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud)
- Git
- Code Editor (VS Code recommended)

### Step 1: Clone Repository
```bash
git clone <repository-url>
cd JanSewa-Citizen-Issue-Reporting-Platform
```

### Step 2: Backend Setup

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create .env file
# Add: MONGODB_URI=mongodb://localhost:27017/jansewa
# Add: JWT_SECRET=your_secret_key_here

# Start backend
npm run dev
```

**Backend runs on:** `http://localhost:5000`

### Step 3: Frontend Setup

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

**Frontend runs on:** `http://localhost:3000`

### Step 4: Verify Both Are Running

- **Backend:** `http://localhost:5000/api/` → Should show JSON message
- **Frontend:** `http://localhost:3000/` → Should load JanSewa homepage
- **Browser Console:** No connection errors should appear

### Step 5: Create Test Data (Optional)

Register accounts:
1. **Citizen Account:** Username: citizen1, Email: citizen@test.com
2. **Admin Account:** Manually update MongoDB to set role: "admin"

---

## 📊 Database Schema

### **User Collection**

```javascript
{
  _id: ObjectId,
  username: String (required, unique),
  email: String (required, unique),
  password: String (hashed),
  role: String (enum: ["citizen", "admin"]),
  createdAt: Date,
  updatedAt: Date
}
```

### **Complaint Collection**

```javascript
{
  _id: ObjectId,
  title: String (required),
  description: String (required),
  category: String (enum: ["Road Damage", "Garbage Collection", "Water Leakage", "Street Light", "Other"]),
  location: String (required),
  image: String (URL),
  status: String (enum: ["Pending", "In Progress", "Resolved"]),
  createdBy: ObjectId (ref: User),
  
  // Admin fields
  resolvedBy: ObjectId (ref: User),
  adminNotes: String,
  resolutionImage: String (URL),
  resolutionMessage: String,
  resolvedAt: Date,
  
  // Community interaction fields
  likes: [ObjectId] (ref: User - array of user IDs who liked),
  comments: [
    {
      _id: ObjectId,
      user: ObjectId (ref: User),
      text: String,
      createdAt: Date
    }
  ],
  additionalImages: [String] (array of image URLs),
  
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔌 API Documentation

### **Authentication Endpoints**

#### Register User
```
POST /api/auth/register
Headers: Content-Type: application/json
Body: {
  "username": "john_doe",
  "email": "john@example.com",
  "password": "securepass123"
}
Response: {
  "message": "User registered successfully",
  "token": "jwt_token_here",
  "user": { "id", "username", "email", "role": "citizen" }
}
```

#### Login
```
POST /api/auth/login
Body: {
  "email": "john@example.com",
  "password": "securepass123"
}
Response: {
  "message": "User logged in successfully",
  "token": "jwt_token_here",
  "user": { "id", "username", "email", "role" }
}
```

#### Get Profile
```
GET /api/auth/profile
Headers: Authorization: Bearer jwt_token
Response: { User object }
```

---

### **Complaint Endpoints**

#### Create Complaint
```
POST /api/complaints
Headers: Authorization: Bearer jwt_token
Body: {
  "title": "Pothole on Main Street",
  "description": "Large pothole causing accidents",
  "category": "Road Damage",
  "location": "Main Street, Downtown",
  "image": "image_url_here"
}
```

#### Get All Complaints
```
GET /api/complaints
Response: [Array of complaints]
```

#### Get User's Complaints
```
GET /api/complaints/user/my-complaints
Headers: Authorization: Bearer jwt_token
Response: [Array of user's complaints]
```

#### Get Single Complaint
```
GET /api/complaints/:id
Response: { Complaint object with createdBy details }
```

#### Update Complaint Status (Admin)
```
PUT /api/complaints/:id
Headers: Authorization: Bearer jwt_token (admin only)
Body: {
  "status": "In Progress",
  "adminNotes": "Team assigned to fix this",
  "resolutionImage": "image_url",
  "resolutionMessage": "Issue resolved successfully"
}
```

---

### **Community Interaction Endpoints**

#### Get Complaints by Location
```
GET /api/community/nearby?location=Hanamkonda
Response: [Array of complaints matching location]
```

#### Add Comment
```
POST /api/community/:complaintId/comment
Headers: Authorization: Bearer jwt_token
Body: {
  "text": "I also saw this problem near the market"
}
```

#### Delete Comment
```
DELETE /api/community/:complaintId/comment/:commentId
Headers: Authorization: Bearer jwt_token
Response: { "message": "Comment deleted successfully" }
```

#### Toggle Like
```
POST /api/community/:complaintId/like
Headers: Authorization: Bearer jwt_token
Response: {
  "isLiked": true,
  "likes": 12
}
```

#### Upload Evidence Image
```
POST /api/community/:complaintId/evidence
Headers: Authorization: Bearer jwt_token
Body: {
  "imageUrl": "url_of_evidence_image"
}
Response: {
  "message": "Evidence image uploaded successfully",
  "additionalImages": [...]
}
```

#### Get Complaint Details
```
GET /api/community/:complaintId
Headers: Authorization: Bearer jwt_token
Response: { Complaint with all populated relations }
```

---

## 🎨 Frontend Pages & Components

### **Navbar Component**
- **Role-Aware Navigation**
- Citizens see: Report Issue, Nearby Issues, My Complaints
- Admins see: Admin Dashboard
- Shows username and logout button

### **Home Page**
- Landing page with platform statistics
- Hero section with call-to-action
- "Report Issue" button hidden for admins
- Feature highlights
- How it works section
- Issue categories display
- Platform statistics (users, issues resolved, etc.)

### **Register Page**
- Username, email, password fields
- Password strength indicator
- Account type fixed as "Citizen"
- Confirm password matching
- Form validation

### **Login Page**
- Email and password input
- Remember me option
- Link to register
- Login with JWT token storage

### **Report Issue Page**
- Form to submit new complaints
- Fields: Title, Description, Category, Location, Image
- Image preview before submission
- Category emoji display
- Success message on submission

### **My Complaints Page**
- List of user's reported issues
- Status filter (All, Pending, In Progress, Resolved)
- Search functionality
- Sort by date
- Click to view full complaint details
- Admin notes visibility
- Resolution information display

### **Nearby Issues Page**
- Location search bar
- Real-time location search
- Complaint cards in grid layout
- Displays: Title, Category, Location, Status, Likes, Comments
- Images gallery
- Community interaction buttons

### **Complaint Detail Page**
- Full complaint information
- Original issue image
- Admin notes (if any)
- Community evidence images
- Comments section
- Resolution details (if resolved)
- Comment submission form

### **Admin Dashboard**
- 📊 Statistics cards (Total, Pending, In Progress, Resolved)
- 🔍 Advanced search and filter
- 📋 Complaints table
- ⚙️ Quick update buttons
- Modal for viewing full details
- Modal for updating status with:
  - Status dropdown
  - Admin notes textarea
  - Resolution image URL
  - Resolution message textarea
  - Submit button

### **ComplaintCard Component**
- Reusable card for displaying complaints
- Shows: Title, Category, Location, Status
- Original image
- Community evidence gallery
- Like button with count
- Comments button with count
- Upload evidence button
- Comments section expandable
- Evidence upload form

### **CommentsSection Component**
- Comment input form (logged-in users)
- Display all comments with timestamps
- User who commented
- Delete button (comment author only)
- Comment count display

---

## 👥 User Roles & Permissions

### **Citizen Role**
✅ **Can:**
- Register account
- Report civic issues
- View own complaints
- Update complaint location, title (future feature)
- View all complaints with same location (Nearby Issues)
- Like complaints
- Comment on complaints
- Upload evidence images
- View resolution details

❌ **Cannot:**
- View admin dashboard
- Update complaint status
- Access other admin features
- See admin notes (if not their own complaint)

### **Admin Role**
✅ **Can:**
- View all complaints
- Search and filter complaints
- Update complaint status
- Add admin notes
- Upload resolution images
- Add resolution messages
- Access admin dashboard
- View all user's complaints

❌ **Can:**
- Report new complaints
- Like or comment (future enhancement)
- Access citizen features

### **Anonymous Users**
- View home page
- Register new account
- Login
- Cannot access any protected features

---

## 📖 How to Use

### **Citizen Workflow**

#### 1. Register Account
- Click "Register" on home page
- Fill: Username, Email, Password
- Account type is automatically "Citizen"
- Click Register

#### 2. Report an Issue
- Login with credentials
- Click "Report Issue" in navbar
- Fill complaint form:
  - **Title:** Brief issue name
  - **Description:** Detailed explanation
  - **Category:** Select from dropdown
  - **Location:** Enter area/street name
  - **Image:** Upload photo as evidence
- Click "Report Issue"

#### 3. Track My Complaints
- Click "My Complaints"
- View all complaints you've reported
- Filter by status to see progress
- Click on complaint to see:
  - Admin notes
  - Current status
  - Resolution details (if resolved)

#### 4. Find Nearby Issues
- Click "Nearby Issues"
- Enter location (e.g., "Hanamkonda")
- See all issues in that area
- Interact with community:
  - 👍 Click Like to support issue
  - 💬 Click Comments to discuss
  - 📷 Upload Evidence with additional photos

#### 5. Engage with Community
- **Comment:** Share observations about issues
- **Like:** Show you support the complaint
- **Upload Evidence:** Add more photos showing the problem
- **View Interactions:** See how many people support each issue

---

### **Admin Workflow**

#### 1. Login as Admin
- Login with admin credentials
- Admin Dashboard automatically opens

#### 2. View Complaints
- Dashboard shows statistics
- Browse table of all complaints
- Use search to find specific issues
- Filter by status (Pending/In Progress/Resolved)

#### 3. Update Status
- Click "Update" button on complaint
- Modal opens with options:
  - Change status (Pending → In Progress → Resolved)
  - Add admin notes (internal notes)
- Click Update

#### 4. Mark as Resolved
- Click Update on complaint
- Change status to "Resolved"
- Add Resolution Details:
  - Upload image showing fix
  - Write resolution message for citizens
- Click Update
- Citizens will see proof and message

#### 5. View Community Interaction
- Click complaint to see full details
- View community comments
- See evidence uploaded by citizens
- Check like count and engagement

---

## 🐛 Troubleshooting

### **Backend Won't Start**

**Error: Port 5000 already in use**
```bash
# Windows: Kill process using port 5000
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Linux/Mac:
lsof -i :5000
kill -9 <PID>
```

**Error: MongoDB connection failed**
- Ensure MongoDB is running
- Check `.env` file for correct MONGODB_URI
- Verify MongoDB is accessible

**Error: Route.get() requires a callback**
- Check middleware imports (should not destructure `auth`)
- Verify all controllers are exported properly

---

### **Frontend Won't Load**

**Error: Cannot connect to API**
- Verify backend is running on port 5000
- Check `api.js` for correct API_URL
- Look for CORS errors in browser console

**Error: Blank page or loading forever**
- Check browser console for JavaScript errors
- Clear browser cache and localStorage
- Restart development server

---

### **Features Not Working**

**Nearby Issues showing "Failed to fetch"**
- Verify backend route `/api/community/nearby` exists
- Check that complaints exist in database
- Try exact location match first
- Check browser network tab for actual error

**Cannot upload evidence image**
- Image URL must be direct link
- Try images from Imgur, Cloudinary, or similar
- Check browser console for error details

**Comments not saving**
- Ensure user is logged in
- Check token is valid in localStorage
- Verify backend is running

---

## 📝 Environment Variables

### Backend (.env)
```
MONGODB_URI=mongodb://localhost:27017/jansewa
JWT_SECRET=your_super_secret_key_here
PORT=5000
```

### Frontend (hardcoded in api.js)
```javascript
const API_URL = 'http://localhost:5000/api';
```

---

## 🎓 Key Technologies Explained

### **JWT Authentication**
- Tokens stored in localStorage
- Tokens sent in Authorization header
- Backend validates on protected routes
- Tokens expire after 7 days

### **MongoDB Schema Validation**
- Mongoose enforces data structure
- Requires specific fields
- Enums validate allowed values
- References link collections

### **Complaint Lifecycle**
1. **Created:** Citizen submits with Pending status
2. **In Progress:** Admin updates after acknowledgment
3. **Resolved:** Admin uploads proof and message
4. **Visible:** Citizens see complete resolution

### **Community Interaction**
- Persists even after resolution
- Like system uses array of user IDs
- Comments are nested documents
- Evidence images stored as URLs

---

## 📞 Support & Contact

For issues or questions:
1. Check troubleshooting section
2. Review API documentation
3. Check browser console for errors
4. Verify database connection
5. Restart both frontend and backend servers

---

## 📄 License & Credits

**Project:** JanSewa - Citizen Issue Reporting Platform
**Type:** MERN Stack Web Application
**Purpose:** Civic issue reporting and community engagement
**Created:** 2024

---

## 🎉 Quick Command Reference

### Backend
```bash
cd backend
npm install                 # Install dependencies
npm run dev               # Start with nodemon
npm start                # Start without nodemon
npm audit fix --force    # Fix vulnerabilities
```

### Frontend
```bash
cd frontend
npm install              # Install dependencies
npm start               # Start dev server
npm run build           # Build for production
npm test                # Run tests
```

### Database
```bash
# Start local MongoDB
mongod

# Access MongoDB shell
mongo

# View databases
show dbs

# Switch to jansewa database
use jansewa

# View collections
show collections

# Find all complaints
db.complaints.find()
```

---

**Project Documentation Complete! 🚀**
