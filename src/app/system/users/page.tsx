"use client";

import React, { useState } from "react";

const geist = {
  fontFamily: 'Geist, Inter, Arial, sans-serif',
};

const PRIMARY = "#c1004a";
const SIDEBAR_BG = "#fff";
const SIDEBAR_ACTIVE = PRIMARY;
const TEXT_DARK = "#222";
const BORDER = "#e5e7eb";

const customers = [
  { id: 1, name: "International Trade", address: "AS-987", email: "it@kumateck.com", phone: "0202468795" },
  { id: 2, name: "Acme Corp", address: "AC-123", email: "acme@corp.com", phone: "0201234567" },
];

export default function UsersPage() {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div className="p-8" style={geist}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold" style={{color: PRIMARY}}>Customer Management</h1>
          <div className="text-gray-500 text-sm mt-1">Manage all your customers in one place.</div>
        </div>
        <button
          className="flex items-center gap-2 px-4 py-2 rounded bg-[#fff] border border-[#c1004a] text-[#c1004a] font-semibold shadow hover:bg-[#c1004a] hover:text-white transition"
          onClick={() => setModalOpen(true)}
        >
          <span className="material-icons">add</span> Add Customer
        </button>
      </div>
      <div className="bg-white rounded-xl shadow border border-[#e5e7eb]">
        <table className="w-full text-left" style={{fontFamily: 'Geist, Inter, Arial, sans-serif'}}>
          <thead>
            <tr className="bg-[#f9f9fb] text-[#c1004a]">
              <th className="py-3 px-4 font-semibold">Customer Name</th>
              <th className="py-3 px-4 font-semibold">Address</th>
              <th className="py-3 px-4 font-semibold">Email</th>
              <th className="py-3 px-4 font-semibold">Phone Number</th>
              <th className="py-3 px-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c) => (
              <tr key={c.id} className="border-b border-[#f0f0f0] hover:bg-[#f7f7fa]">
                <td className="py-3 px-4 text-[#222]">{c.name}</td>
                <td className="py-3 px-4 text-[#222]">{c.address}</td>
                <td className="py-3 px-4 text-[#222]">{c.email}</td>
                <td className="py-3 px-4 text-[#222]">{c.phone}</td>
                <td className="py-3 px-4 text-right">
                  <button className="p-2 rounded-full hover:bg-[#f3e6ed] text-[#c1004a]">
                    <span className="material-icons">edit</span>
                  </button>
                  <button className="p-2 rounded-full hover:bg-[#f3e6ed] text-[#c1004a]">
                    <span className="material-icons">delete</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Modal placeholder for Add/Edit Customer */}
      {modalOpen && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-8 relative border border-[#e5e7eb]" style={geist}>
            <h2 className="text-lg font-bold mb-4 text-[#c1004a]">Add Customer</h2>
            <form className="space-y-4">
              <div>
                <label className="block mb-1 font-medium">Customer Name <span className="text-red-500">*</span></label>
                <input className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#c1004a]" placeholder="Enter customer name" />
              </div>
              <div>
                <label className="block mb-1 font-medium">Address <span className="text-red-500">*</span></label>
                <input className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#c1004a]" placeholder="Enter address" />
              </div>
              <div>
                <label className="block mb-1 font-medium">Email <span className="text-red-500">*</span></label>
                <input className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#c1004a]" placeholder="Enter email" />
              </div>
              <div>
                <label className="block mb-1 font-medium">Phone Number <span className="text-red-500">*</span></label>
                <input className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#c1004a]" placeholder="Enter phone number" />
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <button type="button" className="px-4 py-2 rounded border" onClick={() => setModalOpen(false)}>Cancel</button>
                <button type="submit" className="px-5 py-2 rounded bg-[#c1004a] text-white font-semibold shadow hover:bg-[#a0003a]">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
