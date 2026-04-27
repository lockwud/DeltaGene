import React from 'react';

const InventoryDashboard = () => (
  <div>
    <h1 className="text-2xl font-bold mb-4">Inventory Dashboard</h1>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="p-6 bg-white rounded shadow">
        <div className="text-gray-500">Test Kits in Stock</div>
        <div className="text-3xl font-bold">120</div>
      </div>
      <div className="p-6 bg-white rounded shadow">
        <div className="text-gray-500">Reagents Expiring Soon</div>
        <div className="text-3xl font-bold">3</div>
      </div>
      <div className="p-6 bg-white rounded shadow">
        <div className="text-gray-500">Low Stock Alerts</div>
        <div className="text-3xl font-bold">2</div>
      </div>
    </div>
  </div>
);

export default InventoryDashboard;
