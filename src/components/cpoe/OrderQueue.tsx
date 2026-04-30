'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { format, parseISO, isToday, isThisWeek, isThisMonth } from 'date-fns';
import EmptyState from '@/components/ui/EmptyState';
import Pagination from '@/components/ui/Pagination';
import { useOrderContext } from '@/components/cpoe/OrderContext';
import type { Order } from '@/components/types';

type FilterKey = 'today' | 'this_week' | 'this_month' | 'all';

function statusPill(status?: Order['status']) {
  switch (status) {
    case 'pending': return <span className="inline-flex items-center px-2 py-1 rounded-full bg-gray-100 text-gray-800 text-xs">Pending</span>;
    case 'processing': return <span className="inline-flex items-center px-2 py-1 rounded-full bg-yellow-100 text-yellow-800 text-xs">Processing</span>;
    case 'completed': return <span className="inline-flex items-center px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs">Completed</span>;
    case 'canceled': return <span className="inline-flex items-center px-2 py-1 rounded-full bg-red-100 text-red-800 text-xs">Canceled</span>;
    default: return <span className="inline-flex items-center px-2 py-1 rounded-full bg-gray-100 text-gray-800 text-xs">Unknown</span>;
  }
}

/**
 * OrderQueue
 * Props:
 *  - hideFilters?: hide the date filter chips (use when embedded in panel)
 *  - hideHeader?: hide the big "Order Queue" header and details title (use when embedded)
 */
