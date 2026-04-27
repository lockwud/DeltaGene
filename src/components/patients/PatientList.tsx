'use client';

import React, { useEffect, useState } from 'react';
import PatientForm, { Patient } from './PatientForm';
import { COLORS } from '@/lib/colors';
import Link from 'next/link';

const PatientList: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([
    { patientId: 'P0001', firstName: 'John', lastName: 'Doe', dob: '1990-01-01', gender: 'male', contact: '+123456789' },
  ]);
  const [showModal, setShowModal] = useState(false);
  const activeBg = (COLORS && (COLORS.activeBg ?? COLORS.primary)) || '#2563EB';

  // close on ESC
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setShowModal(false);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const handleCreate = (p: Patient) => {
    // simple ID generation for demo:
    const id = p.patientId || `P${(patients.length + 1).toString().padStart(4, '0')}`;
    setPatients((prev) => [{ ...p, patientId: id }, ...prev]);
    setShowModal(false);
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Patient List</h1>

        {/* Rounded Create button */}
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-full text-white font-medium shadow"
          style={{ background: activeBg }}
        >
          <span className="material-icons text-sm">add</span>
          <span>Create</span>
        </button>
      </div>

      <div className="bg-white rounded shadow p-4 overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">Patient ID</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">DOB</th>
              <th className="px-4 py-2 text-left">Gender</th>
              <th className="px-4 py-2 text-left">Contact</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((p) => (
              <tr key={p.patientId} className="border-t">
                <td className="px-4 py-3">{p.patientId}</td>
                <td className="px-4 py-3">{`${p.firstName} ${p.lastName}`}</td>
                <td className="px-4 py-3">{p.dob}</td>
                <td className="px-4 py-3">{p.gender}</td>
                <td className="px-4 py-3">{p.contact}</td>
                <td className="px-4 py-3">
                  <Link href={`/patients/${p.patientId}`} className="text-blue-600 hover:underline mr-3">View</Link>
                  <button className="text-green-600 hover:underline">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          aria-modal="true"
          role="dialog"
        >
          {/* Overlay with blur */}
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          />

          <div className="relative z-10 max-w-3xl w-full mx-4">
            <div className="bg-white rounded-xl shadow-xl border p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-lg font-semibold" style={{ color: activeBg }}>Create Patient</h2>
                  <p className="text-sm text-gray-500">Enter patient and sample details</p>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 rounded-md hover:bg-gray-100"
                  aria-label="Close"
                >
                  <span className="material-icons text-gray-600">close</span>
                </button>
              </div>

              <PatientForm onCancel={() => setShowModal(false)} onSubmit={handleCreate} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientList;