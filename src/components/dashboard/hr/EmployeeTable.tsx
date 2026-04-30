'use client';

import React from 'react';
import { COLORS } from '@/lib/colors';

type Employee = {
  id: string;
  name: string;
  role: string;
  startDate: string;
  status: 'Active' | 'Casual' | 'Inactive';
};

const MOCK: Employee[] = [
  { id: 'E-1001', name: 'Jane Mensah', role: 'Medical Technologist', startDate: '2024-11-01', status: 'Active' },
  { id: 'E-1002', name: 'Kwame Adjei', role: 'Lab Assistant', startDate: '2024-09-20', status: 'Active' },
  { id: 'E-1003', name: 'Ama Boateng', role: 'Phlebotomist', startDate: '2024-08-14', status: 'Casual' },
];

const EmployeeTable: React.FC<{ accent?: string }> = ({ accent = (COLORS && (COLORS.activeBg ?? COLORS.primary)) || '#0B67B7' }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-xs text-gray-500">
            <th className="py-2 pr-4">Employee ID</th>
            <th className="py-2 pr-4">Name</th>
            <th className="py-2 pr-4">Role</th>
            <th className="py-2 pr-4">Start Date</th>
            <th className="py-2 pr-4">Status</th>
            <th className="py-2 pr-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {MOCK.map((e) => (
            <tr key={e.id} className="border-t" style={{ borderColor: '#f1f5f9' }}>
              <td className="py-3 pr-4">{e.id}</td>
              <td className="py-3 pr-4">{e.name}</td>
              <td className="py-3 pr-4">{e.role}</td>
              <td className="py-3 pr-4">{e.startDate}</td>
              <td className="py-3 pr-4">
                <span
                  className="px-2 py-1 rounded-full text-xs font-medium"
                  style={{
                    background: e.status === 'Active' ? `${accent}20` : '#f3f4f6',
                    color: e.status === 'Active' ? accent : '#374151',
                  }}
                >
                  {e.status}
                </span>
              </td>
              <td className="py-3 pr-4">
                <button className="text-sm" style={{ color: accent }}>View</button>
                <button className="text-sm text-gray-600 ml-3">Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;