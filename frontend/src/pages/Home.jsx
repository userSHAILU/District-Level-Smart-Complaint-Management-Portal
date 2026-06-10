import React from 'react';
import { Link } from 'react-router-dom';

function Home({ user }) {
  const categories = [
    { name: 'Road Damage', icon: '🛣️', color: 'from-orange-400 to-orange-600' },
    { name: 'Garbage Collection', icon: '🗑️', color: 'from-green-400 to-green-600' },
    { name: 'Water Leakage', icon: '💧', color: 'from-blue-400 to-blue-600' },
    { name: 'Street Light', icon: '💡', color: 'from-yellow-400 to-yellow-600' },
  ];

  const steps = [
    {
      step: 1,
      title: 'Report Issue',
      description: 'Share civic problems with photo, location & details',
      icon: '📝'
    },
    {
      step: 2,
      title: 'Admin Reviews',
      description: 'Admin evaluates and prioritizes the complaint',
      icon: '👨‍💼'
    },
    {
      step: 3,
      title: 'Status Update',
      description: 'Track progress in real-time until resolution',
      icon: '📊'
    },
  ];

  const stats = [
    { number: '20K+', label: 'Active Users' },
    { number: '8K+', label: 'Issues Resolved' },
    { number: '95%', label: 'Resolution Rate' },
    { number: '50+', label: 'Cities' },
  ];

  const features = [
    { icon: '⚡', title: 'Lightning Fast', description: 'Report issues in seconds' },
    { icon: '🎯', title: 'Track Progress', description: 'Real-time status updates' },
    { icon: '🔐', title: 'Secure & Safe', description: 'Your data is protected' },
    { icon: '📱', title: 'Mobile Ready', description: 'Access anywhere, anytime' },
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-700 via-blue-600 to-cyan-500 text-white py-40 overflow-hidden shadow-2xl">
        <div className="absolute inset-0 opacity-20 z-0">
          <div className="absolute top-20 left-10 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-10 w-96 h-96 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute -bottom-10 left-1/2 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <h1 className="text-8xl font-bold mb-8 leading-tight text-white drop-shadow-2xl tracking-tight">
            JanSewa
          </h1>
          <p className="text-3xl mb-6 font-bold text-yellow-200 drop-shadow-lg">
            Empowering Citizens to Build Better Communities
          </p>
          <p className="text-xl mb-14 max-w-3xl mx-auto text-blue-50 drop-shadow-md font-medium">
            Report civic issues and track their resolution in real-time. Join thousands of citizens making a difference in their communities.
          </p>
          <div className="flex gap-8 justify-center flex-wrap">
            {!user ? (
              <>
                <Link
                  to="/login"
                  className="bg-white text-indigo-700 font-bold px-12 py-5 rounded-xl hover:bg-gray-50 transition transform hover:scale-110 shadow-2xl text-lg border-3 border-yellow-300 hover:border-white"
                >
                  Login Now
                </Link>
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-orange-400 text-gray-900 font-bold px-12 py-5 rounded-xl hover:from-yellow-500 hover:via-yellow-400 hover:to-orange-500 transition transform hover:scale-110 shadow-2xl text-lg border-3 border-white"
                >
                  Create Account
                </Link>
              </>
            ) : (
              user.role !== 'admin' && (
                <Link
                  to="/report-issue"
                  className="bg-gradient-to-r from-green-400 to-emerald-400 text-white font-bold px-12 py-5 rounded-xl hover:from-green-500 hover:to-emerald-500 transition transform hover:scale-110 shadow-2xl text-lg border-3 border-white"
                >
                  Report an Issue
                </Link>
              )
            )}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-24 bg-gradient-to-r from-indigo-50 via-blue-50 to-cyan-50 shadow-inner">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">Platform Statistics</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2">
                <div className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-3">{stat.number}</div>
                <div className="text-gray-700 text-lg font-bold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-white shadow-built">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-5xl font-bold text-center mb-6 text-gray-900">How It Works</h2>
          <p className="text-center text-gray-600 text-xl mb-20 max-w-2xl mx-auto font-medium">
            Simple steps to report issues and make your community better
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((item, index) => (
              <div key={item.step} className="relative">
                <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-10 rounded-2xl shadow-xl hover:shadow-2xl transition transform hover:-translate-y-3 border-2 border-indigo-100 h-full">
                  <div className="text-7xl mb-6 transform hover:scale-125 transition duration-300">{item.icon}</div>
                  <div className="absolute -top-6 -left-6 w-16 h-16 bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-2xl">
                    {item.step}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">{item.title}</h3>
                  <p className="text-gray-700 text-lg leading-relaxed font-medium">{item.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-8 transform -translate-y-1/2">
                    <svg className="w-8 h-8 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Issue Categories */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-blue-50 shadow-built">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-5xl font-bold text-center mb-6 text-gray-900">Issue Categories</h2>
          <p className="text-center text-gray-600 text-xl mb-20 max-w-2xl mx-auto font-medium">
            Report any civic issue from common categories
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <div
                key={category.name}
                className={`bg-gradient-to-br ${category.color} p-10 rounded-2xl shadow-2xl text-white text-center hover:shadow-3xl transition transform hover:-translate-y-3 border-2 border-white hover:scale-105 duration-300`}
              >
                <div className="text-8xl mb-8 transform hover:scale-125 transition duration-300">{category.icon}</div>
                <h3 className="text-2xl font-bold">{category.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-24 bg-white shadow-built">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-5xl font-bold text-center mb-6 text-gray-900">Why Choose JanSewa?</h2>
          <p className="text-center text-gray-600 text-xl mb-20 max-w-2xl mx-auto font-medium">
            Leading platform for civic engagement and community improvement
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50 p-10 rounded-2xl shadow-xl hover:shadow-2xl transition transform hover:-translate-y-3 border-2 border-indigo-100 hover:border-blue-300"
              >
                <div className="text-6xl mb-6 transform hover:scale-125 transition duration-300">{feature.icon}</div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">{feature.title}</h3>
                <p className="text-gray-700 text-lg font-medium">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gradient-to-r from-indigo-100 via-blue-50 to-cyan-100 shadow-built">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-5xl font-bold text-center mb-20 text-gray-900">What People Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Rajesh Kumar', role: 'Citizen', comment: 'Great platform! My issue was resolved in just 2 weeks.' },
              { name: 'Priya Singh', role: 'Administrator', comment: 'Easy to manage complaints and track progress efficiently.' },
              { name: 'Amit Patel', role: 'Citizen', comment: 'Best way to report issues and contribute to the community!' },
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-10 rounded-2xl shadow-xl hover:shadow-2xl transition transform hover:-translate-y-2 border-l-4 border-blue-500">
                <div className="flex items-center mb-6">
                  <div className="w-14 h-14 bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                    {testimonial.name[0]}
                  </div>
                  <div className="ml-4">
                    <h4 className="font-bold text-gray-900 text-lg">{testimonial.name}</h4>
                    <p className="text-gray-500 text-sm font-medium">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 text-lg italic font-medium">"{testimonial.comment}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {!user && (
        <section className="bg-gradient-to-r from-indigo-700 via-blue-600 to-cyan-600 text-white py-28 shadow-2xl border-t-4 border-yellow-400">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-6xl font-bold mb-8 drop-shadow-lg">Ready to Make a Difference?</h2>
            <p className="text-2xl mb-16 max-w-2xl mx-auto font-medium drop-shadow-md">
              Join thousands of citizens improving their communities, one report at a time.
            </p>
            <Link
              to="/register"
              className="inline-block bg-gradient-to-r from-yellow-400 via-yellow-300 to-orange-400 text-gray-900 font-bold px-14 py-6 rounded-xl hover:from-yellow-500 hover:via-yellow-400 hover:to-orange-500 transition transform hover:scale-110 shadow-2xl text-xl border-3 border-white"
            >
              Get Started Today
            </Link>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 via-slate-800 to-gray-900 text-white py-16 shadow-2xl border-t-4 border-blue-500">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <h4 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">JanSewa</h4>
              <p className="text-gray-300 text-lg">Empowering communities through civic engagement</p>
            </div>
            <div>
              <h5 className="font-bold mb-6 text-xl text-blue-300">Quick Links</h5>
              <ul className="text-gray-400 space-y-2">
                <li><Link to="/" className="hover:text-white transition">Home</Link></li>
                <li><Link to="/login" className="hover:text-white transition">Login</Link></li>
                <li><Link to="/register" className="hover:text-white transition">Register</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-4 text-lg">Support</h5>
              <ul className="text-gray-400 space-y-2">
                <li>Email: support@jansewa.com</li>
                <li>Phone: +91 1234567890</li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-4 text-lg">Follow Us</h5>
              <ul className="text-gray-400 space-y-2">
                <li><button className="hover:text-white transition cursor-pointer">Facebook</button></li>
                <li><button className="hover:text-white transition cursor-pointer">Twitter</button></li>
                <li><button className="hover:text-white transition cursor-pointer">Instagram</button></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
            <p>&copy; 2024 JanSewa - Citizen Issue Reporting Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
