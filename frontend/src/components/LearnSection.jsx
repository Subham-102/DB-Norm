import React, { useState } from 'react';

export default function LearnSection() {
  const [activeTab, setActiveTab] = useState('theory'); // 'theory' or 'guide'

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-10 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
            Database <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Mastery Hub</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Switch between learning the core **Theory** and mastering the **Practical Tool**.
          </p>
          
          {/* Custom Toggle Switch */}
          <div className="flex justify-center mt-10">
            <div className="bg-white p-1.5 rounded-2xl shadow-inner border border-gray-200 inline-flex relative">
              {/* The Sliding Background */}
              <div 
                className={`absolute top-1.5 bottom-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 shadow transition-all duration-300 ease-out`}
                style={{
                  left: activeTab === 'theory' ? '0.375rem' : '50%', // 0.375rem = p-1.5
                  width: 'calc(50% - 0.375rem)',
                  transform: activeTab === 'guide' ? 'translateX(0)' : 'translateX(0)' 
                }}
              ></div>
              
              {/* Button 1: Theory */}
              <button
                onClick={() => setActiveTab('theory')}
                className={`relative z-10 w-64 py-3 rounded-xl text-sm font-bold transition-colors duration-300 text-center ${
                  activeTab === 'theory' ? 'text-white' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <i className="fas fa-graduation-cap mr-2"></i> Normalization Theory
              </button>

              {/* Button 2: Guide */}
              <button
                onClick={() => setActiveTab('guide')}
                className={`relative z-10 w-64 py-3 rounded-xl text-sm font-bold transition-colors duration-300 text-center ${
                  activeTab === 'guide' ? 'text-white' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <i className="fas fa-map mr-2"></i> User Guide
              </button>
            </div>
          </div>
        </div>

        {/* Content Area with Animation */}
        <div className="animate-fade-in-up">
          {activeTab === 'theory' ? <TheoryContent /> : <GuideContent />}
        </div>
      </div>
    </div>
  );
}

// --- SUB-COMPONENT: Theory (Cards) ---
function TheoryContent() {
  const levels = [
    {
      nf: "1NF",
      title: "First Normal Form",
      goal: "Atomicity",
      desc: "Eliminate repeating groups. Ensure every cell contains a single value.",
      icon: "fa-layer-group",
      color: "blue"
    },
    {
      nf: "2NF",
      title: "Second Normal Form",
      goal: "No Partial Dependency",
      desc: "Ensure all non-key columns depend on the WHOLE primary key, not just part of it.",
      icon: "fa-columns",
      color: "indigo"
    },
    {
      nf: "3NF",
      title: "Third Normal Form",
      goal: "No Transitive Dependency",
      desc: "Columns shouldn't depend on other non-key columns. (A -> B -> C is bad).",
      icon: "fa-project-diagram",
      color: "purple"
    },
    {
      nf: "BCNF",
      title: "Boyce-Codd NF",
      goal: "Strict 3NF",
      desc: "A stricter version of 3NF. For every dependency X -> Y, X must be a Super Key.",
      icon: "fa-shield-alt",
      color: "pink"
    },
    {
      nf: "4NF",
      title: "Fourth Normal Form",
      goal: "No Multi-valued Dependency",
      desc: "Separate independent multi-valued facts (e.g., Hobbies and Skills) into different tables.",
      icon: "fa-code-branch",
      color: "rose"
    },
    {
      nf: "5NF",
      title: "Fifth Normal Form",
      goal: "Join Dependency",
      desc: "Ensure data can be reconstructed from smaller tables without losing information.",
      icon: "fa-network-wired",
      color: "orange"
    }
  ];

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {levels.map((level, idx) => (
        <div key={idx} className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:-translate-y-2 overflow-hidden">
          {/* Top Gradient Bar */}
          <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-${level.color}-400 to-${level.color}-600`}></div>
          
          <div className="flex justify-between items-start mb-6">
            <div className={`w-14 h-14 rounded-2xl bg-${level.color}-50 flex items-center justify-center text-${level.color}-600 text-2xl shadow-sm group-hover:scale-110 transition-transform`}>
              <i className={`fas ${level.icon}`}></i>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-bold bg-${level.color}-100 text-${level.color}-700 uppercase tracking-wide`}>
              {level.nf}
            </span>
          </div>
          
          <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
            {level.title}
          </h3>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
            Goal: {level.goal}
          </p>
          
          <p className="text-gray-600 leading-relaxed">
            {level.desc}
          </p>
        </div>
      ))}
    </div>
  );
}

