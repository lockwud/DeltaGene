import React from 'react';

const ReportViewer = () => (
  <div className="max-w-2xl mx-auto bg-white p-8 rounded shadow">
    <h2 className="text-xl font-bold mb-4">Lab Report</h2>
    <div className="mb-4">
      <div className="font-medium">Patient: John Doe</div>
      <div className="text-gray-600">Report ID: REP1001</div>
      <div className="text-gray-600">Test: CBC</div>
      <div className="text-gray-600">Date: 2026-04-25</div>
    </div>
    <div className="mb-4">
      <div className="font-medium">Result:</div>
      <div className="text-2xl">12.5</div>
      <div className="text-gray-600">Reference Range: 10-15</div>
      <div className="text-gray-600">Units: g/dL</div>
    </div>
    <div className="flex space-x-4 mt-6">
      <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Print</button>
      <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Download PDF</button>
    </div>
  </div>
);

export default ReportViewer;
