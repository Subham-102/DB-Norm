import React, { useState, useEffect } from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function InputSection({ onSchemaUpdate }) {
  const [tableName, setTableName] = useState("");
  const [primaryKey, setPrimaryKey] = useState("");
  const [columns, setColumns] = useState([]);
  const [newColumn, setNewColumn] = useState("");

  // Functional Dependencies (FD)
  const [dependencies, setDependencies] = useState([]);
  const [newLHS, setNewLHS] = useState("");
  const [newRHS, setNewRHS] = useState("");

  // Multivalued Dependencies (MVD)
  const [mvds, setMvds] = useState([]);
  const [newMvdLHS, setNewMvdLHS] = useState("");
  const [newMvdRHS, setNewMvdRHS] = useState("");

  // Join Dependencies (JD)
  const [jds, setJds] = useState([]);
  const [newJdInput, setNewJdInput] = useState(""); 

  // Use useEffect to automatically update the parent state
  useEffect(() => {
    const pkArray = primaryKey.split(",").map(s => s.trim()).filter(Boolean);
    const flatJds = jds.flat(); 

    const payload = {
      tableName: tableName,
      attributes: columns,
      primaryKey: pkArray,
      functionalDependencies: dependencies,
      multivaluedDependencies: mvds,
      joinDependencies: flatJds, 
    };
    onSchemaUpdate(payload);
  }, [tableName, primaryKey, columns, dependencies, mvds, jds, onSchemaUpdate]);

  const handleAddColumn = () => {
    const trimmed = newColumn.trim();
    if (trimmed && !columns.includes(trimmed)) {
      setColumns([...columns, trimmed]);
      setNewColumn("");
    }
  };

  const handleRemoveColumn = (col) => {
    setColumns(columns.filter((c) => c !== col));
  };

  const splitAttributes = (inputStr) => {
    return inputStr
      .split(/,\s*| /)
      .map((attr) => attr.trim())
      .filter((attr) => attr.length > 0);
  };

  // --- Handlers ---
  const handleAddDependency = () => {
    const lhs = splitAttributes(newLHS);
    const rhs = splitAttributes(newRHS);
    if (lhs.length > 0 && rhs.length > 0) {
      setDependencies([...dependencies, { lhs, rhs }]);
      setNewLHS(""); setNewRHS("");
    }
  };

  const handleRemoveDependency = (index) => {
    setDependencies(dependencies.filter((_, i) => i !== index));
  };

  const handleAddMvd = () => {
    const lhs = splitAttributes(newMvdLHS);
    const rhs = splitAttributes(newMvdRHS);
    if (lhs.length > 0 && rhs.length > 0) {
      setMvds([...mvds, { lhs, rhs }]);
      setNewMvdLHS(""); setNewMvdRHS("");
    }
  };

  const handleRemoveMvd = (index) => {
    setMvds(mvds.filter((_, i) => i !== index));
  };

  const handleAddJd = () => {
    if (!newJdInput.trim()) return;
    const rawGroups = newJdInput.split(";");
    const jdGroups = [];
    for (let group of rawGroups) {
      const attrs = splitAttributes(group);
      if (attrs.length > 0) jdGroups.push(attrs);
    }
    if (jdGroups.length > 1) {
      setJds([...jds, jdGroups]);
      setNewJdInput("");
    } else {
      alert("A Join Dependency must consist of at least two groups separated by a semicolon (e.g., 'A,B; B,C').");
    }
  };

  const handleRemoveJd = (index) => {
    setJds(jds.filter((_, i) => i !== index));
  };
  
  return (
    <section id="input" className="py-16 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Define Your Table Structure
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Input your schema details. For 4NF and 5NF, define the respective dependencies below.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          
          {/* Left Side: Input Form */}
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 space-y-6 relative z-20">
            
            {/* 1. Table Name */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Table Name</label>
              <input
                type="text"
                value={tableName}
                onChange={(e) => setTableName(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
                placeholder="e.g., Employees"
              />
            </div>

            {/* 2. Columns (Moved Above PK) */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Columns</label>
              <div className="flex items-center gap-2 mb-3">
                <input
                  type="text"
                  value={newColumn}
                  onChange={(e) => setNewColumn(e.target.value)}
                  className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
                  placeholder="Add column name"
                />
                <button
                  type="button"
                  onClick={handleAddColumn}
                  className="px-5 py-3 rounded-xl text-white bg-blue-600 hover:bg-blue-700 flex items-center justify-center transition shadow-md"
                >
                  <i className="fas fa-plus"></i>
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {columns.map((col) => (
                  <span
                    key={col}
                    className="bg-blue-50 text-blue-700 border border-blue-100 px-3 py-1 rounded-full flex items-center gap-2 text-sm font-medium"
                  >
                    {col}
                    <button
                      type="button"
                      onClick={() => handleRemoveColumn(col)}
                      className="text-blue-400 hover:text-blue-600"
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* 3. Primary Key (Moved Below Columns) */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Primary Key</label>
              <input
                type="text"
                value={primaryKey}
                onChange={(e) => setPrimaryKey(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
                placeholder="e.g., id, employee_id"
              />
            </div>

            {/* 4. Functional Dependencies */}
            <div className="pt-4 border-t border-gray-100">
              <label className="block text-sm font-bold text-blue-900 mb-2">Functional Dependencies (BCNF)</label>
              <div className="flex items-center gap-2 mb-3">
                <input
                  type="text"
                  value={newLHS}
                  onChange={(e) => setNewLHS(e.target.value)}
                  className="w-1/2 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
                  placeholder="LHS (e.g. A)"
                />
                <span className="text-gray-400 font-bold">→</span>
                <input
                  type="text"
                  value={newRHS}
                  onChange={(e) => setNewRHS(e.target.value)}
                  className="w-1/2 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
                  placeholder="RHS (e.g. B)"
                />
                <button
                  type="button"
                  onClick={handleAddDependency}
                  className="px-5 py-3 rounded-xl text-white bg-blue-600 hover:bg-blue-700 flex items-center justify-center transition shadow-md"
                >
                  <i className="fas fa-plus"></i>
                </button>
              </div>
              <div className="flex flex-col gap-2">
                {dependencies.map((dep, index) => (
                  <div key={index} className="bg-gray-50 text-gray-700 px-4 py-2 rounded-lg border border-gray-200 flex justify-between items-center text-sm">
                    <span><b>{dep.lhs.join(", ")}</b> → <b>{dep.rhs.join(", ")}</b></span>
                    <button onClick={() => handleRemoveDependency(index)} className="text-red-500 hover:text-red-700"><i className="fas fa-times"></i></button>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. Multivalued Dependencies (4NF) */}
            <div className="pt-4 border-t border-gray-100">
              <label className="block text-sm font-bold text-blue-900 mb-2">Multivalued Dependencies (4NF)</label>
              <div className="flex items-center gap-2 mb-3">
                <input
                  type="text"
                  value={newMvdLHS}
                  onChange={(e) => setNewMvdLHS(e.target.value)}
                  className="w-1/2 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
                  placeholder="LHS"
                />
                <span className="text-blue-500 font-bold">↠</span>
                <input
                  type="text"
                  value={newMvdRHS}
                  onChange={(e) => setNewMvdRHS(e.target.value)}
                  className="w-1/2 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
                  placeholder="RHS"
                />
                <button
                  type="button"
                  onClick={handleAddMvd}
                  className="px-5 py-3 rounded-xl text-white bg-blue-600 hover:bg-blue-700 flex items-center justify-center transition shadow-md"
                >
                  <i className="fas fa-plus"></i>
                </button>
              </div>
              <div className="flex flex-col gap-2">
                {mvds.map((mvd, index) => (
                  <div key={index} className="bg-gray-50 text-gray-700 px-4 py-2 rounded-lg border border-gray-200 flex justify-between items-center text-sm">
                    <span><b>{mvd.lhs.join(", ")}</b> ↠ <b>{mvd.rhs.join(", ")}</b></span>
                    <button onClick={() => handleRemoveMvd(index)} className="text-red-500 hover:text-red-700"><i className="fas fa-times"></i></button>
                  </div>
                ))}
              </div>
            </div>

            {/* 6. Join Dependencies (5NF) */}
            <div className="pt-4 border-t border-gray-100">
              <label className="block text-sm font-bold text-blue-900 mb-2">Join Dependencies (5NF)</label>
              <div className="flex items-center gap-2 mb-3">
                <input
                  type="text"
                  value={newJdInput}
                  onChange={(e) => setNewJdInput(e.target.value)}
                  className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
                  placeholder="Format: A,B; B,C"
                />
                <button
                  type="button"
                  onClick={handleAddJd}
                  className="px-5 py-3 rounded-xl text-white bg-blue-600 hover:bg-blue-700 flex items-center justify-center transition shadow-md"
                >
                  <i className="fas fa-plus"></i>
                </button>
              </div>
              <div className="flex flex-col gap-2">
                {jds.map((jd, index) => (
                  <div key={index} className="bg-gray-50 text-gray-700 px-4 py-2 rounded-lg border border-gray-200 flex justify-between items-center text-sm">
                    <span>JD: {jd.map(g => `(${g.join(",")})`).join(" ⋈ ")}</span>
                    <button onClick={() => handleRemoveJd(index)} className="text-red-500 hover:text-red-700"><i className="fas fa-times"></i></button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side: Attractive Image & Decoration */}
          <div className="hidden lg:flex flex-col items-center justify-start relative h-full min-h-[600px] sticky top-24 pt-12">
             {/* Decorative Background Blob */}
            <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120%] h-[60%] bg-gradient-to-br from-blue-200 to-purple-200 rounded-full filter blur-3xl opacity-40 animate-pulse"></div>
            
            {/* Main Image */}
            <img
              src="https://img.freepik.com/free-vector/data-extraction-concept-illustration_114360-4876.jpg" 
              alt="Data Structure Illustration"
              className="relative rounded-2xl shadow-2xl border-4 border-white transform hover:scale-105 transition duration-500 z-10 w-full max-w-md"
            />
            
            {/* Pro Tip Card - Now cleanly below the image */}
            <div className="mt-8 bg-white p-5 rounded-xl shadow-lg border border-gray-100 z-20 w-full max-w-md relative">
              <div className="flex items-start gap-4">
                <div className="bg-yellow-100 p-3 rounded-xl text-yellow-600 shadow-sm">
                  <i className="fas fa-lightbulb text-xl"></i>
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-bold uppercase mb-1 tracking-wider">Pro Tip</p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    For <strong>5NF</strong>, ensure your Join Dependencies cover all attributes. Missing attributes result in a "Lossy Decomposition."
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}