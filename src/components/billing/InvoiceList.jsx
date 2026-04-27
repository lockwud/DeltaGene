import React from 'react';

const InvoiceList = () => (
  <div>
    <h1 className="text-2xl font-bold mb-4">Invoices</h1>
    <div className="bg-white rounded shadow p-4">
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Invoice ID</th>
            <th className="px-4 py-2">Patient</th>
            <th className="px-4 py-2">Amount</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Example row */}
          <tr>
            <td className="px-4 py-2">INV1001</td>
            <td className="px-4 py-2">John Doe</td>
            <td className="px-4 py-2">$120</td>
            <td className="px-4 py-2">Paid</td>
            <td className="px-4 py-2">2026-04-25</td>
            <td className="px-4 py-2">
              <button className="text-blue-600 hover:underline mr-2">View</button>
              <button className="text-green-600 hover:underline">Print</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

export default InvoiceList;
