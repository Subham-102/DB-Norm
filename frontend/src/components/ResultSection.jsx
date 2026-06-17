import React from 'react';
import JSZip from 'jszip'; // Import the new library

export default function ResultSection({ result }) {
  if (!result) return null;

  // --- HELPER: Convert a single table object to a CSV string ---
  const convertToCSV = (table) => {
    // 1. Extract Headers
    const headers = Array.from(table.columns);
    
    // 2. Format Rows
    const csvRows = [
      headers.join(','), // Header Row
      ...table.rows.map(row => 
        headers.map(fieldName => {
          const val = row[fieldName] || "";
          // Escape quotes if necessary (Standard CSV rule)
          return `"${val.replace(/"/g, '""')}"`;
        }).join(',')
      )
    ];
    return csvRows.join('\n');
  };

  // --- FUNCTION 1: Download Single CSV ---
  const downloadSingleCSV = (table) => {
    const csvString = convertToCSV(table);
    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', `${table.tableName}.csv`);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // --- FUNCTION 2: Download All as ZIP ---
  const downloadAllZip = async () => {
    const zip = new JSZip();

    // Loop through all tables and add them to the zip
    result.tables.forEach((table) => {
      const csvString = convertToCSV(table);
      zip.file(`${table.tableName}.csv`, csvString);
    });

    // Generate the zip file asynchronously
    const content = await zip.generateAsync({ type: "blob" });
    
    // Trigger the download
    const url = window.URL.createObjectURL(content);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', `normalized_schema_${result.target}.zip`);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // --- RENDERER 1: DATA MODE (Real Tables) ---
  const renderDataResult = () => {
    return (
      <div className="space-y-8">
        {/* Header Section with ZIP Button */}
        <div className="text-center mb-8 relative">
          <h3 className="text-2xl font-bold text-gray-800">
            Normalization Result (with Data)
          </h3>
          <p className="text-gray-600 mb-4">
            Target: <span className="font-bold text-purple-600">{result.target}</span>
          </p>
          
          <button
            onClick={downloadAllZip}
            className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-xl shadow-md hover:bg-purple-700 transition flex items-center gap-2 mx-auto"
          >
            <i className="fas fa-file-archive"></i> Download All as ZIP
          </button>
        </div>

        {/* Tables Grid */}
        <div className="grid gap-8">
          {result.tables.map((table, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
              {/* Table Header / Toolbar */}
              <div className="bg-gray-50 px-6 py-4 flex justify-between items-center border-b border-gray-200">
                <div>
                  <h4 className="text-lg font-bold text-gray-800">{table.tableName}</h4>
                  <span className="text-sm text-gray-500">
                    Columns: {Array.from(table.columns).join(", ")}
                  </span>
                </div>
                <button
                  onClick={() => downloadSingleCSV(table)}
                  className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition flex items-center gap-2"
                >
                  <i className="fas fa-download"></i> CSV
                </button>
              </div>

              {/* Data Grid */}
              <div className="overflow-x-auto max-h-64">
                <table className="w-full text-sm text-left text-gray-500">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-100 sticky top-0">
                    <tr>
                      {Array.from(table.columns).map((col) => (
                        <th key={col} className="px-6 py-3 border-b">{col}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {table.rows.map((row, rIdx) => (
                      <tr key={rIdx} className="bg-white border-b hover:bg-gray-50">
                        {Array.from(table.columns).map((col) => (
                          <td key={col} className="px-6 py-3 whitespace-nowrap">
                            {row[col]}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
                {table.rows.length === 0 && (
                  <div className="p-8 text-center text-gray-400">
                    No data in this table projection.
                  </div>
                )}
              </div>
              <div className="bg-gray-50 px-6 py-2 text-xs text-gray-500 border-t border-gray-200">
                {table.rows.length} rows
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // --- RENDERER 2: SCHEMA MODE (Text Only) ---
  const renderSchemaResult = () => {
    // Check if it's a "Detect" result or "Normalize" result
    const isDetection = result.highestNormalForm !== undefined;

    return (
      <div className="max-w-4xl mx-auto">
        {isDetection ? (
          // --- Detection Result ---
          <div className="text-center space-y-6">
            <h3 className="text-2xl font-bold text-gray-800">Analysis Report</h3>
            <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100 inline-block">
              <span className="text-gray-600 block mb-2">Highest Normal Form</span>
              <span className="text-4xl font-extrabold text-blue-600">
                {result.highestNormalForm}
              </span>
            </div>
            
            {result.candidateKeys && (
               <div className="mt-4">
                 <h4 className="font-semibold text-gray-700">Candidate Keys:</h4>
                 <div className="flex flex-wrap justify-center gap-2 mt-2">
                   {result.candidateKeys.map((key, i) => (
                     <span key={i} className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-mono">
                       ({key.join(', ')})
                     </span>
                   ))}
                 </div>
               </div>
            )}

            {result.reasons && result.reasons.length > 0 && (
              <div className="mt-8 text-left bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <i className="fas fa-exclamation-triangle text-orange-500"></i> Violations Found
                </h4>
                <ul className="space-y-2">
                  {result.reasons.map((reason, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-gray-600">
                      <span className="mt-1.5 w-1.5 h-1.5 bg-orange-500 rounded-full flex-shrink-0"></span>
                      {reason}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ) : (
          // --- Normalization Result (Schema) ---
          <div>
            <div className="text-center mb-10">
              <h3 className="text-2xl font-bold text-purple-700">
                Normalization Result to {result.targetNormalForm}
              </h3>
            </div>

            {/* Notes / Logs */}
            {result.notes && result.notes.length > 0 && (
              <div className="mb-8 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
                <h4 className="font-bold text-yellow-800 mb-2">Process Log</h4>
                <ul className="list-disc list-inside text-sm text-yellow-700 space-y-1">
                  {result.notes.map((note, i) => (
                    <li key={i}>{note}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Decomposed Tables List */}
            <div className="grid gap-6">
              {result.decomposition.map((relation, idx) => (
                <div key={idx} className="bg-white p-6 rounded-xl shadow-md border-l-4 border-purple-500 hover:shadow-lg transition">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="text-xl font-bold text-gray-800">{relation.name}</h4>
                    <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-bold uppercase">
                      Table {idx + 1}
                    </span>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Attributes</span>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {Array.from(relation.attributes).map(attr => (
                          <span key={attr} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm font-mono border border-gray-200">
                            {attr}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {relation.fds && relation.fds.length > 0 && (
                       <div>
                         <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Dependencies</span>
                         <ul className="mt-1 space-y-1">
                           {relation.fds.map((fd, fIdx) => (
                             <li key={fIdx} className="text-sm text-gray-600 font-mono">
                               {Array.from(fd.lhs).join(', ')} → {Array.from(fd.rhs).join(', ')}
                             </li>
                           ))}
                         </ul>
                       </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <section id="result" className="py-16 bg-gray-50 min-h-[50vh]">
      <div className="container mx-auto px-4">
        {/* Switch Logic */}
        {result.type === 'DATA' ? renderDataResult() : renderSchemaResult()}
      </div>
    </section>
  );
}