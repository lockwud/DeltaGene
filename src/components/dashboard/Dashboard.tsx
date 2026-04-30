'use client';

import React from 'react';
import Link from 'next/link';
import { COLORS } from '@/lib/colors';

type DashboardItem = {
  id: string;
  label: string;
  path: string;
  icon?: string;
  description?: string;
};

const sections: { items: DashboardItem[] }[] = [
  {
    items: [
      { id: 'hr', label: 'HR', path: '/system/dashboard/hr', icon: 'person_add', description: 'Staffing & training' },
      { id: 'qc', label: 'QC', path: '/dashboards/qc', icon: 'science', description: 'Quality control metrics' },
      { id: 'qa', label: 'QA', path: '/dashboards/qa', icon: 'fact_check', description: 'Quality assurance events' },
      { id: 'warehouse', label: 'Warehouse', path: '/dashboards/warehouse', icon: 'inventory_2', description: 'Stock & storage KPIs' },
      { id: 'finance', label: 'Finance', path: '/dashboards/finance', icon: 'payment', description: 'Billing & revenue' },
    ],
  },
];

const DashboardPage: React.FC = () => {
  const activeBg = (COLORS && (COLORS.activeBg ?? COLORS.primary)) || '#2563EB';

  return (
    // Reduced top padding so header + grids sit higher on the page
    <div className="pt-2 px-6 pb-6">
      {/* Header: "Welcome" and username (username uses the same blue as the UI) */}
      <h1 className="text-2xl font-semibold mb-1" style={{ color: '#2c3e50' }}>
        <span className="mr-2">Welcome</span>
        <span style={{ color: activeBg }}>Hope Kweku AbeiKu</span>
      </h1>

      {/* Shorter intro spacing so grids appear closer */}
      <p className="text-sm text-gray-600 mb-4">Choose a dashboard to view detailed analytics and KPIs.</p>

      {sections.map((section, sectionIndex) => (
        <section key={sectionIndex} className="mb-6">
          {/* No section title in this simplified layout */}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {section.items.map((d) => (
              <Link
                key={d.id}
                href={d.path}
                className="block bg-white border rounded-lg hover:shadow-md transition-colors duration-150"
                style={{ borderColor: '#e6e9f2' }}
              >
                <div className="p-3 flex items-start gap-3">
                  <span className="material-icons text-2xl" style={{ color: activeBg }} aria-hidden>
                    {d.icon ?? 'dashboard'}
                  </span>

                  <div className="flex-1">
                    <h3 className="font-semibold text-sm" style={{ color: '#111827' }}>{d.label}</h3>
                    {d.description && <p className="text-xs text-gray-500 mt-1">{d.description}</p>}
                  </div>
                </div>

                <div className="px-3 pb-3 text-xs text-gray-400">View details</div>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default DashboardPage;