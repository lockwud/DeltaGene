import React from 'react';

const UserList = () => (
  <div>
    <h1 className="text-2xl font-bold mb-4">User Management</h1>
    <div className="bg-white rounded shadow p-4">
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">User ID</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Role</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Example row */}
          <tr>
            <td className="px-4 py-2">U1001</td>
            <td className="px-4 py-2">Jane Smith</td>
            <td className="px-4 py-2">jane@example.com</td>
            <td className="px-4 py-2">Lab Tech</td>
            <td className="px-4 py-2">Active</td>
            <td className="px-4 py-2">
              <button className="text-blue-600 hover:underline mr-2">Edit</button>
              <button className="text-red-600 hover:underline">Deactivate</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

export default UserList;
