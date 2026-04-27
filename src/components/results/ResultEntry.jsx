import React from 'react';

const ResultEntry = () => (
  <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
    <h2 className="text-xl font-bold mb-4">Result Entry</h2>
    <form className="space-y-4">
      <div>
        <label className="block mb-1 font-medium">Sample ID</label>
        <input type="text" className="w-full px-3 py-2 border rounded" required />
      </div>
      <div>
        <label className="block mb-1 font-medium">Test</label>
        <input type="text" className="w-full px-3 py-2 border rounded" required />
      </div>
      <div>
        <label className="block mb-1 font-medium">Result Value</label>
        <input type="text" className="w-full px-3 py-2 border rounded" required />
      </div>
      <div>
        <label className="block mb-1 font-medium">Reference Range</label>
        <input type="text" className="w-full px-3 py-2 border rounded" />
      </div>
      <div>
        <label className="block mb-1 font-medium">Units</label>
        <input type="text" className="w-full px-3 py-2 border rounded" />
      </div>
      <div>
        <label className="block mb-1 font-medium">Attach File</label>
        <input type="file" className="w-full" />
      </div>
      <button type="submit" className="w-full py-2 font-semibold text-white bg-blue-600 rounded hover:bg-blue-700">Submit Result</button>
    </form>
  </div>
);

export default ResultEntry;
