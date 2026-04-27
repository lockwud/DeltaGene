import React from 'react';

const InvoiceForm = () => (
  <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
    <h2 className="text-xl font-bold mb-4">Create Invoice</h2>
    <form className="space-y-4">
      <div>
        <label className="block mb-1 font-medium">Patient</label>
        <input type="text" className="w-full px-3 py-2 border rounded" required />
      </div>
      <div>
        <label className="block mb-1 font-medium">Amount</label>
        <input type="number" className="w-full px-3 py-2 border rounded" required />
      </div>
      <div>
        <label className="block mb-1 font-medium">Status</label>
        <select className="w-full px-3 py-2 border rounded" required>
          <option value="paid">Paid</option>
          <option value="unpaid">Unpaid</option>
          <option value="overdue">Overdue</option>
        </select>
      </div>
      <div>
        <label className="block mb-1 font-medium">Date</label>
        <input type="date" className="w-full px-3 py-2 border rounded" required />
      </div>
      <button type="submit" className="w-full py-2 font-semibold text-white bg-blue-600 rounded hover:bg-blue-700">Create Invoice</button>
    </form>
  </div>
);

export default InvoiceForm;
