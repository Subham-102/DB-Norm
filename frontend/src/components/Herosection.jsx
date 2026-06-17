import React from 'react';

// Accept props for navigation
export default function Herosection({ onStart, onLearn }) {
  return (
    <div className="relative bg-gray-50 overflow-hidden min-h-[85vh] flex items-center">
      {/* --- Background Decorative Blobs --- */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-32 left-20 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          
          {/* Left: Text Content */}
          <div className="flex-1 text-center md:text-left space-y-6">
            <div className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 font-semibold rounded-full text-sm mb-2">
              🚀 Educational Platform
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 leading-tight">
              Normalize Data <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Like a Pro
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 max-w-lg mx-auto md:mx-0">
              Master the theory of Database Normalization. From <strong>1NF to 5NF</strong>, learn the concepts and practice with our intelligent decomposition engine.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
              <button
                onClick={onStart}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-2xl shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transform hover:-translate-y-1 transition-all duration-300"
              >
                Start Normalizing
              </button>
              
              <button 
                onClick={onLearn}
                className="px-8 py-4 bg-white text-gray-700 font-bold rounded-2xl shadow-md border border-gray-100 hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
              >
                <i className="fas fa-book-open text-purple-500"></i> Learn Theories
              </button>
            </div>
            
            {/* Trust Badges */}
            <div className="pt-8 flex items-center gap-4 justify-center md:justify-start opacity-70 grayscale hover:grayscale-0 transition-all">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Powered by</span>
              <i className="fab fa-react text-2xl text-blue-400"></i>
              <i className="fab fa-java text-2xl text-orange-500"></i>
              <i className="fas fa-database text-2xl text-gray-600"></i>
            </div>
          </div>

          {/* Right: Hero Image */}
          <div className="flex-1 w-full max-w-lg relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-[2rem] transform rotate-6 opacity-20 blur-lg"></div>
            <img 
              src="https://img.freepik.com/free-vector/database-schema-concept-illustration_114360-7613.jpg?w=1060" 
              alt="Database Illustration" 
              className="relative rounded-[2rem] shadow-2xl border-4 border-white z-10 w-full transform transition hover:scale-[1.02] duration-500"
            />
            
            {/* REMOVED: The floating 'Learning Path Complete' box is gone from here */}
          </div>
          
        </div>
      </div>
    </div>
  );
}