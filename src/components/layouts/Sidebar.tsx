'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { COLORS } from '@/lib/colors';

type MenuItem = {
  label: string;
  path?: string;
  icon?: string;
  children?: MenuItem[];
  collapsible?: boolean;
};

const sidebarSections: { title?: string; items: MenuItem[] }[] = [
  {
    title: 'DASHBOARDS',
    items: [
      { label: 'Overview', path: '/system/dashboard', icon: 'dashboard', collapsible: false },
      { label: 'HR', path: '/dashboards/hr', icon: 'person_add', collapsible: false },
      { label: 'QC', path: '/dashboards/qc', icon: 'science', collapsible: false },
      { label: 'QA', path: '/dashboards/qa', icon: 'fact_check', collapsible: false },
      { label: 'Warehouse', path: '/dashboards/warehouse', icon: 'inventory_2', collapsible: false },
      { label: 'Finance', path: '/dashboards/finance', icon: 'payment', collapsible: false },
    ],
  },

  {
    title: 'PATIENT & ORDERS',
    items: [
      { label: 'Patient', path: '/patients', icon: 'groups', collapsible: false },
      { label: 'Test Ordering (CPOE)', path: '/orders', icon: 'playlist_add_check', collapsible: false },
      { label: 'Order Queue', path: '/orders/queue', icon: 'receipt_long', collapsible: false },
    ],
  },

  {
    title: 'SAMPLE MANAGEMENT',
    items: [
      {
        label: 'Accessioning',
        icon: 'qr_code_scanner',
        collapsible: true,
        children: [
          { label: 'New Accession', path: '/accession/new', icon: 'assignment' },
          { label: 'Barcode Print', path: '/accession/barcodes', icon: 'print' },
          { label: 'Storage & Retrieval', path: '/accession/storage', icon: 'inventory' },
        ],
      },
      { label: 'Specimen Rejections', path: '/specimens/rejections', icon: 'block', collapsible: false },
      { label: 'Sample Tracking', path: '/specimens/tracking', icon: 'local_shipping', collapsible: false },
    ],
  },

  {
    title: 'RESULTS & VALIDATION',
    items: [
      { label: 'Result Entry', path: '/results/entry', icon: 'keyboard_alt', collapsible: false },
      { label: 'Validation Queue', path: '/results/validation', icon: 'check_circle', collapsible: false },
      { label: 'Verified Reports', path: '/results/verified', icon: 'description', collapsible: false },
    ],
  },

  {
    title: 'QUALITY & COMPLIANCE',
    items: [
      { label: 'QC Runs', path: '/quality/qc', icon: 'analytics', collapsible: false },
      { label: 'QA Events', path: '/quality/qa', icon: 'fact_check', collapsible: false },
      { label: 'Proficiency', path: '/quality/proficiency', icon: 'emoji_events', collapsible: false },
    ],
  },

  {
    title: 'SUPPLY & INSTRUMENTS',
    items: [
      { label: 'Inventory / Reagents', path: '/inventory', icon: 'inventory_2', collapsible: false },
      { label: 'Procurement', path: '/procurement', icon: 'shopping_cart', collapsible: false },
      {
        label: 'Instruments',
        icon: 'precision_manufacturing',
        collapsible: true,
        children: [
          { label: 'Instrument List', path: '/instruments', icon: 'widgets' },
          { label: 'Calibration & Maintenance', path: '/instruments/maintenance', icon: 'build' },
        ],
      },
    ],
  },

  {
    title: 'SYSTEM',
    items: [
      { label: 'System Configuration', path: '/system/settings', icon: 'settings', collapsible: false },
      { label: 'Audit Trail', path: '/system/audit', icon: 'history', collapsible: false },
      { label: 'Reports', path: '/reports', icon: 'assessment', collapsible: false },
    ],
  },
];

type Props = {
  collapsed?: boolean;
};

