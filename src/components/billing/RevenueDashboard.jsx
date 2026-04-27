import React from 'react';

const RevenueDashboard = () => (
  <div>
    <h1 className="text-2xl font-bold mb-4">Revenue Dashboard</h1>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="p-6 bg-white rounded shadow">
        <div className="text-gray-500">Total Revenue</div>
        <div className="text-3xl font-bold">$12,340</div>
      </div>
      <div className="p-6 bg-white rounded shadow">
        <div className="text-gray-500">Outstanding Invoices</div>
        <div className="text-3xl font-bold">$2,100</div>
      </div>
      <div className="p-6 bg-white rounded shadow">
        <div className="text-gray-500">Invoices (This Month)</div>
        <div className="text-3xl font-bold">$3,400</div>
      </div>
    </div>
  </div>
);

export default RevenueDashboard;
