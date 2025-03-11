import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, Upload, Languages, Settings } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Languages className="h-8 w-8 text-indigo-600" />
            <span className="text-xl font-bold text-gray-800">SenseConnect</span>
          </Link>
          
          <div className="flex space-x-4">
            <Link
              to="/live"
              className="flex items-center space-x-1 px-3 py-2 rounded-md text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
            >
              <Camera className="h-5 w-5" />
              <span>Live Translation</span>
            </Link>
            
            <Link
              to="/upload"
              className="flex items-center space-x-1 px-3 py-2 rounded-md text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
            >
              <Upload className="h-5 w-5" />
              <span>Upload Video</span>
            </Link>
            
            <Link
              to="/dashboard"
              className="flex items-center space-x-1 px-3 py-2 rounded-md text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
            >
              <Settings className="h-5 w-5" />
              <span>Dashboard</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
