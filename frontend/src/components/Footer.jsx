import React from 'react';

export default function Footer({ setCurrentView }) {
  return (
    // Reduced padding from py-16 to py-10 for a more compact height
    <footer className="bg-slate-900 text-slate-300 py-10 border-t border-slate-800 relative overflow-hidden">
      
      {/* Decorative background glow - kept subtle */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        
        {/* TOP SECTION: Grid Layout - Reduced bottom margin (mb-8) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-8">
          
          {/* COLUMN 1: Brand & Desc (Spans 4 columns) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3 text-white">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-900/20">
                <i className="fas fa-database text-sm"></i>
              </div>
              <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                DBNorm
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              An advanced educational platform designed to simplify database normalization. 
              Master concepts from 1NF to 5NF with real-time visualization.
            </p>
            <div className="flex gap-3 pt-1">
              {/* Compact Social Icons */}
              <a href="https://github.com/Subham-102" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all duration-300 text-sm">
                <i className="fab fa-github"></i>
              </a>
              <a href="https://www.linkedin.com/in/subham-shaw-18550b271/" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-blue-700 hover:text-white transition-all duration-300 text-sm">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="mailto:subhamkrshawa21s@gmail.com" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-purple-600 hover:text-white transition-all duration-300 text-sm">
                <i className="fas fa-envelope"></i>
              </a>
            </div>
          </div>

          {/* COLUMN 2: Navigation */}
          <div className="lg:col-span-2 lg:col-start-7 pt-2">
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-xs">Explore</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => setCurrentView('home')} className="hover:text-blue-400 transition-colors flex items-center gap-2 group">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('tool')} className="hover:text-blue-400 transition-colors flex items-center gap-2 group">
                  Normalizer Tool
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('learn')} className="hover:text-blue-400 transition-colors flex items-center gap-2 group">
                  Theory & Guide
                </button>
              </li>
            </ul>
          </div>

          {/* COLUMN 3: Tech Stack */}
          <div className="lg:col-span-2 pt-2">
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-xs">Tech Stack</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2 text-slate-400">
                <i className="fab fa-react text-blue-400 text-xs"></i> React.js
              </li>
              <li className="flex items-center gap-2 text-slate-400">
                <i className="fab fa-java text-orange-500 text-xs"></i> Java Spring Boot
              </li>
              <li className="flex items-center gap-2 text-slate-400">
                <i className="fas fa-wind text-cyan-400 text-xs"></i> Tailwind
              </li>
            </ul>
          </div>

          {/* COLUMN 4: Project Info (Compact Box) */}
          <div className="lg:col-span-2 pt-2">
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-xs">Project Info</h4>
            <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700">
              <p className="text-[10px] text-slate-400 mb-1 uppercase font-semibold">Final Year Project</p>
              <p className="text-white font-bold text-sm">8th Semester</p>
              <p className="text-xs text-slate-400 mt-0.5">CS & Engineering</p>
            </div>
          </div>

        </div>

        {/* BOTTOM SECTION: Compact Copyright Bar */}
        <div className="pt-6 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} DBNorm. Designed for Academics.</p>
          <div className="flex gap-6">
            <span className="cursor-pointer hover:text-white transition-colors">Privacy</span>
            <span className="cursor-pointer hover:text-white transition-colors">Terms</span>
            <span className="cursor-pointer hover:text-white transition-colors">Documentation</span>
          </div>
        </div>

      </div>
    </footer>
  );
}