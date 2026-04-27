import React from 'react';

const SampleList = () => (
  <div>
    <h1 className="text-2xl font-bold mb-4">Sample Accessioning</h1>
    <div className="bg-white rounded shadow p-4">
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Sample ID</th>
            <th className="px-4 py-2">Patient</th>
            <th className="px-4 py-2">Test</th>
            <th className="px-4 py-2">Barcode</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Example row */}
          <tr>
            <td className="px-4 py-2">S1001</td>
            <td className="px-4 py-2">John Doe</td>
            <td className="px-4 py-2">CBC</td>
            <td className="px-4 py-2">1234567890</td>
            <td className="px-4 py-2">Received</td>
            <td className="px-4 py-2">
              <button className="text-blue-600 hover:underline mr-2">View</button>
              <button className="text-green-600 hover:underline">Print Barcode</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

export default SampleList;
