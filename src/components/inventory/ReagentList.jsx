import React from 'react';

const ReagentList = () => (
  <div>
    <h1 className="text-2xl font-bold mb-4">Reagent List</h1>
    <div className="bg-white rounded shadow p-4">
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Reagent Name</th>
            <th className="px-4 py-2">Batch Number</th>
            <th className="px-4 py-2">Expiry Date</th>
            <th className="px-4 py-2">Stock</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Example row */}
          <tr>
            <td className="px-4 py-2">Reagent A</td>
            <td className="px-4 py-2">B12345</td>
            <td className="px-4 py-2">2026-06-01</td>
            <td className="px-4 py-2">20</td>
            <td className="px-4 py-2">
              <button className="text-blue-600 hover:underline mr-2">Edit</button>
              <button className="text-red-600 hover:underline">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

export default ReagentList;
