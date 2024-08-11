import React from 'react';
import { Link } from 'react-router-dom';

const Homepage = () => {
  return (
    <div className="bg-gradient-to-b from-white to-green-100 min-h-screen flex items-center justify-center">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        <img
          src="/images/coffee.jpg"
          alt="Coffee Farm"
          className="w-full h-96 object-cover rounded-lg shadow-lg"
        />
        <p className="text-xs text-gray-500">
        Photo by <a href="https://unsplash.com/@rodrigoflores_photo?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Rodrigo Flores</a> on <a href="https://unsplash.com/photos/close-up-photography-of-fruit-sn87TQ_o7zs?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
  
        </p>
        
        <h2 className="text-4xl font-bold text-green-700 mb-4 text-center">Our Mission</h2>
        <p className="text-lg text-gray-700 text-center mb-6">
          At nogyo, our goal is to allow you to find the finest, sustainably sourced coffee beans directly from a
          farm to your cup. Our mission is to support small, family owned farms and farmers while ensuring you get the best coffee and the farmers get paid fairly.
        </p>
        <Link to="/register">
          <button className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-700 transition">
            Register Now
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Homepage