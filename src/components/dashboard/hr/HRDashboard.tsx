'use client';

import React from 'react';
import { COLORS } from '@/lib/colors';
import HRStatCard from './HRStatCard';
import AttendanceChart from './AttendanceChart';
import EmployeeTable from './EmployeeTable';

const HRDashboard: React.FC = () => {
  const accent = (COLORS && (COLORS.activeBg ?? COLORS.primary)) || '#0B67B7';

  // sample KPI values (replace with API data)
  const stats = [
    { label: 'Total Employees', value: '1,416' },
    { label: 'Attendance Rate', value: '99%', meta: '+45% this quarter' },
    { label: 'Open Positions', value: '6' },
    { label: 'Pending Validations', value: '7' },
  ];

  return (
    <div className="pt-4 px-6 pb-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-semibold" style={{ color: COLORS.text }}>
            HR Dashboard
          </h1>
          <p className="text-sm text-gray-600">Overview of workforce, attendance and HR KPIs</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            className="px-3 py-1.5 rounded-md text-white font-medium"
            style={{ background: accent }}
          >
            Export
          </button>
        </div>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((s) => (
          <HRStatCard key={s.label} label={s.label} value={s.value} meta={s.meta} accent={accent} />
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl border p-4" style={{ borderColor: COLORS.border }}>
          <h3 className="text-sm font-medium mb-3">Attendance (last 7 days)</h3>
          <AttendanceChart accent={accent} />
        </div>

        <div className="bg-white rounded-xl border p-4 lg:col-span-2" style={{ borderColor: COLORS.border }}>
          <h3 className="text-sm font-medium mb-3">Staff Turnover Trend</h3>
          <div className="w-full h-40">
            <svg width="100%" height="100%" viewBox="0 0 600 160" preserveAspectRatio="none" className="block">
              <polyline
                fill="none"
                stroke={accent}
                strokeWidth="3"
                points="0,120 90,100 180,60 270,80 360,40 450,60 540,50 600,70"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Employee table */}
      <div className="bg-white rounded-xl border p-4" style={{ borderColor: COLORS.border }}>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium">Recent Employees</h3>
          <div className="text-sm text-gray-500">Showing the most recent 10 hires</div>
        </div>

        <EmployeeTable accent={accent} />
      </div>
    </div>
  );
};

export default HRDashboard;