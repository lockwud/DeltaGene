import React from 'react';

const OrderForm = () => (
  <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
    <h2 className="text-xl font-bold mb-4">Order Test</h2>
    <form className="space-y-4">
      <div>
        <label className="block mb-1 font-medium">Patient</label>
        <input type="text" className="w-full px-3 py-2 border rounded" placeholder="Search or enter patient" required />
      </div>
      <div>
        <label className="block mb-1 font-medium">Test</label>
        <select className="w-full px-3 py-2 border rounded" required>
          <option value="">Select Test</option>
          <option value="cbc">CBC</option>
          <option value="lft">Liver Function Test</option>
        </select>
      </div>
      <div>
        <label className="block mb-1 font-medium">Ordering Clinician</label>
        <input type="text" className="w-full px-3 py-2 border rounded" />
      </div>
      <div>
        <label className="block mb-1 font-medium">Priority</label>
        <select className="w-full px-3 py-2 border rounded">
          <option value="normal">Normal</option>
          <option value="urgent">Urgent</option>
        </select>
      </div>
      <div>
        <label className="block mb-1 font-medium">Notes</label>
        <textarea className="w-full px-3 py-2 border rounded" rows={2}></textarea>
      </div>
      <button type="submit" className="w-full py-2 font-semibold text-white bg-blue-600 rounded hover:bg-blue-700">Submit Order</button>
    </form>
  </div>
);

export default OrderForm;
