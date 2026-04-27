'use client';

import React from 'react';
import Link from 'next/link';
import { COLORS } from '@/lib/colors';

type SettingItem = {
  id: string;
  label: string;
  href: string;
  icon?: string;
};

type Section = {
  id: string;
  title: string;
  items: SettingItem[];
};

const sections: Section[] = [
  {
    id: 'general',
    title: 'General Settings',
    items: [
      { id: 'configurations', label: 'System Configuration', href: '/system/settings/configurations', icon: 'settings' },
      { id: 'code-rules', label: 'Code & Identifier Rules', href: '/system/settings/code-settings', icon: 'code' },
      { id: 'templates', label: 'Report Templates', href: '/system/settings/templates', icon: 'description' },
      { id: 'alerts', label: 'Alerts & Notifications', href: '/system/settings/alerts', icon: 'notifications_active' },
    ],
  },

  {
    id: 'patient-orders',
    title: 'Patient & Orders',
    items: [
      { id: 'patient-matching', label: 'Patient Matching', href: '/system/settings/patient-matching', icon: 'person_search' },
      { id: 'order-sets', label: 'Order Sets / Panels', href: '/system/settings/order-sets', icon: 'view_list' },
      { id: 'cpoe', label: 'CPOE Settings', href: '/system/settings/cpoe', icon: 'playlist_add_check' },
      { id: 'order-rejections', label: 'Order Rejection Reasons', href: '/system/settings/order-rejections', icon: 'report_off' },
    ],
  },

  {
    id: 'sample',
    title: 'Sample Management',
    items: [
      { id: 'accessioning', label: 'Accessioning Rules', href: '/system/settings/accessioning', icon: 'qr_code' },
      { id: 'specimen-types', label: 'Specimen Types', href: '/system/settings/specimen-types', icon: 'biotech' },
      { id: 'collection', label: 'Collection & Transport', href: '/system/settings/collection', icon: 'local_shipping' },
      { id: 'barcodes', label: 'Barcode & Labeling', href: '/system/settings/barcodes', icon: 'qr_code_scanner' },
    ],
  },

  {
    id: 'tests',
    title: 'Test Catalog & Methods',
    items: [
      { id: 'tests', label: 'Tests & Panels', href: '/system/settings/tests', icon: 'science' },
      { id: 'methods', label: 'Methods & Reference Ranges', href: '/system/settings/methods', icon: 'science' },
      { id: 'units', label: 'Units of Measure', href: '/system/settings/unit-of-measure', icon: 'straighten' },
    ],
  },

  {
    id: 'instruments',
    title: 'Instruments & QC',
    items: [
      { id: 'instruments', label: 'Instrument Inventory', href: '/system/settings/instruments', icon: 'precision_manufacturing' },
      { id: 'calibration', label: 'Calibration & Maintenance', href: '/system/settings/calibration', icon: 'build' },
      { id: 'qc-rules', label: 'QC Rules & Controls', href: '/system/settings/qc-rules', icon: 'analytics' },
    ],
  },

  {
    id: 'results',
    title: 'Results & Reporting',
    items: [
      { id: 'validation', label: 'Result Entry & Validation', href: '/system/settings/validation', icon: 'task_alt' },
      { id: 'reporting', label: 'Report Configuration', href: '/system/settings/reporting', icon: 'print' },
      { id: 'interpretation', label: 'Interpretive Comments', href: '/system/settings/interpretation', icon: 'forum' },
      { id: 'tat', label: 'TAT Rules', href: '/system/settings/tat', icon: 'timer' },
    ],
  },

  {
    id: 'quality',
    title: 'Quality & Training',
    items: [
      { id: 'qa-events', label: 'QA Events', href: '/system/settings/qa-events', icon: 'fact_check' },
      { id: 'proficiency', label: 'Proficiency Testing', href: '/system/settings/proficiency', icon: 'emoji_events' },
      { id: 'training', label: 'Training', href: '/system/settings/training', icon: 'school' },
      { id: 'esign', label: 'e-Signatures', href: '/system/settings/esignatures', icon: 'edit' },
    ],
  },
];

// Per-section icon mapping — used for the section header to reflect the module
const sectionIcons: Record<string, string> = {
  general: 'tune',
  'patient-orders': 'groups',
  sample: 'qr_code_scanner',
  tests: 'science',
  instruments: 'precision_manufacturing',
  results: 'task_alt',
  quality: 'fact_check',
};

const SettingCard: React.FC<{ item: SettingItem }> = ({ item }) => {
  const iconColor = (COLORS && COLORS.text) || '#111827';

  return (
    <Link href={item.href} className="block" aria-label={item.label}>
      <div
        className="flex items-center gap-3 px-6 py-3 rounded-full border bg-white hover:shadow-sm transition-shadow transition-colors"
        style={{ borderColor: '#e6e9f2' }}
      >
        <div className="flex items-center justify-center w-8 h-8 rounded-md bg-gray-50" aria-hidden>
          <span className="material-icons" style={{ color: iconColor, fontSize: 16 }}>
            {item.icon ?? 'tune'}
          </span>
        </div>

        <div className="flex-1">
          <div className="text-sm font-medium text-gray-800">{item.label}</div>
        </div>
      </div>
    </Link>
  );
};

const SystemSettings: React.FC = () => {
  // use active color for main module (section) icons; fallback to primary or a sensible blue
  const sectionIconColor = (COLORS && (COLORS.activeBg ?? COLORS.primary)) || '#0B67B7';
  const itemIconColor = (COLORS && COLORS.text) || '#111827';

  return (
    // Move page content slightly upward: smaller top padding
    <div className="pt-4 pb-8 w-full">
      <div className="w-full px-6">
        <header className="mb-4">
          <h1 className="text-3xl font-semibold" style={{ color: '#111827' }}>
            System Settings
          </h1>
        </header>

        <main className="space-y-8">
          {sections.map((section) => (
            <section key={section.id} aria-labelledby={`section-${section.id}`} className="space-y-3">
              <div className="flex items-center gap-3">
                <span
                  className="material-icons text-base"
                  style={{ color: sectionIconColor }}
                  aria-hidden
                >
                  {sectionIcons[section.id] ?? 'settings'}
                </span>
                <h2 id={`section-${section.id}`} className="text-sm font-medium text-gray-700">
                  {section.title}
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-3">
                {section.items.map((item) => (
                  <Link href={item.href} key={item.id} className="block" aria-label={item.label}>
                    <div
                      className="flex items-center gap-3 px-6 py-3 rounded-full border bg-white hover:shadow-sm transition-shadow transition-colors"
                      style={{ borderColor: '#e6e9f2' }}
                    >
                      <div className="flex items-center justify-center w-8 h-8 rounded-md bg-gray-50" aria-hidden>
                        <span className="material-icons" style={{ color: itemIconColor, fontSize: 16 }}>
                          {item.icon ?? 'tune'}
                        </span>
                      </div>

                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-800">{item.label}</div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </main>
      </div>
    </div>
  );
};

export default SystemSettings;