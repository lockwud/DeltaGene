import React from 'react';

const RoleAssignment = () => (
  <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
    <h2 className="text-xl font-bold mb-4">Assign Role</h2>
    <form className="space-y-4">
      <div>
        <label className="block mb-1 font-medium">User</label>
        <input type="text" className="w-full px-3 py-2 border rounded" required />
      </div>
      <div>
        <label className="block mb-1 font-medium">Role</label>
        <select className="w-full px-3 py-2 border rounded" required>
          <option value="">Select Role</option>
          <option value="system_manager">System Manager</option>
          <option value="lab_tech">Lab Tech</option>
          <option value="accountant">Accountant</option>
        </select>
      </div>
      <button type="submit" className="w-full py-2 font-semibold text-white bg-blue-600 rounded hover:bg-blue-700">Assign Role</button>
    </form>
  </div>
);

export default RoleAssignment;
