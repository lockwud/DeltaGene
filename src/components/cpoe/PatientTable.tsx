import React, { useMemo } from 'react';
import { Patient } from '@/components/types/types';
import Pagination from '@/components/ui/Pagination';
import StatusBadge from '@/components/ui/StatusBadge';
import RowActions from '@/components/ui/RowActions';

type Props = {
  patients: Patient[];
  page: number;
  pageSize: number;
  onPageChange: (p: number) => void;
  onPageSizeChange: (s: number) => void;
  onOpenOrder: (p: Patient) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
};

const formatDate = (iso?: string) => (iso ? new Date(iso).toLocaleDateString() : '');
const computeAge = (dob?: string) => {
  if (!dob) return '';
  const diff = Date.now() - new Date(dob).getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
};

const computePatientStatus = (p: Patient) => {
  const tests = p.tests ?? [];
  if (tests.length === 0) return p.active ? 'active' : 'inactive';
  const normalized = tests.map((t) => (t.status || '').toLowerCase());
  if (normalized.some((s) => s === 'running')) return 'active';
  if (normalized.some((s) => s === 'inprogress' || s === 'in progress' || s === 'pending')) return 'inprogress';
  if (normalized.every((s) => s === 'completed' && s !== '')) return 'completed';
  return p.active ? 'active' : 'inactive';
};

export default function PatientTable({
  patients,
  page,
  pageSize,
  onPageChange,
  onPageSizeChange,
  onOpenOrder,
  onEdit,
  onDelete,
}: Props) {
  const totalItems = patients.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  const paged = useMemo(() => {
    const start = (page - 1) * pageSize;
    return patients.slice(start, start + pageSize);
  }, [patients, page, pageSize]);

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {/* Compact header so title/table sit higher */}
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <div>
          <h2 className="text-lg font-semibold -mt-1">Patient</h2>
          <div className="text-xs text-gray-500 mt-1">Showing {totalItems} patient{totalItems !== 1 ? 's' : ''}.</div>
        </div>

        <div className="flex items-center gap-4">
          {/* Top pagination (compact placement) */}
          <Pagination
            page={page}
            totalPages={totalPages}
            pageSize={pageSize}
            totalItems={totalItems}
            onPageChange={onPageChange}
            onPageSizeChange={onPageSizeChange}
          />
        </div>
      </div>

      <div className="overflow-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left text-sm border-b bg-gray-100">
              <th className="px-4 py-4 text-gray-700">Patient ID</th>
              <th className="px-4 py-4 text-gray-700">Name</th>
              <th className="px-4 py-4 text-gray-700">DOB / Age</th>
              <th className="px-4 py-4 text-gray-700">Gender</th>
              <th className="px-4 py-4 text-gray-700 hidden sm:table-cell">Contact</th>
              <th className="px-4 py-4 text-gray-700">Tests</th>
              <th className="px-4 py-4 text-gray-700 hidden md:table-cell">Address</th>
              <th className="px-4 py-4 text-gray-700">Registered</th>
              <th className="px-4 py-4 text-gray-700">Status</th>
              <th className="px-4 py-4 text-gray-700 w-36">Actions</th>
            </tr>
          </thead>

          <tbody>
            {paged.map((p) => {
              const status = computePatientStatus(p);
              return (
                <React.Fragment key={p.patientId}>
                  <tr className="group hover:bg-gray-50">
                    <td className="px-4 py-4 font-mono text-xs">{p.patientId}</td>

                    <td className="px-4 py-4">
                      <div className="flex flex-col">
                        <span className="font-medium">{`${p.firstName} ${p.lastName}`}</span>
                        <span className="text-xs text-gray-500 hidden sm:block">{p.contact}</span>
                      </div>
                    </td>

                    <td className="px-4 py-4">
                      <div className="text-sm">
                        <div>{formatDate(p.dob)}</div>
                        <div className="text-xs text-gray-500">{computeAge(p.dob)} yrs</div>
                      </div>
                    </td>

                    <td className="px-4 py-4">{p.gender}</td>
                    <td className="px-4 py-4 hidden sm:table-cell">{p.contact}</td>

                    <td className="px-4 py-4">
                      <div className="text-sm text-gray-700">
                        {p.tests?.length ? <span>{p.tests.length} test{p.tests.length > 1 ? 's' : ''}</span> : <span className="text-gray-400">—</span>}
                      </div>
                    </td>

                    <td className="px-4 py-4 hidden md:table-cell truncate" style={{ maxWidth: 220 }}>{p.address}</td>

                    <td className="px-4 py-4">{formatDate(p.registeredAt)}</td>

                    <td className="px-4 py-4"><StatusBadge status={status} /></td>

                    <td className="px-4 py-4 flex justify-end items-center gap-2">
                      <button className="px-3 py-1 rounded-full bg-blue-600 text-white text-xs" onClick={() => onOpenOrder(p)}>Order Test</button>
                      <button className="p-1 rounded hover:bg-gray-100 text-gray-600" onClick={() => onEdit(p.patientId)} title="Edit">
                        {/* light pencil svg */}
                        <svg width="16" height="16" viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z" fill="currentColor"/></svg>
                      </button>

                      <RowActions onEdit={() => onEdit(p.patientId)} onDelete={() => onDelete(p.patientId)} />
                    </td>
                  </tr>

                  {/* hover preview row */}
                  <tr className="hidden group-hover:table-row bg-gray-50">
                    <td colSpan={10} className="px-4 py-3">
                      <div className="border rounded bg-white p-3">
                        <div className="mb-2 text-sm text-gray-700 font-medium">Tests</div>
                        {p.tests && p.tests.length > 0 ? (
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                            {p.tests.map((t) => (
                              <div key={t.id} className="p-2 border rounded bg-white">
                                <div className="font-medium">{t.name}</div>
                                <div className="text-xs text-gray-500">Specimen: {t.specimen ?? '—'}</div>
                                <div className="text-xs text-gray-500">Status: {t.status ?? '—'}</div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-sm text-gray-500">No tests available.</div>
                        )}
                      </div>
                    </td>
                  </tr>
                </React.Fragment>
              );
            })}

            {paged.length === 0 && (
              <tr>
                <td colSpan={10} className="px-4 py-6 text-center text-gray-500">No patients found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Bottom pagination — keeps the existing behaviour */}
      <div className="px-4 py-3 border-t bg-white">
        <Pagination
          page={page}
          totalPages={totalPages}
          pageSize={pageSize}
          totalItems={totalItems}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
        />
      </div>
    </div>
  );
}