const Sidebar: React.FC<Props> = ({ collapsed = false }) => {
  const pathname = usePathname();

  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});
  const [collapsedOpenGroup, setCollapsedOpenGroup] = useState<string | null>(null);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);

  useEffect(() => {
    setSelectedKey(pathname ?? null);
  }, [pathname]);

  const toggleGroup = (groupLabel: string) =>
    setOpenGroups((prev) => ({ ...prev, [groupLabel]: !prev[groupLabel] }));

  const handleGroupClick = (item: MenuItem) => {
    const key = `group:${item.label}`;
    setSelectedKey(key);
    if (collapsed) setCollapsedOpenGroup((p) => (p === item.label ? null : item.label));
    else toggleGroup(item.label);
  };

  const handleLeafClick = (path: string) => setSelectedKey(path);

  const sidebarWidth = collapsed ? 56 : 220;

  // Compacted sizes for group items
  const iconSizeClass = 'text-xs'; // smaller icon
  const itemFontClass = 'text-[11px]'; // label size
  const itemPadding = 'px-2 py-1'; // compact padding for items
  const itemGap = 'gap-1.5'; // compact gap

  // Extra compact styles for group headers / children
  const groupHeaderPadding = 'px-2 py-0.5';
  const childItemPadding = 'px-3 py-1'; // slightly indented, small vertical padding
  const childFont = 'text-[10px]';

  const SELECT_BG = '#2563EB';
  const SELECT_TEXT = '#ffffff';
  const HOVER_BG = '#DBEAFE';

  const groupIsSelected = (group: MenuItem) => {
    const gkey = `group:${group.label}`;
    if (selectedKey === gkey) return true;
    if (group.children) return group.children.some((c) => selectedKey === c.path);
    if (group.path) return selectedKey === group.path;
    return false;
  };

  const renderChildrenExpanded = (children: MenuItem[]) =>
    children.map((child) => {
      const key = child.path ?? `group:${child.label}`;
      const isSelected = selectedKey === key;
      const isHovered = hoveredKey === key;
      const bg = isSelected ? SELECT_BG : isHovered ? HOVER_BG : 'transparent';
      const color = isSelected ? SELECT_TEXT : COLORS.text;

      if (child.children) {
        const open = !!openGroups[child.label];
        return (
          <div key={key}>
            <button
              onClick={() => {
                setSelectedKey(`group:${child.label}`);
                toggleGroup(child.label);
              }}
              onMouseEnter={() => setHoveredKey(`group:${child.label}`)}
              onMouseLeave={() => setHoveredKey(null)}
              className={`w-full flex items-center ${itemGap} ${groupHeaderPadding} rounded-md ${itemFontClass}`}
              style={{ background: bg, color }}
            >
              <span className={`material-icons ${iconSizeClass}`}>{child.icon}</span>
              <span className="flex-1">{child.label}</span>
              {/* show right arrow when closed, down arrow when open */}
              <span className="material-icons text-[12px]" aria-hidden>
                {open ? 'expand_more' : 'chevron_right'}
              </span>
            </button>

            {open && (
              <div className="pl-4 mt-1 space-y-1">
                {child.children.map((gc) => (
                  <Link
                    key={gc.path}
                    href={gc.path!}
                    onClick={() => handleLeafClick(gc.path!)}
                    onMouseEnter={() => setHoveredKey(gc.path!)}
                    onMouseLeave={() => setHoveredKey(null)}
                    className={`flex items-center gap-2 ${childItemPadding} rounded-md ${childFont}`}
                    style={{
                      background: selectedKey === gc.path ? SELECT_BG : 'transparent',
                      color: selectedKey === gc.path ? SELECT_TEXT : COLORS.text,
                    }}
                  >
                    <span className={`material-icons ${iconSizeClass}`}>{gc.icon}</span>
                    <span>{gc.label}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        );
      }

      return (
        <Link
          key={key}
          href={child.path ?? '#'}
          onClick={() => child.path && handleLeafClick(child.path)}
          onMouseEnter={() => setHoveredKey(key)}
          onMouseLeave={() => setHoveredKey(null)}
          className={`flex items-center ${itemGap} ${itemPadding} rounded-md ${itemFontClass}`}
          style={{ background: bg, color }}
        >
          <span className={`material-icons ${iconSizeClass}`}>{child.icon}</span>
          <span>{child.label}</span>
        </Link>
      );
    });

  const renderChildrenCollapsed = (children: MenuItem[]) =>
    children.map((child) => {
      const key = child.path ?? `group:${child.label}`;
      const isSelected = selectedKey === key;
      const bg = isSelected ? SELECT_BG : 'transparent';
      const color = isSelected ? SELECT_TEXT : COLORS.text;

      if (child.children) {
        return (
          <div key={key} className="w-full">
            <button
              onClick={() => {
                setSelectedKey(`group:${child.label}`);
                setCollapsedOpenGroup((p) => (p === child.label ? null : child.label));
              }}
              onMouseEnter={() => setHoveredKey(`group:${child.label}`)}
              onMouseLeave={() => setHoveredKey(null)}
              className="w-full flex items-center justify-center p-2 rounded-md"
              title={child.label}
              style={{ background: bg, color }}
            >
              <span className={`material-icons ${iconSizeClass}`}>{child.icon}</span>
            </button>

            {collapsedOpenGroup === child.label && (
              <div className="flex flex-col items-center mt-1 space-y-1">
                {child.children.map((gc) => (
                  <Link
                    key={gc.path}
                    href={gc.path!}
                    onClick={() => handleLeafClick(gc.path!)}
                    className="w-full flex items-center justify-center p-2 rounded-md"
                    title={gc.label}
                    style={{
                      background: selectedKey === gc.path ? SELECT_BG : 'transparent',
                      color: selectedKey === gc.path ? SELECT_TEXT : COLORS.text,
                    }}
                  >
                    <span className={`material-icons ${iconSizeClass}`}>{gc.icon}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        );
      }

      return (
        <Link
          key={key}
          href={child.path ?? '#'}
          onClick={() => child.path && handleLeafClick(child.path)}
          onMouseEnter={() => setHoveredKey(key)}
          onMouseLeave={() => setHoveredKey(null)}
          className="w-full flex items-center justify-center p-2 rounded-md"
          title={child.label}
          style={{ background: bg, color }}
        >
          <span className={`material-icons ${iconSizeClass}`}>{child.icon}</span>
        </Link>
      );
    });

  return (
    <aside
      className="h-screen flex flex-col bg-white"
      style={{
        width: sidebarWidth,
        minWidth: sidebarWidth,
        background: COLORS.sidebarBg,
      }}
    >
      {/* Logo - slightly tighter spacing */}
      <div className="px-2 py-2 flex items-center gap-2">
        <Link href="/" className="flex items-center gap-2">
          <div
            className={`relative flex-shrink-0 ${collapsed ? 'w-9 h-9' : 'w-12 h-12'}`}
            style={{ minWidth: collapsed ? 36 : 48, minHeight: collapsed ? 36 : 48 }}
          >
            <Image
              src="/deltaGene.png"
              alt="DeltaGene"
              fill
              sizes={collapsed ? '36px' : '48px'}
              className="object-contain rounded-md"
            />
          </div>

          {!collapsed && (
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold" style={{ lineHeight: 1 }}>DeltaGene Medical</span>
              <span className="text-[11px] text-gray-400">LIS Platform</span>
            </div>
          )}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-1 py-2 space-y-3 overflow-auto no-scrollbar">
        {sidebarSections.map((section, sidx) => (
          <div key={sidx}>
            {!collapsed && section.title && (
              <p className="text-[10px] font-semibold text-blue-600 uppercase px-2 mb-1">{section.title}</p>
            )}

            <div className="space-y-1">
              {section.items.map((item) => {
                const groupKey = `group:${item.label}`;
                const groupSel = groupIsSelected(item);
                const groupBg = groupSel ? SELECT_BG : 'transparent';
                const groupColor = groupSel ? SELECT_TEXT : COLORS.text;

                if (item.children && item.collapsible !== false) {
                  const open = !!openGroups[item.label];
                  return (
                    <div key={item.label} className="relative">
                      <button
                        onClick={() => handleGroupClick(item)}
                        onMouseEnter={() => setHoveredKey(groupKey)}
                        onMouseLeave={() => setHoveredKey(null)}
                        className={`w-full flex items-center justify-center md:justify-start ${itemGap} ${itemPadding} rounded-md ${itemFontClass}`}
                        title={item.label}
                        style={{ background: groupBg, color: groupColor }}
                      >
                        <span className={`material-icons ${iconSizeClass}`}>{item.icon}</span>
                        {!collapsed && <span className="flex-1">{item.label}</span>}
                        {!collapsed && (
                          <span className="material-icons text-[12px]" aria-hidden>
                            {open ? 'expand_more' : 'chevron_right'}
                          </span>
                        )}
                      </button>

                      {!collapsed && open && (
                        <div className="pl-4 mt-1 space-y-1">{renderChildrenExpanded(item.children)}</div>
                      )}
                      {collapsed && collapsedOpenGroup === item.label && (
                        <div className="flex flex-col items-center mt-1 space-y-1">
                          {renderChildrenCollapsed(item.children)}
                        </div>
                      )}
                    </div>
                  );
                }

                const key = item.path ?? groupKey;
                const isSel = selectedKey === key;
                const bg = isSel ? SELECT_BG : 'transparent';
                const color = isSel ? SELECT_TEXT : COLORS.text;

                return (
                  <Link
                    key={key}
                    href={item.path ?? '#'}
                    onClick={() => item.path && handleLeafClick(item.path)}
                    onMouseEnter={() => setHoveredKey(key)}
                    onMouseLeave={() => setHoveredKey(null)}
                    className={`flex items-center justify-center md:justify-start ${itemGap} ${itemPadding} rounded-md ${itemFontClass}`}
                    title={item.label}
                    style={{ background: bg, color }}
                  >
                    <span className={`material-icons ${iconSizeClass}`}>{item.icon}</span>
                    {!collapsed && <span>{item.label}</span>}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;