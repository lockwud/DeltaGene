'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { OrderProvider, useOrderContext } from '@/components/cpoe/OrderContext';
import OrderPanel from '@/components/cpoe/OrderPanel';
import OrderQueue from '@/components/cpoe/OrderQueue';
import Pagination from '@/components/ui/Pagination';
import type { Patient as PatientType, TestItem as TestItemType } from '@/components/types';
import EmptyState from '@/components/ui/EmptyState';

/**
 * COE page — left: patients; right: order card / queue.
 * Important: OrderProvider is included so OrderPanel and OrderQueue can use context.
 */

const initialPatients: PatientType[] = [
  {
    patientId: 'P0001',
    firstName: 'John',
    lastName: 'Doe',
    dob: '1990-01-01',
    gender: 'Male',
    contact: '+123456789',
    active: true,
    registeredAt: '2024-06-01T10:00:00Z',
    tests: [{ id: 'T-1', name: 'CBC', date: '2025-01-10', status: 'completed', code: 'CBC-19900101-001' }],
  },
  {
    patientId: 'P0002',
    firstName: 'Jane',
    lastName: 'Smith',
    dob: '1985-05-10',
    gender: 'Female',
    contact: '+1987654321',
    active: false,
    registeredAt: '2023-12-02T09:30:00Z',
    tests: [{ id: 'T-2', name: 'Lipid Panel', date: '2024-12-01', status: 'completed', code: 'LIPID-19850510-001' }],
  },
];

export default function SystemCOEPageWrapper() {
  // Keep OrderProvider high for this page chunk
  return (
    <OrderProvider>
      <SystemCOEPage />
    </OrderProvider>
  );
}

