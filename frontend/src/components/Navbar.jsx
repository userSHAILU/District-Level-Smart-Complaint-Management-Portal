import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ user, onLogout }) {
  return (
    <nav className="bg-gradient-to-r from-black via-gray-900 to-black text-white shadow-2xl border-b-4 border-yellow-400">
      <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition">
          <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
            <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.5 1.5H5.75A2.75 2.75 0 003 4.25v11C3 16.66 3.34 17 3.75 17h12.5c.41 0 .75-.34.75-.75V8m-8.5-6.5v4.5m3-4.5v4.5m-6 0h9" stroke="white" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M7 10h6M7 13h6" stroke="white" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
          </div>
          <span className="text-4xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent hover:from-blue-100 hover:to-white transition">
            JanSewa
          </span>
        </Link>
        <div className="flex gap-8 items-center">
          <Link to="/" className="hover:text-yellow-200 transition text-lg font-medium hover:scale-110 transform duration-300">
            Home
          </Link>
          {user ? (
            <>
              {user.role !== 'admin' && (
                <>
                  <Link to="/report-issue" className="hover:text-yellow-200 transition text-lg font-medium hover:scale-110 transform duration-300">
                    Report Issue
                  </Link>
                  <Link to="/nearby-issues" className="hover:text-yellow-200 transition text-lg font-medium hover:scale-110 transform duration-300">
                    Nearby Issues
                  </Link>
                  <Link to="/my-complaints" className="hover:text-yellow-200 transition text-lg font-medium hover:scale-110 transform duration-300">
                    My Complaints
                  </Link>
                </>
              )}
              {user.role === 'admin' && (
                <Link to="/admin" className="hover:text-yellow-300 transition font-bold text-lg hover:scale-110 transform duration-300">
                  Admin Dashboard
                </Link>
              )}
              <div className="flex items-center gap-4 border-l border-blue-400 pl-4">
                <span className="text-base font-medium bg-blue-200 bg-opacity-20 px-3 py-1 rounded-full">{user.username}</span>
                <button
                  onClick={onLogout}
                  className="bg-red-500 hover:bg-red-700 px-5 py-2.5 rounded-lg transition font-semibold text-base shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-yellow-200 transition text-lg font-medium hover:scale-110 transform duration-300">
                Login
              </Link>
              <Link to="/register" className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-gray-900 px-7 py-3 rounded-lg transition font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
