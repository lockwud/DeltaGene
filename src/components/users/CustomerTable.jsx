"use client";

import React, { useState } from "react";

const NAVY = "#1a237e";

const customers = [
  {
    id: 1,
    name: "International Trade",
    address: "AS-987",
    email: "it@kumateck.com",
    phone: "0202468795",
  },
];

export default function CustomerTable({ onOpenModal }) {
  const [menuOpen, setMenuOpen] = useState(null);
  return (
    <div className="bg-white rounded-xl shadow p-6 mt-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-[#1a237e]">Customers Management</h2>
        <button
          className="flex items-center gap-2 px-4 py-2 rounded bg-[#1a237e] text-white font-semibold shadow hover:bg-blue-900"
          onClick={onOpenModal}
        >
          <span className="material-icons">add</span> Create
        </button>
      </div>
      <table className="w-full text-left">
        <thead>
          <tr className="bg-[#1a237e] text-white">
            <th className="py-3 px-4 font-medium rounded-tl-xl">Customer Name</th>
            <th className="py-3 px-4 font-medium">Address</th>
            <th className="py-3 px-4 font-medium">Email</th>
            <th className="py-3 px-4 font-medium">Phone Number</th>
            <th className="py-3 px-4 font-medium text-right rounded-tr-xl">Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((c) => (
            <tr key={c.id} className="border-b hover:bg-blue-50">
              <td className="py-3 px-4">{c.name}</td>
              <td className="py-3 px-4">{c.address}</td>
              <td className="py-3 px-4">{c.email}</td>
              <td className="py-3 px-4">{c.phone}</td>
              <td className="py-3 px-4 text-right relative">
                <button
                  className="p-2 rounded-full hover:bg-blue-100 focus:outline-none"
                  onClick={() => setMenuOpen(menuOpen === c.id ? null : c.id)}
                  aria-label="Show actions"
                >
                  <svg width="24" height="24" fill={NAVY} viewBox="0 0 24 24">
                    <circle cx="5" cy="12" r="1.5" />
                    <circle cx="12" cy="12" r="1.5" />
                    <circle cx="19" cy="12" r="1.5" />
                  </svg>
                </button>
                {menuOpen === c.id && (
                  <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow z-10">
                    <button className="flex items-center gap-2 w-full px-4 py-2 text-[#1a237e] hover:bg-blue-50">
                      <span className="material-icons">edit</span> Edit
                    </button>
                    <button className="flex items-center gap-2 w-full px-4 py-2 text-[#1a237e] hover:bg-blue-50">
                      <span className="material-icons">delete</span> Delete
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination */}
      <div className="flex justify-end items-center mt-4 gap-2">
        <button className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-50 text-[#1a237e] font-bold">1</button>
        <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-blue-50 text-[#1a237e]">2</button>
        <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-blue-50 text-[#1a237e]">3</button>
        <span className="mx-2 text-gray-400">...</span>
        <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-blue-50 text-[#1a237e]">8</button>
      </div>
    </div>
  );
}