export default function OrderQueue({ hideFilters = false, hideHeader = false }: { hideFilters?: boolean; hideHeader?: boolean }) {
  const { orderQueue = [], selectedOrderId, setSelectedOrderId } = useOrderContext();

  const [filter, setFilter] = useState<FilterKey>('all');
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  // Source is only real orders from context (no dummy data)
  const sourceOrders = orderQueue;

  const filtered = useMemo(() => {
    if (filter === 'all') return sourceOrders;
    return sourceOrders.filter((o) => {
      if (!o.createdAt) return false;
      const dt = parseISO(o.createdAt);
      if (filter === 'today') return isToday(dt);
      if (filter === 'this_week') return isThisWeek(dt);
      if (filter === 'this_month') return isThisMonth(dt);
      return true;
    });
  }, [sourceOrders, filter]);

  // exclude selectedOrder from the list below (selectedOrder rendered in details area)
  const filteredExcludingSelected = useMemo(() => {
    if (!selectedOrderId) return filtered;
    return filtered.filter(o => o.orderId !== selectedOrderId);
  }, [filtered, selectedOrderId]);

  const totalItems = filteredExcludingSelected.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  useEffect(() => { if (page > totalPages) setPage(1); }, [page, totalPages]);

  const paged = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredExcludingSelected.slice(start, start + pageSize);
  }, [filteredExcludingSelected, page, pageSize]);

  const chips: { key: FilterKey; label: string }[] = [
    { key: 'today', label: 'Today' },
    { key: 'this_week', label: 'This Week' },
    { key: 'this_month', label: 'This Month' },
    { key: 'all', label: 'All Time' },
  ];

  const selectedOrder = sourceOrders.find(o => o.orderId === selectedOrderId) ?? null;

  // scroll + highlight selected order
  useEffect(() => {
    if (!selectedOrderId) return;
    const el = document.getElementById(`order-${selectedOrderId}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el.classList.add('ring-2', 'ring-blue-200', 'transition-all');
      setTimeout(() => el.classList.remove('ring-2', 'ring-blue-200', 'transition-all'), 1800);
    }
  }, [selectedOrderId]);

  return (
    <div className="p-4">
      {/* Top header (optional when embedded) */}
      {!hideHeader && (
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-medium">Order Queue</h3>
            {!hideFilters && <p className="text-xs text-gray-500 mt-1">Filter by created date.</p>}
          </div>
          {!hideFilters && (
            <div className="flex items-center gap-3">
              {chips.map(c => (
                <button key={c.key} onClick={() => { setFilter(c.key); setPage(1); }} className={`text-xs px-3 py-1 rounded-full border ${filter === c.key ? 'bg-gray-100' : 'bg-white hover:bg-gray-50'}`}>
                  {c.label}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Inline details (if selected) */}
      {selectedOrder && (
        <div className="mb-4 bg-white rounded-lg shadow p-4 relative">
          {/* close icon */}
          <button onClick={() => setSelectedOrderId(null)} aria-label="Close details" className="absolute top-3 right-3 p-1 rounded-md hover:bg-gray-100">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden><path d="M6 6l12 12M6 18L18 6" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              {!hideHeader && <div className="text-xs text-gray-500">Order</div>}
              <div className="text-sm font-mono text-gray-800">{selectedOrder.orderId}</div>

              <div className="mt-3 text-xs text-gray-500">Patient</div>
              <div className="text-sm font-medium">{selectedOrder.patientName ?? selectedOrder.patientId}</div>

              <div className="mt-3 text-xs text-gray-500">Created</div>
              <div className="text-sm">{selectedOrder.createdAt ? format(parseISO(selectedOrder.createdAt), 'PPpp') : '—'}</div>

              <div className="mt-3 text-xs text-gray-500">Priority</div>
              <div className="text-sm">{selectedOrder.priority ?? 'Routine'}</div>

              <div className="mt-3 text-xs text-gray-500">Clinical indication</div>
              <div className="text-sm text-gray-700">{selectedOrder.clinicalIndication ?? '—'}</div>
            </div>

            <div>
              <div className="text-xs text-gray-500 mb-2">Tests</div>
              <div className="space-y-2">
                {selectedOrder.tests && selectedOrder.tests.length > 0 ? selectedOrder.tests.map((t, i) => (
                  <div key={i} className="border rounded-md bg-gray-50 p-2">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-sm font-medium text-gray-800">{t.name}</div>
                        <div className="text-xs text-gray-500">Specimen: <span className="font-medium text-gray-700">{t.specimen ?? '—'}</span></div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-gray-500">Priority</div>
                        <div className="text-sm">{t.priority ?? 'Routine'}</div>
                      </div>
                    </div>
                    {(t as any).code ? <div className="mt-2 text-xs font-mono text-gray-600 bg-white border rounded px-2 py-1">{(t as any).code}</div> : null}
                  </div>
                )) : <div className="text-sm text-gray-500">No tests listed</div>}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* List (cards) - card clickable to open selected order */}
      <div className="space-y-3">
        {sourceOrders.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-6">
            <EmptyState title="No orders" description="There are no queued orders yet." />
          </div>
        ) : (
          paged.map((o) => (
            <div
              key={o.orderId}
              id={`order-${o.orderId}`}
              onClick={() => setSelectedOrderId(o.orderId)}
              className="cursor-pointer bg-white rounded-lg shadow p-4 flex flex-col md:flex-row md:items-start md:justify-between gap-3 hover:shadow-md transition"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="text-xs text-gray-500">Created</div>
                    <div className="text-sm text-gray-800 font-medium">{o.createdAt ? format(parseISO(o.createdAt), 'PPpp') : '—'}</div>

                    <div className="mt-3 text-xs text-gray-500">Patient</div>
                    <div className="text-sm font-medium">{o.patientName ?? o.patientId}</div>

                    <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-gray-600">
                      <div>
                        <div className="text-gray-500">Priority</div>
                        <div className="text-sm text-gray-800">{o.priority ?? 'Routine'}</div>
                      </div>
                      <div>
                        <div className="text-gray-500">Tests</div>
                        <div className="text-sm text-gray-800">{(o.tests?.length ?? 0)} test{(o.tests?.length ?? 0) !== 1 ? 's' : ''}</div>
                      </div>
                    </div>
                  </div>

                  <div className="text-right flex-shrink-0">
                    <div className="text-xs text-gray-500">Status</div>
                    <div className="mt-1">{statusPill(o.status)}</div>
                  </div>
                </div>
              </div>

              <div className="flex-shrink-0 flex flex-col items-end gap-2">
                <div className="text-xs text-gray-500">Tap card to view</div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="mt-4 px-2 py-3 border-t bg-white flex items-center justify-between">
        <div className="text-sm text-gray-600">Showing {sourceOrders.length} order{sourceOrders.length !== 1 ? 's' : ''}.</div>

        <Pagination
          page={page}
          totalPages={totalPages}
          pageSize={pageSize}
          totalItems={sourceOrders.length}
          onPageChange={(p) => setPage(p)}
          onPageSizeChange={(s) => { setPageSize(s); setPage(1); }}
        />
      </div>
    </div>
  );
}