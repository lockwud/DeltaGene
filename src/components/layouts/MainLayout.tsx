'use client';

import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

type Props = {
  children: React.ReactNode;
};

const MainLayout: React.FC<Props> = ({ children }) => {
  // false = expanded (wide), true = collapsed (icons-only narrow)
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar collapsed={sidebarCollapsed} />

      <div className="flex-1 flex flex-col transition-all">
        <Topbar onToggleSidebar={() => setSidebarCollapsed((s) => !s)} isSidebarCollapsed={sidebarCollapsed} />
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;