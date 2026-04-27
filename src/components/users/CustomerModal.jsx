"use client";

import React, { useState } from "react";

export default function CustomerModal({ open, onClose }) {
  const [form, setForm] = useState({ name: "", address: "", email: "", phone: "" });
  const [error, setError] = useState({});

  if (!open) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let err = {};
    if (!form.name) err.name = "Customer name is required";
    if (!form.address) err.address = "Address is required";
    if (!form.email) err.email = "Email is required";
    if (!form.phone) err.phone = "Phone number is required";
    setError(err);
    if (Object.keys(err).length === 0) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-8 relative">
        <h2 className="text-lg font-bold mb-4 text-[#1a237e]">Create Customer</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1 font-medium">Customer Name <span className="text-red-500">*</span></label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
              placeholder="Enter customer name"
            />
            {error.name && <div className="text-red-500 text-sm mt-1">{error.name}</div>}
          </div>
          <div>
            <label className="block mb-1 font-medium">Address <span className="text-red-500">*</span></label>
            <input
              name="address"
              value={form.address}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
              placeholder="Enter address"
            />
            {error.address && <div className="text-red-500 text-sm mt-1">{error.address}</div>}
          </div>
          <div>
            <label className="block mb-1 font-medium">Email <span className="text-red-500">*</span></label>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
              placeholder="Enter email"
            />
            {error.email && <div className="text-red-500 text-sm mt-1">{error.email}</div>}
          </div>
          <div>
            <label className="block mb-1 font-medium">Phone Number <span className="text-red-500">*</span></label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
              placeholder="Enter phone number"
            />
            {error.phone && <div className="text-red-500 text-sm mt-1">{error.phone}</div>}
          </div>
          <div className="flex justify-end gap-2 mt-6">
            <button type="button" className="px-4 py-2 rounded border" onClick={onClose}>Cancel</button>
            <button type="submit" className="px-5 py-2 rounded bg-[#1a237e] text-white font-semibold shadow hover:bg-blue-900">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}