// --- SUB-COMPONENT: User Guide (Timeline) ---
function GuideContent() {
  const steps = [
    {
      num: "01",
      title: "Define the Schema",
      desc: "Start by entering your Table Name and Columns. Identify your Primary Key (e.g., 'id').",
      icon: "fa-keyboard",
      color: "blue",
      tip: "Use commas to separate columns!"
    },
    {
      num: "02",
      title: "Set Dependencies",
      desc: "Tell the system the rules of your data. A -> B means 'A determines B'. For 4NF, use the Multivalued section.",
      icon: "fa-random",
      color: "indigo",
      tip: "Functional Dependencies are crucial for BCNF."
    },
    {
      num: "03",
      title: "Upload Real Data",
      desc: "Optional but recommended! Upload a CSV file. The system will preview it instantly.",
      icon: "fa-cloud-upload-alt",
      color: "purple",
      tip: "Your CSV headers must match your Column names."
    },
    {
      num: "04",
      title: "Analyze & Normalize",
      desc: "Click 'Normalize'. The engine will decompose your table into smaller, efficient tables.",
      icon: "fa-magic",
      color: "pink",
      tip: "You can choose target forms like 3NF or BCNF."
    },
    {
      num: "05",
      title: "Export Results",
      desc: "View your new tables in the grid and download them individually or as a ZIP archive.",
      icon: "fa-download",
      color: "green",
      tip: "Ready for SQL import!"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="relative">
        {/* Vertical Line (The Roadmap) */}
        <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-200 via-purple-200 to-gray-100 rounded-full hidden md:block"></div>

        <div className="space-y-12">
          {steps.map((step, idx) => (
            <div key={idx} className="relative flex flex-col md:flex-row gap-8 items-start group">
              
              {/* The Timeline Node (Icon) */}
              <div className="hidden md:flex flex-shrink-0 w-16 h-16 rounded-full bg-white border-4 border-white shadow-xl items-center justify-center z-10 relative">
                 <div className={`w-full h-full rounded-full bg-gradient-to-br from-${step.color}-500 to-${step.color}-600 flex items-center justify-center text-white text-xl`}>
                   <i className={`fas ${step.icon}`}></i>
                 </div>
              </div>

              {/* The Content Card */}
              <div className="flex-1 w-full bg-white rounded-3xl p-8 shadow-md border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden">
                {/* Background Number */}
                <div className="absolute -right-4 -top-4 text-9xl font-black text-gray-50 opacity-50 z-0 select-none">
                  {step.num}
                </div>

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-3 md:hidden">
                    <div className={`w-10 h-10 rounded-full bg-${step.color}-100 flex items-center justify-center text-${step.color}-600`}>
                       <i className={`fas ${step.icon}`}></i>
                    </div>
                    <span className="font-bold text-gray-400">Step {step.num}</span>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-800 mb-3">{step.title}</h3>
                  <p className="text-gray-600 text-lg leading-relaxed mb-6">
                    {step.desc}
                  </p>

                  {/* Pro Tip Box */}
                  <div className={`bg-${step.color}-50 border-l-4 border-${step.color}-500 p-4 rounded-r-xl`}>
                    <div className="flex items-start gap-3">
                      <i className={`fas fa-lightbulb text-${step.color}-500 mt-1`}></i>
                      <div>
                        <span className={`block text-xs font-bold text-${step.color}-600 uppercase`}>Pro Tip</span>
                        <span className={`text-sm text-${step.color}-800`}>{step.tip}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}