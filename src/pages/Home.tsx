import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, Upload, Languages, Headphones } from 'lucide-react';

const Home = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Break Communication Barriers with AI
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Transform sign language into text and speech in real-time, making communication seamless for everyone.
        </p>
        <div className="flex justify-center space-x-4">
          <Link
            to="/live"
            className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 transition"
          >
            Start Translating Now
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <Camera className="h-12 w-12 text-indigo-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Real-time Translation</h3>
          <p className="text-gray-600">
            Use your webcam for instant sign language translation with advanced AI recognition.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <Upload className="h-12 w-12 text-indigo-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Video Processing</h3>
          <p className="text-gray-600">
            Upload sign language videos and get accurate translations in multiple formats.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md">
          <Languages className="h-12 w-12 text-indigo-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Multi-Language Support</h3>
          <p className="text-gray-600">
            Translate sign language into multiple spoken languages instantly.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-8 mb-16">
        <h2 className="text-3xl font-bold mb-6 text-center">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-indigo-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Camera className="h-8 w-8 text-indigo-600" />
            </div>
            <h3 className="font-semibold mb-2">1. Capture</h3>
            <p className="text-gray-600">Use your webcam or upload a video of sign language.</p>
          </div>
          
          <div className="text-center">
            <div className="bg-indigo-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Languages className="h-8 w-8 text-indigo-600" />
            </div>
            <h3 className="font-semibold mb-2">2. Process</h3>
            <p className="text-gray-600">Our AI analyzes and interprets the signs in real-time.</p>
          </div>
          
          <div className="text-center">
            <div className="bg-indigo-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Headphones className="h-8 w-8 text-indigo-600" />
            </div>
            <h3 className="font-semibold mb-2">3. Translate</h3>
            <p className="text-gray-600">Get instant text and audio translations.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;