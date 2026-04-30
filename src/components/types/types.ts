// src/components/types/index.ts

// Test item attached to a patient (runtime data)
export type TestStatus = 'pending' | 'processing' | 'completed' | 'cancelled' | 'running';

export type TestItem = {
  id: string;                // unique test row id (e.g. P0001-165432-0)
  name: string;              // display name (e.g. "CBC")
  code?: string;             // generated or manual test code (e.g. "CBC-19900101-001")
  specimen?: string;         // specimen type (Blood, Urine, ...)
  priority?: 'Routine' | 'ASAP' | 'Stat';
  date?: string;             // ISO date/time when ordered/collected
  status?: TestStatus;       // pending | processing | completed
  // optional free-form metadata (instrument, location, reason)
  metadata?: Record<string, unknown>;
};

// Patient record (source of truth in patient table)
export type Patient = {
  patientId: string;         // MRN or code (e.g. P0001)
  firstName: string;
  lastName: string;
  dob: string;               // ISO date YYYY-MM-DD
  gender?: string;
  contact?: string;
  address?: string;
  active?: boolean;
  registeredAt?: string;     // ISO datetime
  tests?: TestItem[];        // attached tests
};

// Payload used when creating a patient (form)
export type PatientPayload = {
  fullName: string;
  dob?: string;
  gender?: string;
  contact?: string;
  address?: string;
  active?: boolean;
};

// Order line (what user selects when building an order)
export type OrderLine = {
  name: string; // test name (or code)
  specimen?: string;
  priority?: 'Routine' | 'ASAP' | 'Stat';
  code?: string; // optional generated code
};

// Order model for queueing
export type OrderStatus = 'pending' | 'processing' | 'completed' | 'canceled';

export type Order = {
  orderId: string;
  patientId: string;
  orderingProvider?: { id: string; name: string };
  priority?: 'Routine' | 'ASAP' | 'Stat';
  clinicalIndication?: string;
  tests: OrderLine[];   // order lines (minimal)
  status?: OrderStatus;
  createdAt?: string;
  createdBy?: string;
};

// small helpers you might export for convenience
export function fullName(p: Pick<Patient, 'firstName' | 'lastName'>) {
  return `${p.firstName} ${p.lastName}`.trim();
}