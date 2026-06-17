import React, { useState } from 'react';

export default function FileUploadSection({ onFileSelect }) {
  const [fileName, setFileName] = useState("");
  const [previewData, setPreviewData] = useState([]);
  const [headers, setHeaders] = useState([]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      onFileSelect(file); // Pass file to parent (App.jsx)
      parseCSVPreview(file);
    }
  };

  // Simple local CSV parser for "Instant Preview"
  const parseCSVPreview = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      const lines = text.split('\n').map(line => line.trim()).filter(line => line);
      
      if (lines.length > 0) {
        // Extract Headers (Row 1)
        const headerRow = lines[0].split(',').map(h => h.trim());
        setHeaders(headerRow);

        // Extract First 5 Rows of Data
        const previewRows = lines.slice(1, 6).map(line => {
           const values = line.split(',');
           // Map values to headers to create an object
           const rowObj = {};
           headerRow.forEach((header, index) => {
             rowObj[header] = values[index] ? values[index].trim() : "";
           });
           return rowObj;
        });
        setPreviewData(previewRows);
      }
    };
    reader.readAsText(file);
  };

  return (
    <section className="py-8 bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Upload Table Data (Optional)
        </h3>

        {/* File Input Area */}
        <div className="max-w-xl mx-auto mb-8">
          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-blue-300 rounded-xl cursor-pointer bg-blue-50 hover:bg-blue-100 transition">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <i className="fas fa-cloud-upload-alt text-3xl text-blue-500 mb-2"></i>
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">Click to upload CSV</span> or drag and drop
              </p>
              <p className="text-xs text-gray-400">CSV files only</p>
            </div>
            <input 
              type="file" 
              className="hidden" 
              accept=".csv"
              onChange={handleFileChange} 
            />
          </label>
          {fileName && (
            <p className="text-center mt-2 text-green-600 font-medium">
              Selected: {fileName}
            </p>
          )}
        </div>

        {/* Data Preview Table */}
        {previewData.length > 0 && (
          <div className="max-w-4xl mx-auto overflow-x-auto shadow-md rounded-lg">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                <tr>
                  {headers.map((h, i) => (
                    <th key={i} className="px-6 py-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {previewData.map((row, i) => (
                  <tr key={i} className="bg-white border-b hover:bg-gray-50">
                    {headers.map((h, j) => (
                      <td key={j} className="px-6 py-4">{row[h]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="text-center text-xs text-gray-400 mt-2">
              (Preview showing first 5 rows)
            </p>
          </div>
        )}
      </div>
    </section>
  );
}