"use client";

import React, { useState } from "react";

const geist = {
  fontFamily: 'Geist, Inter, Arial, sans-serif',
};
const PRIMARY = "#c1004a";
const BORDER = "#e5e7eb";

const testRequests: any[] = [];

export default function ResultsPage() {
  const [activeTab, setActiveTab] = useState("Sampled");
  return (
    <div className="p-8" style={geist}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold" style={{color: PRIMARY}}>Analytical Test Requests</h1>
          <div className="text-gray-500 text-sm mt-1">All test requests for quality control and assurance.</div>
        </div>
        <div className="flex gap-2">
          {["Sampled", "Acknowledged", "Assigned", "Under Test", "Test Taken", "Released"].map(tab => (
            <button
              key={tab}
              className={`px-4 py-1 rounded-full border text-sm font-semibold transition ${activeTab === tab ? 'bg-[#c1004a] text-white border-[#c1004a]' : 'bg-white text-[#c1004a] border-[#c1004a] hover:bg-[#fbeaf2]'}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      <div className="bg-white rounded-xl shadow border border-[#e5e7eb]">
        <table className="w-full text-left" style={{fontFamily: 'Geist, Inter, Arial, sans-serif'}}>
          <thead>
            <tr className="bg-[#c1004a] text-white">
              <th className="py-3 px-4 font-semibold">Schedule Code</th>
              <th className="py-3 px-4 font-semibold">Product</th>
              <th className="py-3 px-4 font-semibold">Batch #</th>
              <th className="py-3 px-4 font-semibold">Prepared On</th>
              <th className="py-3 px-4 font-semibold">Prepared By</th>
              <th className="py-3 px-4 font-semibold">Product Lifespan</th>
              <th className="py-3 px-4 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {testRequests.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-16 text-center text-gray-400">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <span className="material-icons text-5xl text-[#c1004a]">insert_drive_file</span>
                    <div className="font-semibold">No data found</div>
                    <div className="text-xs text-gray-400">There are no results to display at this time</div>
                  </div>
                </td>
              </tr>
            ) : (
              testRequests.map((row) => (
                <tr key={row.id} className="border-b border-[#f0f0f0] hover:bg-[#f7f7fa]">
                  <td className="py-3 px-4">{row.scheduleCode}</td>
                  <td className="py-3 px-4">{row.product}</td>
                  <td className="py-3 px-4">{row.batch}</td>
                  <td className="py-3 px-4">{row.preparedOn}</td>
                  <td className="py-3 px-4">{row.preparedBy}</td>
                  <td className="py-3 px-4">{row.lifespan}</td>
                  <td className="py-3 px-4">{row.status}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <div className="flex items-center justify-between px-4 py-3 border-t border-[#e5e7eb] bg-[#fafbfc]">
          <div className="text-sm text-gray-500">Showing 0 to 0 of 0</div>
          <div className="flex gap-2">
            <button className="w-8 h-8 flex items-center justify-center rounded-full border border-[#c1004a] text-[#c1004a] font-bold">1</button>
          </div>
        </div>
      </div>
    </div>
  );
}
