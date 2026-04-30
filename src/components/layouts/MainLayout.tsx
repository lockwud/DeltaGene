// MainLayout.tsx
'use client';

import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { ToastProvider } from '@/components/ui/Toast';
import { OrderProvider } from '@/components/cpoe/OrderContext'; // ensure path is correct

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <ToastProvider>
      <OrderProvider>
        <div className="flex h-screen bg-gray-50">
          <Sidebar collapsed={sidebarCollapsed} />
          <div className="flex-1 flex flex-col transition-all">
            <Topbar onToggleSidebar={() => setSidebarCollapsed(s => !s)} />
            <main className="flex-1 p-6 overflow-auto">{children}</main>
          </div>
        </div>
      </OrderProvider>
    </ToastProvider>
  );
}