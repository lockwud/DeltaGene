import React from 'react';

const AccessionForm = () => (
  <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
    <h2 className="text-xl font-bold mb-4">Accession Sample</h2>
    <form className="space-y-4">
      <div>
        <label className="block mb-1 font-medium">Order ID</label>
        <input type="text" className="w-full px-3 py-2 border rounded" required />
      </div>
      <div>
        <label className="block mb-1 font-medium">Barcode</label>
        <input type="text" className="w-full px-3 py-2 border rounded" required />
      </div>
      <div>
        <label className="block mb-1 font-medium">Status</label>
        <select className="w-full px-3 py-2 border rounded" required>
          <option value="received">Received</option>
          <option value="processing">Processing</option>
          <option value="completed">Completed</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>
      <button type="submit" className="w-full py-2 font-semibold text-white bg-blue-600 rounded hover:bg-blue-700">Log Sample</button>
    </form>
  </div>
);

export default AccessionForm;
