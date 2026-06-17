import React from 'react';

export default function Feature() {
  const features = [
    {
      icon: "fa-magic",
      color: "blue",
      title: "Auto-Detection",
      desc: "Instantly analyze your schema to detect existing normal forms and violations."
    },
    {
      icon: "fa-project-diagram",
      color: "purple",
      title: "Visual Decomposition",
      desc: "See how your tables split into BCNF, 4NF, and 5NF with clear dependency tracking."
    },
    {
      icon: "fa-file-csv",
      color: "green",
      title: "Real Data Import",
      desc: "Don't just guess. Upload actual CSV files and see the data physically separated."
    },
    {
      icon: "fa-download",
      color: "pink",
      title: "Export Ready",
      desc: "Download your normalized schema as SQL scripts or CSV files in one click."
    }
  ];

  return (
    <section id="features" className="py-20 bg-white relative">
      <div className="container mx-auto px-4">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-base text-blue-600 font-bold tracking-wide uppercase">Why Use This Tool?</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need to master Database Design
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            A complete suite for students and developers to visualize and implement database normalization.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <div 
              key={idx} 
              className="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:-translate-y-2"
            >
              <div className={`w-14 h-14 rounded-xl bg-${feature.color}-100 flex items-center justify-center text-${feature.color}-600 text-2xl mb-6 group-hover:scale-110 transition-transform`}>
                <i className={`fas ${feature.icon}`}></i>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                {feature.desc}
              </p>
              
              {/* Decorative gradient line at bottom */}
              <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-${feature.color}-400 to-${feature.color}-600 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity`}></div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}