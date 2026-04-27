import React from 'react';

const StockMovement = () => (
  <div>
    <h1 className="text-2xl font-bold mb-4">Stock Movement</h1>
    <div className="bg-white rounded shadow p-4">
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Reagent</th>
            <th className="px-4 py-2">Type</th>
            <th className="px-4 py-2">Quantity</th>
            <th className="px-4 py-2">Remarks</th>
          </tr>
        </thead>
        <tbody>
          {/* Example row */}
          <tr>
            <td className="px-4 py-2">2026-04-25</td>
            <td className="px-4 py-2">Reagent A</td>
            <td className="px-4 py-2">Used</td>
            <td className="px-4 py-2">2</td>
            <td className="px-4 py-2">Routine test</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

export default StockMovement;
