import React from 'react';

const ResultRelease = () => (
  <div>
    <h1 className="text-2xl font-bold mb-4">Result Release</h1>
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
            <td className="px-4 py-2">Validated</td>
            <td className="px-4 py-2">
              <button className="text-blue-600 hover:underline">Release</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

export default ResultRelease;
