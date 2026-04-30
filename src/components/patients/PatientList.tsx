'use client';

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from 'next/navigation';
import PatientForm from "../forms/PatientForm";
import Pagination from "@/components/ui/Pagination";
import RowActions from "@/components/ui/RowActions";
import { COLORS } from "@/lib/colors";
import { useToast } from "@/components/ui/Toast";
import EmptyState from "@/components/ui/EmptyState";

type TestItem = {
  id: string;
  name: string;
  date?: string;
  status?: string;
};

type Patient = {
  patientId: string;
  firstName: string;
  lastName: string;
  dob: string; // ISO date
  gender: string;
  contact: string;
  address?: string;
  active: boolean;
  registeredAt?: string; // ISO
  tests?: TestItem[];
};

type PatientPayload = {
  fullName: string;
  dob: string;
  gender: string;
  contact: string;
  address: string;
  active?: boolean;
};

const formatDate = (iso?: string) => (iso ? new Date(iso).toLocaleDateString() : "");
const computeAge = (dob?: string) => {
  if (!dob) return "";
  const diff = Date.now() - new Date(dob).getTime();
  const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
  return `${years}`;
};

const initialPatients: Patient[] = [
  {
    patientId: "P0001",
    firstName: "John",
    lastName: "Doe",
    dob: "1990-01-01",
    gender: "Male",
    contact: "+123456789",
    address: "123 Main St",
    active: true,
    registeredAt: "2024-06-01T10:00:00Z",
    tests: [
      { id: "T001", name: "CBC", date: "2025-01-10", status: "completed" },
      { id: "T002", name: "COVID PCR", date: "2025-02-12", status: "running" },
    ],
  },
  {
    patientId: "P0002",
    firstName: "Jane",
    lastName: "Smith",
    dob: "1985-05-10",
    gender: "Female",
    contact: "+1987654321",
    address: "Unit 4, 88 Park Ave",
    active: false,
    registeredAt: "2023-12-02T09:30:00Z",
    tests: [
      {
        id: "T010",
        name: "Lipid Panel",
        date: "2024-12-01",
        status: "completed",
      },
    ],
  },
];

