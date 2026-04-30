'use client';

import React from 'react';

const sample = [95, 100, 98, 97, 99, 96, 99]; // last 7 days

const AttendanceChart: React.FC<{ accent?: string }> = ({ accent = '#0B67B7' }) => {
  const max = Math.max(...sample, 100);
  return (
    <div className="flex items-end h-28 gap-2">
      {sample.map((v, i) => {
        const height = (v / max) * 100;
        return (
          <div key={i} className="flex-1 flex flex-col items-center">
            <div
              className="w-full rounded-md"
              style={{
                height: `${Math.max(6, height)}%`,
                background: accent,
                opacity: 0.95,
              }}
              title={`${v}%`}
            />
            <div className="text-[11px] text-gray-500 mt-2">{['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][i]}</div>
          </div>
        );
      })}
    </div>
  );
};

export default AttendanceChart;