function SystemCOEPage() {
  const [patients, setPatients] = useState<PatientType[]>(initialPatients);

  // pagination
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const totalItems = patients.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  useEffect(() => { if (page > totalPages) setPage(1); }, [page, totalPages]);
  const pagedPatients = useMemo(() => { const start = (page - 1) * pageSize; return patients.slice(start, start + pageSize); }, [patients, page, pageSize]);

  // panel state (local), but selectedPatient is tracked in context too
  const [panelOpenFor, setPanelOpenFor] = useState<PatientType[] | null>(null);
  const orderCtx = useOrderContext();
  const { setSelectedPatient, setShowQueue, showQueue } = orderCtx;

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem('cpoe:selectedPatient');
      if (raw) {
        const p = JSON.parse(raw) as PatientType;
        setPatients((prev) => (prev.some((x) => x.patientId === p.patientId) ? prev : [p, ...prev]));
        setPanelOpenFor([p]);
        setSelectedPatient?.(p);
        setShowQueue?.(false);
        sessionStorage.removeItem('cpoe:selectedPatient');
      }
    } catch (err) {
      console.error('COE: failed to read selected patient', err);
    }
  }, [setSelectedPatient, setShowQueue]);

  // open panel for a row -> set local panel and context selected patient
  const openPanelForPatient = useCallback((p: PatientType) => {
    setPanelOpenFor([p]);
    setSelectedPatient?.(p);
    setShowQueue?.(false);
  }, [setSelectedPatient, setShowQueue]);

  const openPanelEmpty = useCallback(() => {
    setPanelOpenFor([]);
    setSelectedPatient?.(null);
    setShowQueue?.(false);
  }, [setSelectedPatient, setShowQueue]);

  const closePanel = useCallback(() => {
    setPanelOpenFor(null);
    // optionally clear context selection? keep for convenience
  }, []);

  // merge-aware attach for a single patient
  const attachTestsToPatient = useCallback((patientId: string, tests: TestItemType[]) => {
    setPatients(prev => prev.map(p => {
      if (p.patientId !== patientId) return p;
      const existing = p.tests ?? [];
      const map = new Map(existing.map(t => [t.id, t]));
      for (const t of tests) map.set(t.id, { ...(map.get(t.id) ?? {}), ...t });
      return { ...p, tests: Array.from(map.values()) };
    }));
  }, []);

  const attachTestsToMultiple = useCallback((perPatient: Record<string, TestItemType[]>) => {
    setPatients(prev => prev.map(p => {
      const incoming = perPatient[p.patientId];
      if (!incoming) return p;
      const existing = p.tests ?? [];
      const map = new Map(existing.map(t => [t.id, t]));
      for (const t of incoming) map.set(t.id, { ...(map.get(t.id) ?? {}), ...t });
      return { ...p, tests: Array.from(map.values()) };
    }));
  }, []);

  return (
    <div className="flex gap-6 h-[calc(100vh-80px)]">
      <div className="flex-1 p-6 overflow-auto">
        <div className="flex items-start justify-between mb-4">
          <h1 className="text-2xl font-semibold mt-1">COE — Test Ordering</h1>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left text-sm border-b bg-gray-100">
                  <th className="px-4 py-3 text-gray-700">Patient ID</th>
                  <th className="px-4 py-3 text-gray-700">Name</th>
                  <th className="px-4 py-3 text-gray-700">DOB</th>
                  <th className="px-4 py-3 text-gray-700">Status</th>
                  <th className="px-4 py-3 text-gray-700 w-36">Actions</th>
                </tr>
              </thead>

              <tbody>
                {pagedPatients.map((p) => (
                  <tr key={p.patientId} className="border-b last:border-b-0 hover:bg-gray-50">
                    <td className="px-4 py-3 font-mono text-xs">{p.patientId}</td>
                    <td className="px-4 py-3">
                      <div className="font-medium">{p.firstName} {p.lastName}</div>
                      <div className="text-xs text-gray-500 hidden sm:block">{p.contact}</div>
                    </td>
                    <td className="px-4 py-3">{p.dob}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${p.active ? 'bg-green-600 text-white' : 'bg-gray-300 text-gray-800'}`}>{p.active ? 'Active' : 'Inactive'}</span>
                    </td>
                    <td className="px-4 py-3 flex items-center justify-end gap-2">
                      <button onClick={() => openPanelForPatient(p)} className="px-3 py-1 rounded-full bg-blue-600 text-white text-xs">Order</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-4 py-3 border-t bg-white flex items-center justify-between">
            <div className="text-sm text-gray-600">Showing {totalItems} patient{totalItems !== 1 ? 's' : ''}.</div>

            <Pagination
              page={page}
              totalPages={totalPages}
              pageSize={pageSize}
              totalItems={totalItems}
              onPageChange={(p) => setPage(p)}
              onPageSizeChange={(s) => { setPageSize(s); setPage(1); }}
            />
          </div>
        </div>
      </div>

      {/* Right: rounded Order card */}
      <div className="w-full md:w-[480px] lg:w-[560px] flex items-start justify-center p-6">
        <div className="w-full h-[calc(100vh-96px)] bg-white rounded-xl shadow-lg border overflow-hidden flex flex-col">
          <div className="px-5 py-4 border-b">
            <h3 className="text-lg font-medium">Test Orders</h3>
            <p className="text-xs text-gray-500 mt-1">Select a patient to begin ordering.</p>
          </div>

          <div className="flex-1 overflow-auto p-5">
            {showQueue ? (
              <OrderQueue />
            ) : panelOpenFor === null ? (
              <EmptyState title="Select a patient" description="Click 'Order' on a patient row to begin creating tests." />
            ) : (
              <OrderPanelWrapper
                patients={panelOpenFor}
                onClose={() => { closePanel(); }}
                attachSingle={attachTestsToPatient}
                attachMultiple={(perPatient) => { attachTestsToMultiple(perPatient); }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function OrderPanelWrapper({
  patients,
  onClose,
  attachSingle,
  attachMultiple,
}: {
  patients: PatientType[];
  onClose: () => void;
  attachSingle: (patientId: string, tests: TestItemType[]) => void;
  attachMultiple: (perPatient: Record<string, TestItemType[]>) => void;
}) {
  const primary = patients.length > 0 ? patients[0] : null;

  return (
    <div className="h-full flex flex-col">
      <div className="px-0 py-0">
        <h3 className="text-lg font-semibold">Order {patients.length === 0 ? '' : `for ${patients.length === 1 ? `${primary?.firstName} ${primary?.lastName}` : `${patients.length} patients`}`}</h3>
      </div>

      <div className="flex-1 overflow-auto">
        <OrderPanel
          patient={primary ?? undefined}
          onAttachTestsToPatient={(patientId: string, tests: TestItemType[]) => {
            if (patients.length <= 1) {
              attachSingle(patientId, tests);
              onClose();
            } else {
              const perPatient: Record<string, TestItemType[]> = {};
              for (const p of patients) perPatient[p.patientId] = tests.map((t) => ({ ...t, id: `${p.patientId}-${t.id}` }));
              attachMultiple(perPatient);
              onClose();
            }
          }}
        />
      </div>
    </div>
  );
}