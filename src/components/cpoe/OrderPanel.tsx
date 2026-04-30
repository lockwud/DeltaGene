'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import type { Patient, TestItem } from '@/components/types';
import { generateTestCode, formatDobForCode } from './utils';
import { useOrderContext } from './OrderContext';
import { useToast } from '@/components/ui/Toast';

/* Test catalog (icons inline) */
const TEST_CATALOG = [
  { id: 'T-CBC', name: 'CBC', icon: IconBlood },
  { id: 'T-COVID', name: 'COVID PCR', icon: IconVirus },
  { id: 'T-LIPID', name: 'Lipid Panel', icon: IconChips },
  { id: 'T-GLU', name: 'Glucose', icon: IconGlucose },
];

type LocalTest = {
  id: string;
  name: string;
  code?: string;
  specimen?: string;
  priority?: 'Routine' | 'ASAP' | 'Stat';
  editing?: boolean;
  overridePriority?: boolean;
};

export default function OrderPanel({
  patient,
  onAttachTestsToPatient,
}: {
  patient?: Patient;
  onAttachTestsToPatient: (patientId: string, tests: TestItem[]) => void;
}) {
  const orderCtx = useOrderContext();
  const toast = useToast();
  const ctxPatient = orderCtx?.selectedPatient ?? undefined;

  const [selectedPatient, setSelectedPatient] = useState<Patient | undefined>(patient ?? ctxPatient);
  useEffect(() => {
    if (patient) setSelectedPatient(patient);
    else setSelectedPatient(ctxPatient);
    setHasQueued(false);
  }, [patient, ctxPatient]);

  const [tests, setTests] = useState<LocalTest[]>([]);
  const [priority, setPriority] = useState<'Routine' | 'ASAP' | 'Stat'>('Routine');
  const [indication, setIndication] = useState('');
  const [hasQueued, setHasQueued] = useState(false);

  useEffect(() => {
    if (!selectedPatient) return;
    setTests((prev) =>
      prev.map((t) => {
        const dobStr = formatDobForCode(selectedPatient.dob);
        const looksAuto = !t.code || (dobStr && t.code.includes(dobStr));
        if (looksAuto) return { ...t, code: generateTestCode(t.name, selectedPatient.dob) };
        return t;
      })
    );
  }, [selectedPatient]);

  const toggleTestSelection = useCallback((catalogId: string) => {
    const found = TEST_CATALOG.find((c) => c.id === catalogId);
    if (!found) return;
    setTests((prev) => {
      if (prev.some((p) => p.id === catalogId)) return prev.filter((p) => p.id !== catalogId);
      return [
        ...prev,
        {
          id: found.id,
          name: found.name,
          code: '',
          specimen: 'Blood',
          priority: 'Routine',
          editing: false,
          overridePriority: false,
        },
      ];
    });
  }, []);

  const removeTest = useCallback((id: string) => setTests((s) => s.filter((t) => t.id !== id)), []);
  const setTestField = useCallback((id: string, patch: Partial<LocalTest>) => setTests((s) => s.map((t) => (t.id === id ? { ...t, ...patch } : t))), []);
  const toggleEditCode = useCallback((id: string) => setTests((s) => s.map((t) => (t.id === id ? { ...t, editing: !t.editing } : t))), []);
  const toggleOverridePriority = useCallback((id: string) => setTests((s) => s.map((t) => (t.id === id ? { ...t, overridePriority: !t.overridePriority } : t))), []);

  const submit = useCallback(() => {
    if (!selectedPatient) {
      toast.show({ title: 'No patient selected', message: 'Please select a patient before queuing an order.', duration: 5000 });
      return;
    }
    if (tests.length === 0) {
      toast.show({ title: 'No tests', message: 'Add at least one test before queuing.', duration: 5000 });
      return;
    }

    const nowIso = new Date().toISOString();
    const items: TestItem[] = tests.map((t, i) => ({
      id: `${selectedPatient.patientId}-${Date.now()}-${i}`,
      name: t.name,
      code: t.code || generateTestCode(t.name, selectedPatient.dob),
      specimen: t.specimen,
      priority: t.overridePriority ? t.priority : priority,
      date: nowIso,
      status: 'pending',
    }));

    onAttachTestsToPatient(selectedPatient.patientId, items);

    const payload = {
      patientId: selectedPatient.patientId,
      patientName: `${selectedPatient.firstName} ${selectedPatient.lastName}`,
      orderingProvider: { id: 'ui', name: 'COE' },
      priority,
      clinicalIndication: indication,
      tests: items.map((it) => ({ name: it.name, specimen: it.specimen, priority: it.priority, code: it.code })),
      status: 'pending' as const,
      createdBy: 'current-user',
    };

    const order = orderCtx.addOrder(payload);

    // Immediately open queue and select the new order
    orderCtx.setShowQueue(true);
    orderCtx.setSelectedOrderId?.(order.orderId);

    // Show toast (still a fallback proceed)
    toast.show({
      title: 'Order queued',
      message: `Order ${order.orderId} added to the queue.`,
      duration: 6000,
      proceedLabel: 'View queue',
      onProceed: () => {
        orderCtx.setShowQueue(true);
        orderCtx.setSelectedOrderId?.(order.orderId);
      },
    });

    // optional lifecycle simulation for demo
    setTimeout(() => {
      orderCtx.updateOrderStatus(order.orderId, 'processing');
      const processing = items.map((it) => ({ ...it, status: 'processing' }));
      onAttachTestsToPatient(selectedPatient.patientId, processing);
    }, 1500);
    setTimeout(() => {
      orderCtx.updateOrderStatus(order.orderId, 'completed');
      const completed = items.map((it) => ({ ...it, status: 'completed' }));
      onAttachTestsToPatient(selectedPatient.patientId, completed);
    }, 5000);

    setHasQueued(true);
    setTests([]);
    setIndication('');
    setPriority('Routine');
  }, [selectedPatient, tests, priority, indication, orderCtx, onAttachTestsToPatient, toast]);

  const onPickPatientInside = useCallback((p: Patient) => {
    setSelectedPatient(p);
    orderCtx.setSelectedPatient(p);
    orderCtx.setShowQueue(false);
    setHasQueued(false);
  }, [orderCtx]);

  const onClear = useCallback(() => {
    setTests([]);
    setIndication('');
    setPriority('Routine');
    setHasQueued(false);
  }, []);

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm min-h-[420px]">
      <div className="flex items-start justify-between gap-4 mb-2">
        <div>
          <h3 className="text-lg font-semibold">Order for {selectedPatient ? `${selectedPatient.firstName} ${selectedPatient.lastName}` : '—'}</h3>
          {/* show patient id only when selected; otherwise show nothing (remove 'Select a patient...' prompt) */}
          {selectedPatient ? <div className="text-xs text-gray-500 mt-1">{selectedPatient.patientId}</div> : null}
        </div>

        <div className="flex items-center gap-3">
          <div className="text-xs text-gray-500">Priority</div>
          <select value={priority} onChange={(e) => setPriority(e.target.value as any)} className="px-2 py-1 border rounded text-sm">
            <option>Routine</option>
            <option>ASAP</option>
            <option>Stat</option>
          </select>
        </div>
      </div>

      <div className="mb-3">
        <label className="block text-xs font-medium text-gray-700 mb-1">Clinical indication</label>
        <textarea rows={2} value={indication} onChange={(e) => setIndication(e.target.value)} className="w-full px-3 py-2 border rounded-md text-sm" placeholder="Reason for ordering (optional)" />
      </div>

      {/* Add tests area (hidden after queue if hasQueued true) */}
      {!hasQueued && (
        <>
          <div className="mb-3 flex items-center gap-3">
            <TestMultiSelectPortal catalog={TEST_CATALOG} selectedIds={tests.map((t) => t.id)} onToggle={toggleTestSelection} btnLabel="Add tests" />

            <div className="flex-1">
              <div className="flex flex-wrap gap-2">
                {tests.length === 0 ? (
                  <div className="text-xs text-gray-400">No tests added</div>
                ) : (
                  tests.map((t) => {
                    const catalog = TEST_CATALOG.find((c) => c.id === t.id);
                    const Icon = catalog?.icon ?? null;
                    return (
                      <div key={t.id} className="flex items-center gap-2 px-2 py-0.5 rounded-full bg-gray-100 border text-sm">
                        {Icon ? <div className="w-4 h-4">{<Icon />}</div> : null}
                        <div className="font-medium">{t.name}</div>
                        <button onClick={() => removeTest(t.id)} className="ml-2 text-gray-500 rounded-full p-1 hover:bg-red-50" aria-label={`Remove ${t.name}`}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                            <path d="M3 6h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M10 11v6M14 11v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </button>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>

          <div className="space-y-2 mb-3">
            {tests.map((t) => (
              <div key={t.id} className="border rounded-md p-2 bg-gray-50 text-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-sm">{t.name}</div>
                    <div className="text-xs text-gray-500">Configure test</div>
                  </div>

                  <div className="flex items-center gap-2">
                    {t.editing ? (
                      <input value={t.code ?? ''} onChange={(e) => setTestField(t.id, { code: e.target.value })} className="px-2 py-1 border rounded-md text-sm" />
                    ) : (
                      <div className="px-2 py-1 rounded-md bg-gray-50 border text-xs font-mono">{t.code ?? '—'}</div>
                    )}

                    <button onClick={() => toggleEditCode(t.id)} className="p-1 rounded-md hover:bg-gray-100 text-xs">{t.editing ? 'Save' : 'Edit'}</button>
                  </div>
                </div>

                <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-2 items-center">
                  <select value={t.specimen} onChange={(e) => setTestField(t.id, { specimen: e.target.value })} className="px-2 py-1 border rounded-full text-sm">
                    <option>Blood</option>
                    <option>Urine</option>
                    <option>Swab</option>
                    <option>Other</option>
                  </select>

                  <label className="flex items-center gap-2 text-xs">
                    <input type="checkbox" checked={!!t.overridePriority} onChange={() => toggleOverridePriority(t.id)} />
                    <span>Override priority</span>
                  </label>

                  <div className="text-sm text-gray-500">
                    {t.overridePriority ? (
                      <select value={t.priority} onChange={(e) => setTestField(t.id, { priority: e.target.value as any })} className="px-2 py-1 border rounded-full text-sm">
                        <option>Routine</option>
                        <option>ASAP</option>
                        <option>Stat</option>
                      </select>
                    ) : (
                      <div className="text-xs text-gray-500">Using order priority</div>
                    )}
                  </div>
                </div>

                {/* small bin remove on the card (right) */}
                <div className="mt-2 text-right">
                  <button onClick={() => removeTest(t.id)} className="text-red-600 rounded-full p-1 hover:bg-red-50" aria-label={`Delete ${t.name}`}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path d="M3 6h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M10 11v6M14 11v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <div className="flex items-center justify-end gap-2">
        <button onClick={onClear} className="px-3 py-2 rounded-md border text-sm">Clear</button>
        <button onClick={submit} className="px-4 py-2 rounded-full bg-blue-600 text-white text-sm">Queue</button>
      </div>
    </div>
  );
}

/* ===========================
   TestMultiSelectPortal (round selector)
   - circle radio-style indicator (outline -> filled dot)
   - compact list items
   =========================== */
function TestMultiSelectPortal({ catalog, selectedIds, onToggle, btnLabel }: {
  catalog: { id: string; name: string; icon?: React.FC }[];
  selectedIds: string[];
  onToggle: (id: string) => void;
  btnLabel?: string;
}) {
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState<{ left: number; top: number } | null>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!btnRef.current) return;
      if (!btnRef.current.contains(e.target as Node)) setOpen(false);
    }
    if (open) document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, [open]);

  const toggle = () => {
    if (!btnRef.current) { setOpen(v => !v); return; }
    const r = btnRef.current.getBoundingClientRect();
    setCoords({ left: r.left, top: r.bottom + 8 });
    setOpen(v => !v);
  };

  return (
    <>
      <button ref={btnRef} onClick={toggle} aria-haspopup="listbox" aria-expanded={open} title={btnLabel ?? 'Add tests'} className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center shadow-sm border">
        {/* black plus */}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>

      {open && coords && typeof document !== 'undefined' && createPortal(
        <div role="dialog" aria-label="Select tests" style={{ position: 'absolute', left: coords.left, top: coords.top, zIndex: 9999 }} className="w-64 bg-white border rounded-lg shadow-lg" onClick={(e) => e.stopPropagation()}>
          <div className="p-2 max-h-56 overflow-auto">
            <div className="grid grid-cols-1 gap-2">
              {catalog.map((c) => {
                const selected = selectedIds.includes(c.id);
                const Icon = c.icon ?? null;
                return (
                  <button key={c.id} onClick={(e) => { e.stopPropagation(); onToggle(c.id); }} className={`w-full text-left px-3 py-2 rounded-md flex items-center gap-3 ${selected ? 'bg-blue-50' : 'hover:bg-gray-50'}`}>
                    <div className="w-8 h-8 rounded-md bg-gray-100 flex items-center justify-center">{Icon ? <Icon /> : null}</div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div className="font-medium text-sm">{c.name}</div>
                        {/* round selector */}
                        <div className="flex items-center">
                          <span className={`w-4 h-4 rounded-full flex items-center justify-center border ${selected ? 'border-blue-600' : 'border-gray-300'}`}>
                            {selected ? <span className="w-2 h-2 rounded-full bg-blue-600" /> : null}
                          </span>
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="border-t px-2 py-2 flex items-center justify-between">
            <div className="text-xs text-gray-600">{selectedIds.length} selected</div>
            <div className="flex gap-2">
              <button onClick={() => setOpen(false)} className="px-3 py-1 rounded-md text-sm border">Done</button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}

/* Minimal PatientSelector (keep or replace) */
function PatientSelector({ onPick }: { onPick: (p: Patient) => void }) {
  const sample: Patient[] = [
    { patientId: 'P0001', firstName: 'John', lastName: 'Doe', dob: '1990-01-01' } as Patient,
    { patientId: 'P0002', firstName: 'Jane', lastName: 'Smith', dob: '1985-05-10' } as Patient,
  ];

  return (
    <div>
      <label className="text-sm text-gray-500">Pick patient</label>
      <div className="mt-2 grid gap-2">
        {sample.map((p) => (
          <button key={p.patientId} onClick={() => onPick(p)} className="text-left px-3 py-2 rounded-md hover:bg-gray-50 border">
            <div className="font-medium">{p.firstName} {p.lastName}</div>
            <div className="text-xs text-gray-500">{p.patientId} • DOB: {p.dob}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

/* Inline SVG icons */
function IconBlood() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden><path d="M12 3s5 4.5 5 8a5 5 0 11-10 0c0-3.5 5-8 5-8z" fill="#EF4444" /></svg>;
}
function IconVirus() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden><circle cx="12" cy="12" r="4" stroke="#0F172A" strokeWidth="1.2" /><path d="M2 12h3M19 12h3M12 2v3M12 19v3" stroke="#0F172A" strokeWidth="1" strokeLinecap="round" /></svg>;
}
function IconChips() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden><rect x="3" y="6" width="18" height="12" rx="2" stroke="#0F172A" strokeWidth="1" /><path d="M7 9h10M7 12h10" stroke="#0F172A" strokeWidth="1" strokeLinecap="round" /></svg>;
}
function IconGlucose() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden><path d="M12 2v20" stroke="#0F172A" strokeWidth="1.2" strokeLinecap="round" /></svg>;
}