const PatientList: React.FC = () => {
  const router = useRouter();
  const [patients, setPatients] = useState<Patient[]>(initialPatients);
  const [showModal, setShowModal] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);

  const toast = useToast();

  const activeBg = (COLORS && (COLORS.activeBg ?? COLORS.primary)) || "#2563EB";

  // ESC to close modal
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowModal(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const filtered = patients; // search removed per request

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paged = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page, pageSize]);

  useEffect(() => {
    if (page > totalPages) setPage(1);
  }, [totalPages, page]);

  const handleCreate = (data: PatientPayload) => {
    const [firstName, ...rest] = data.fullName.split(" ");
    const lastName = rest.join(" ");
    const id = `P${(patients.length + 1).toString().padStart(4, "0")}`;
    const patient: Patient = {
      patientId: id,
      firstName: firstName || "",
      lastName: lastName || "",
      dob: data.dob,
      gender: data.gender,
      contact: data.contact,
      address: data.address || "",
      active: data.active ?? true,
      registeredAt: new Date().toISOString(),
      tests: [],
    };
    setPatients((prev) => [patient, ...prev]);
    setShowModal(false);
    setPage(1);

    // show toast with Proceed -> dispatch patient:registered on proceed
    toast.show({
      title: "Patient registered",
      message: `${patient.firstName} ${patient.lastName} was registered.`,
      duration: 10000,
      proceedLabel: "Order tests",
      dismissLabel: "Close",
      onProceed: () => {
        window.dispatchEvent(new CustomEvent("patient:registered", { detail: patient }));
        try {
          sessionStorage.setItem('cpoe:selectedPatient', JSON.stringify(patient));
        } catch (err) {
          /* ignore storage errors */
        }
        router.push('/system/cpoe');
      },
      onDismiss: () => {
        // no-op
      },
    });
  };

  const editPatient = (id: string) => {
    setShowModal(true);
    // TODO: populate form for editing
  };

  const deletePatient = (id: string) => {
    if (!confirm("Delete this patient? This action cannot be undone.")) return;
    setPatients((prev) => prev.filter((p) => p.patientId !== id));
  };

  // called when user clicks the Order button on a row
  const handleOrder = (p: Patient) => {
    try {
      sessionStorage.setItem('cpoe:selectedPatient', JSON.stringify(p));
    } catch (err) {
      console.error('Failed to save selected patient for CPOE', err);
    }
    router.push('/system/cpoe');
  };

  const computePatientStatus = (p: Patient) => {
    const tests = p.tests ?? [];
    if (tests.length === 0) {
      return p.active ? "active" : "inactive";
    }

    const normalized = tests.map((t) => (t.status || "").toLowerCase());

    if (normalized.some((s) => s === "running")) return "active";
    if (
      normalized.some(
        (s) => s === "inprogress" || s === "in progress" || s === "pending",
      )
    )
      return "inprogress";
    if (normalized.every((s) => s === "completed" && s !== ""))
      return "completed";

    return p.active ? "active" : "inactive";
  };

  const statusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-600 text-white text-xs font-medium">
            Active
          </span>
        );
      case "inprogress":
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-amber-500 text-white text-xs font-medium">
            In progress
          </span>
        );
      case "completed":
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-medium">
            Completed
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-gray-400 text-white text-xs font-medium">
            Inactive
          </span>
        );
    }
  };

  return (
    <div className="p-4 -mt-4">
      <div className="flex items-center justify-between mb-3 gap-4">
        <h1 className="text-2xl font-semibold">Patient</h1>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-3 py-1 rounded-full text-white text-sm shadow"
            style={{ background: activeBg }}
            title="Create patient"
          >
            <span className="material-icons text-sm">add</span>
            <span>Create</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden min-h-[220px]">
        <div className="overflow-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-sm border-b bg-gray-100">
                <th className="px-4 py-4 text-gray-700">Patient ID</th>
                <th className="px-4 py-4 text-gray-700">Name</th>
                <th className="px-4 py-4 text-gray-700">DOB / Age</th>
                <th className="px-4 py-4 text-gray-700">Gender</th>
                <th className="px-4 py-4 text-gray-700 hidden sm:table-cell">
                  Contact
                </th>
                <th className="px-4 py-4 text-gray-700">Tests</th>
                <th className="px-4 py-4 text-gray-700 hidden md:table-cell">
                  Address
                </th>
                <th className="px-4 py-4 text-gray-700">Registered</th>
                <th className="px-4 py-4 text-gray-700">Status</th>
                <th className="px-4 py-4 text-gray-700 w-36">Actions</th>
              </tr>
            </thead>

            <tbody>
              {paged.length === 0 ? (
                <tr>
                  <td colSpan={10} className="px-4 py-8">
                    <EmptyState
                      title="No patients found"
                      description="There are no patients yet. Click Create to add a patient and start ordering tests."
                    />
                  </td>
                </tr>
              ) : (
                paged.map((p) => {
                  const status = computePatientStatus(p);

                  return (
                    <React.Fragment key={p.patientId}>
                      <tr className="group hover:bg-gray-50">
                        <td className="px-4 py-4 font-mono text-xs">
                          {p.patientId}
                        </td>

                        <td className="px-4 py-4">
                          <div className="flex flex-col">
                            <span className="font-medium">{`${p.firstName} ${p.lastName}`}</span>
                            <span className="text-xs text-gray-500 hidden sm:block">
                              {p.contact}
                            </span>
                          </div>
                        </td>

                        <td className="px-4 py-4">
                          <div className="text-sm">
                            <div>{formatDate(p.dob)}</div>
                            <div className="text-xs text-gray-500">
                              {computeAge(p.dob)} yrs
                            </div>
                          </div>
                        </td>

                        <td className="px-4 py-4">{p.gender}</td>
                        <td className="px-4 py-4 hidden sm:table-cell">
                          {p.contact}
                        </td>

                        <td className="px-4 py-4">
                          <div className="text-sm text-gray-700">
                            {p.tests?.length ? (
                              <span>
                                {p.tests.length} test{p.tests.length > 1 ? "s" : ""}
                              </span>
                            ) : (
                              <span className="text-gray-400">—</span>
                            )}
                          </div>
                        </td>

                        <td
                          className="px-4 py-4 hidden md:table-cell truncate"
                          style={{ maxWidth: 220 }}
                        >
                          {p.address}
                        </td>

                        <td className="px-4 py-4">{formatDate(p.registeredAt)}</td>

                        <td className="px-4 py-4">{statusBadge(status)}</td>

                        <td className="px-4 py-4 flex justify-end items-center gap-2">
                          <button
                            onClick={() => handleOrder(p)}
                            className="px-3 py-1 rounded-full bg-blue-600 text-white text-xs"
                            title="Order test"
                          >
                            Order
                          </button>

                          <RowActions
                            onEdit={() => editPatient(p.patientId)}
                            onDelete={() => deletePatient(p.patientId)}
                          />
                        </td>
                      </tr>

                      {/* Hover row: shows tests when the parent row is hovered */}
                      <tr className="hidden group-hover:table-row bg-gray-50">
                        <td colSpan={10} className="px-4 py-3">
                          <div className="border rounded bg-white p-3">
                            <div className="mb-2 text-sm text-gray-700 font-medium">
                              Tests
                            </div>
                            {p.tests && p.tests.length > 0 ? (
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                                {p.tests.map((t) => (
                                  <div key={t.id} className="p-2 border rounded bg-white">
                                    <div className="font-medium">{t.name}</div>
                                    <div className="text-xs text-gray-500">
                                      Date: {t.date ? formatDate(t.date) : "—"}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                      Status: {t.status ?? "—"}
                                    </div>
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
                })
              )}
            </tbody>
          </table>
        </div>

        <div className="px-4 py-3 border-t bg-white">
          <Pagination
            page={page}
            totalPages={totalPages}
            pageSize={pageSize}
            totalItems={filtered.length}
            onPageChange={(p) => setPage(p)}
            onPageSizeChange={(size) => {
              setPageSize(size);
              setPage(1);
            }}
          />
        </div>
      </div>

      {/* Modal for Create/Edit */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" aria-modal="true" role="dialog">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <div className="relative z-10 max-w-3xl w-full mx-4">
            <div className="bg-white rounded-xl shadow-xl border p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-lg font-semibold" style={{ color: activeBg }}>
                    Create / Edit Patient
                  </h2>
                  <p className="text-sm text-gray-500">Enter patient details</p>
                </div>
                <button onClick={() => setShowModal(false)} className="p-2 rounded-md hover:bg-gray-100" aria-label="Close">
                  <span className="material-icons text-gray-600">close</span>
                </button>
              </div>

              <PatientForm onClose={() => setShowModal(false)} onSave={handleCreate} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientList;