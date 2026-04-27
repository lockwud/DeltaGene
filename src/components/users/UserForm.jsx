import React from 'react';

const UserForm = () => (
  <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
    <h2 className="text-xl font-bold mb-4">Add/Edit User</h2>
    <form className="space-y-4">
      <div>
        <label className="block mb-1 font-medium">Name</label>
        <input type="text" className="w-full px-3 py-2 border rounded" required />
      </div>
      <div>
        <label className="block mb-1 font-medium">Email</label>
        <input type="email" className="w-full px-3 py-2 border rounded" required />
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
      <div>
        <label className="block mb-1 font-medium">Status</label>
        <select className="w-full px-3 py-2 border rounded" required>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
      <button type="submit" className="w-full py-2 font-semibold text-white bg-blue-600 rounded hover:bg-blue-700">Save User</button>
    </form>
  </div>
);

export default UserForm;
