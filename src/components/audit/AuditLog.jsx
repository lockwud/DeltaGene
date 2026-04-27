import React from 'react';

const AuditLog = () => (
  <div>
    <h1 className="text-2xl font-bold mb-4">Audit Log</h1>
    <div className="bg-white rounded shadow p-4">
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">User</th>
            <th className="px-4 py-2">Action</th>
            <th className="px-4 py-2">Module</th>
            <th className="px-4 py-2">Details</th>
          </tr>
        </thead>
        <tbody>
          {/* Example row */}
          <tr>
            <td className="px-4 py-2">2026-04-25</td>
            <td className="px-4 py-2">Jane Smith</td>
            <td className="px-4 py-2">Created</td>
            <td className="px-4 py-2">Patient</td>
            <td className="px-4 py-2">Registered new patient John Doe</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

export default AuditLog;
