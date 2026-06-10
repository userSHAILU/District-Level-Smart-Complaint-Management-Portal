# Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Install Dependencies

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd frontend
npm install
```

### Step 2: Configure Environment Variables

**Backend (.env):**
```bash
MONGODB_URI=mongodb://localhost:27017/jansewa
PORT=5000
JWT_SECRET=your_secret_key_here
```

**Frontend (.env):**
```bash
REACT_APP_API_URL=http://localhost:5000/api
```

### Step 3: Start MongoDB

```bash
mongod
```

### Step 4: Start Backend Server

```bash
cd backend
npm run dev
```

Backend will run on: `http://localhost:5000`

### Step 5: Start Frontend (New Terminal)

```bash
cd frontend
npm start
```

Frontend will run on: `http://localhost:3000`

---

## 📝 Test the Application

### Login with Demo Accounts:

**Admin:**
- Email: admin@example.com
- Password: password

**Citizen:**
- Email: citizen@example.com
- Password: password

Or create a new account by registering!

---

## 🎯 Test Workflow

1. **Register/Login** as a citizen
2. **Report an Issue** - Go to "Report Issue" and submit a complaint
3. **View Your Complaints** - Check "My Complaints" to see your issues
4. **Login as Admin** - Log out and login with admin credentials
5. **Manage Complaints** - Go to "Admin Dashboard" to update complaint status

---

## 📁 Project Structure

```
/backend           → Express server + MongoDB models
/frontend          → React app with Tailwind CSS
```

## 🛠 Common Commands

**Backend Development:**
```bash
cd backend
npm run dev        # Start with nodemon (auto-reload)
npm start          # Start normally
```

**Frontend Development:**
```bash
cd frontend
npm start          # Start development server
npm run build      # Create production build
```

## 🔧 Troubleshooting

- **Port already in use?** Change PORT in backend/.env
- **MongoDB not connecting?** Make sure `mongod` is running
- **CORS errors?** Ensure frontend runs on 3000 and backend on 5000
- **Can't login?** Check your MongoDB is running and .env variables are set

## 📚 Next Steps

1. Review the main README.md for detailed documentation
2. Explore the code structure in both frontend and backend
3. Modify and customize for your needs
4. Add more features as needed

---

Happy Coding! 🎉
