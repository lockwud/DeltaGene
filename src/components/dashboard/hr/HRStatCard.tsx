'use client';

import React from 'react';
import { COLORS } from '@/lib/colors';

type Props = {
  label: string;
  value: string;
  meta?: string;
  accent?: string;
};

const HRStatCard: React.FC<Props> = ({ label, value, meta, accent }) => {
  const color = accent ?? (COLORS && (COLORS.activeBg ?? COLORS.primary));
  return (
    <div className="rounded-lg bg-white shadow-sm p-4 border" style={{ borderColor: COLORS.border }}>
      <div className="text-xs text-gray-600 font-medium mb-1">{label}</div>
      <div className="flex items-center gap-3">
        <div className="text-2xl font-bold" style={{ color }}>{value}</div>
        {meta && <div className="text-xs text-gray-500">{meta}</div>}
      </div>
    </div>
  );
};

export default HRStatCard;