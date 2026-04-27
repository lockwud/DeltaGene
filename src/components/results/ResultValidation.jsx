import React from 'react';

const ResultValidation = () => (
  <div>
    <h1 className="text-2xl font-bold mb-4">Result Validation</h1>
    <div className="bg-white rounded shadow p-4">
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Result ID</th>
            <th className="px-4 py-2">Sample ID</th>
            <th className="px-4 py-2">Test</th>
            <th className="px-4 py-2">Value</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Example row */}
          <tr>
            <td className="px-4 py-2">R1001</td>
            <td className="px-4 py-2">S1001</td>
            <td className="px-4 py-2">CBC</td>
            <td className="px-4 py-2">12.5</td>
            <td className="px-4 py-2">Pending</td>
            <td className="px-4 py-2">
              <button className="text-green-600 hover:underline mr-2">Validate</button>
              <button className="text-red-600 hover:underline">Reject</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

export default ResultValidation;
