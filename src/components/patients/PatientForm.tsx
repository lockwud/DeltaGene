'use client';

import React, { useState } from 'react';
import { COLORS } from '@/lib/colors';

export type Patient = {
  patientId?: string;
  firstName: string;
  lastName: string;
  dob?: string; // ISO date
  gender?: 'male' | 'female' | 'other' | '';
  contact?: string;
  address?: string;
  clinicNumber?: string;
  physician?: string;
  sampleType?: string;
  sampleSource?: string;
  priority?: 'normal' | 'urgent' | 'stat' | '';
  insurance?: string;
  collectionDate?: string; // ISO date
  collectionTime?: string; // HH:MM
  allergies?: string;
  notes?: string;
};

type Props = {
  initial?: Partial<Patient>;
  onCancel: () => void;
  onSubmit: (data: Patient) => void;
};

const PatientForm: React.FC<Props> = ({ initial = {}, onCancel, onSubmit }) => {
  const [form, setForm] = useState<Patient>({
    patientId: initial.patientId ?? '',
    firstName: initial.firstName ?? '',
    lastName: initial.lastName ?? '',
    dob: initial.dob ?? '',
    gender: (initial.gender as any) ?? '',
    contact: initial.contact ?? '',
    address: initial.address ?? '',
    clinicNumber: initial.clinicNumber ?? '',
    physician: initial.physician ?? '',
    sampleType: initial.sampleType ?? '',
    sampleSource: initial.sampleSource ?? '',
    priority: (initial.priority as any) ?? '',
    insurance: initial.insurance ?? '',
    collectionDate: initial.collectionDate ?? '',
    collectionTime: initial.collectionTime ?? '',
    allergies: initial.allergies ?? '',
    notes: initial.notes ?? '',
  });

  const activeBg = (COLORS && (COLORS.activeBg ?? COLORS.primary)) || '#4b6db8';
  const activeText = (COLORS && (COLORS.activeText ?? '#fff')) || '#ffffff';

  const handleChange = (k: keyof Patient) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Basic required checks
    if (!form.firstName || !form.lastName) {
      alert('Please enter first and last name.');
      return;
    }
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-2xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-600">Patient ID (optional)</label>
          <input type="text" value={form.patientId} onChange={handleChange('patientId')} className="mt-1 block w-full px-3 py-2 border rounded-md bg-white" />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600">Clinic Number</label>
          <input type="text" value={form.clinicNumber} onChange={handleChange('clinicNumber')} className="mt-1 block w-full px-3 py-2 border rounded-md" />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600">First Name</label>
          <input type="text" value={form.firstName} onChange={handleChange('firstName')} required className="mt-1 block w-full px-3 py-2 border rounded-md" />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600">Last Name</label>
          <input type="text" value={form.lastName} onChange={handleChange('lastName')} required className="mt-1 block w-full px-3 py-2 border rounded-md" />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600">Date of Birth</label>
          <input type="date" value={form.dob} onChange={handleChange('dob')} className="mt-1 block w-full px-3 py-2 border rounded-md" />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600">Gender</label>
          <select value={form.gender} onChange={handleChange('gender')} className="mt-1 block w-full px-3 py-2 border rounded-md">
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600">Contact Number</label>
          <input type="tel" value={form.contact} onChange={handleChange('contact')} className="mt-1 block w-full px-3 py-2 border rounded-md" />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600">Physician / Requester</label>
          <input value={form.physician} onChange={handleChange('physician')} className="mt-1 block w-full px-3 py-2 border rounded-md" />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600">Sample Type</label>
          <select value={form.sampleType} onChange={handleChange('sampleType')} className="mt-1 block w-full px-3 py-2 border rounded-md">
            <option value="">Select</option>
            <option value="blood">Blood</option>
            <option value="urine">Urine</option>
            <option value="swab">Swab</option>
            <option value="csf">CSF</option>
            <option value="tissue">Tissue</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600">Sample Source / Site</label>
          <input value={form.sampleSource} onChange={handleChange('sampleSource')} className="mt-1 block w-full px-3 py-2 border rounded-md" />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600">Priority</label>
          <select value={form.priority} onChange={handleChange('priority')} className="mt-1 block w-full px-3 py-2 border rounded-md">
            <option value="">Normal</option>
            <option value="urgent">Urgent</option>
            <option value="stat">STAT</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600">Collection Date</label>
          <input type="date" value={form.collectionDate} onChange={handleChange('collectionDate')} className="mt-1 block w-full px-3 py-2 border rounded-md" />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600">Collection Time</label>
          <input type="time" value={form.collectionTime} onChange={handleChange('collectionTime')} className="mt-1 block w-full px-3 py-2 border rounded-md" />
        </div>

        <div className="md:col-span-2">
          <label className="block text-xs font-medium text-gray-600">Address</label>
          <input type="text" value={form.address} onChange={handleChange('address')} className="mt-1 block w-full px-3 py-2 border rounded-md" />
        </div>

        <div className="md:col-span-2">
          <label className="block text-xs font-medium text-gray-600">Insurance / Payer</label>
          <input type="text" value={form.insurance} onChange={handleChange('insurance')} className="mt-1 block w-full px-3 py-2 border rounded-md" />
        </div>

        <div className="md:col-span-2">
          <label className="block text-xs font-medium text-gray-600">Allergies</label>
          <input type="text" value={form.allergies} onChange={handleChange('allergies')} className="mt-1 block w-full px-3 py-2 border rounded-md" />
        </div>

        <div className="md:col-span-2">
          <label className="block text-xs font-medium text-gray-600">Notes / Clinical Info</label>
          <textarea value={form.notes} onChange={handleChange('notes')} className="mt-1 block w-full px-3 py-2 border rounded-md" rows={3} />
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-3">
        <button type="button" onClick={onCancel} className="px-4 py-2 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200">
          Cancel
        </button>

        <button
          type="submit"
          className="px-4 py-2 rounded-md text-white"
          style={{ background: activeBg }}
        >
          Create Patient
        </button>
      </div>
    </form>
  );
};

export default PatientForm;