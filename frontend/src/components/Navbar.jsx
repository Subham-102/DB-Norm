import React from 'react';

// Receives 'setCurrentView' from App.jsx to change pages
export default function Navbar({ currentView, setCurrentView }) {
  const navItems = [
    { id: 'home', label: 'Home', icon: 'fa-home' },
    { id: 'tool', label: 'Start Normalizing', icon: 'fa-magic' }, // The main tool
    { id: 'learn', label: 'Learn & Guide', icon: 'fa-book-open' }, // The new section
  ];

  return (
    <nav className="bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100 sticky top-0 z-50 transition-all duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* --- LOGO SECTION --- */}
          <div 
            className="flex items-center gap-3 cursor-pointer group" 
            onClick={() => setCurrentView('home')}
          >
            {/* Animated Icon Box */}
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/30 group-hover:rotate-12 transition-transform duration-300">
              <i className="fas fa-database text-lg"></i>
            </div>
            
            {/* Text */}
            <div className="flex flex-col">
              <span className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-purple-700 tracking-tight leading-none">
                DBNorm
              </span>
              <span className="text-xs text-gray-400 font-bold uppercase tracking-widest hidden sm:block">
                Normalizer Tool
              </span>
            </div>
          </div>

          {/* --- DESKTOP NAVIGATION (Awesome Buttons) --- */}
          <div className="hidden md:flex items-center gap-3">
            {navItems.map((item) => {
              const isActive = currentView === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentView(item.id)}
                  className={`
                    relative px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 flex items-center gap-2
                    ${isActive 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/40 transform -translate-y-0.5' 
                      : 'text-gray-500 hover:text-blue-600 hover:bg-blue-50'
                    }
                  `}
                >
                  {/* Show icon only if active or hovered (optional, here always showing for style) */}
                  <i className={`fas ${item.icon} ${isActive ? 'animate-pulse' : ''}`}></i>
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* --- MOBILE MENU BUTTON --- */}
          <div className="md:hidden">
            <button className="w-10 h-10 flex items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 hover:text-blue-600 transition">
              <i className="fas fa-bars text-xl"></i>
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
}