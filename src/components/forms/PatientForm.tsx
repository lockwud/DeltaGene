'use client';

import React, { useRef, useState } from 'react';
import { format } from 'date-fns';
import CalendarPopover from '@/components/ui/CalendarPopover';

type PatientPayload = {
  fullName: string;
  dob: string;
  gender: string;
  contact: string;
  address: string;
  active: boolean;
};

type Props = {
  onClose: () => void;
  onSave?: (data: PatientPayload) => Promise<void> | void;
  initial?: Partial<PatientPayload>;
};

export default function PatientForm({ onClose, onSave, initial = {} }: Props) {
  const [fullName, setFullName] = useState(initial.fullName ?? '');

  const [dobDate, setDobDate] = useState<Date | undefined>(
    initial.dob ? new Date(initial.dob) : undefined
  );
  const [dobDisplay, setDobDisplay] = useState(
    dobDate ? format(dobDate, 'MMMM do, yyyy') : ''
  );

  const [showCalendar, setShowCalendar] = useState(false);

  const [gender, setGender] = useState(initial.gender ?? '');
  const [contact, setContact] = useState(initial.contact ?? '');
  const [address, setAddress] = useState(initial.address ?? '');
  const [active, setActive] = useState(initial.active ?? true);
  const [saving, setSaving] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleSelectDate = (d?: Date) => {
    // immediate prefill while selecting
    setDobDate(d);
    setDobDisplay(d ? format(d, 'MMMM do, yyyy') : '');
  };

  const handleApplyDate = () => {
    // just close: selected date already applied by handleSelectDate
    setShowCalendar(false);
  };

  const handleCancelDate = () => {
    // CalendarPopover will call onCancel which we've implemented to revert selection
    setShowCalendar(false);
  };

  const handleClearDob = () => {
    setDobDate(undefined);
    setDobDisplay('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const payload: PatientPayload = {
      fullName,
      dob: dobDate ? dobDate.toISOString() : '',
      gender,
      contact,
      address,
      active,
    };
    try {
      if (onSave) await onSave(payload);
      else console.log('Patient saved', payload);
      onClose();
    } catch (err) {
      console.error('Save failed', err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md border">
      {/* Header */}
     

      {/* Form */}
      <form onSubmit={handleSubmit} className="px-6 pb-6 border-t">
        <div className="space-y-4 mt-4">
          {/* Full name */}
          <div>
            <label htmlFor="fullName" className="block text-sm text-gray-700 mb-1">Full name</label>
            <input
              id="fullName"
              name="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              type="text"
              placeholder="e.g. Jane Doe"
              className="w-full max-w-[420px] px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
            <p className="mt-1 text-xs text-gray-400">Patient's complete legal name.</p>
          </div>

          {/* Date picker (small rounded with icon) */}
          <div className="relative">
            <label htmlFor="dob" className="block text-sm text-gray-700 mb-1">Date</label>

            <div className="flex items-center gap-2">
              <div className="relative">
                <input
                  id="dob"
                  ref={inputRef}
                  readOnly
                  value={dobDisplay}
                  placeholder="Select date"
                  onClick={() => setShowCalendar((s) => !s)}
                  className="h-9 text-sm rounded-full bg-gray-50 border px-3 pl-10 w-44 cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-500"
                />

                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                  <span className="material-icons" style={{ fontSize: 16 }}>calendar_today</span>
                </span>
              </div>

              {dobDisplay ? (
                <button
                  type="button"
                  title="Clear date"
                  onClick={handleClearDob}
                  className="h-8 w-8 flex items-center justify-center rounded-full border bg-white text-gray-600 hover:bg-gray-50"
                >
                  <span className="material-icons" style={{ fontSize: 16 }}>close</span>
                </button>
              ) : null}
            </div>

            {/* Calendar popover component */}
            <div style={{ position: 'relative' }}>
              <CalendarPopover
                anchorRef={inputRef.current}
                open={showCalendar}
                selected={dobDate}
                onSelect={handleSelectDate}
                onApply={() => {
                  handleApplyDate();
                }}
                onCancel={() => {
                  // revert to previous date (CalendarPopover already calls onSelect with prev when cancelling)
                  // but also make sure our local state reflects it:
                  setShowCalendar(false);
                }}
                minWidth={200}
              />
            </div>

            <p className="mt-1 text-xs text-gray-400">Use the patient's date of birth for accurate specimen labeling.</p>
          </div>

          {/* Gender */}
          <div>
            <label htmlFor="gender" className="block text-sm text-gray-700 mb-1">Gender</label>
            <select
              id="gender"
              name="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="h-9 text-sm rounded-full bg-gray-50 border px-3 w-44 focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            >
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other / Prefer not to say</option>
            </select>
            <p className="mt-1 text-xs text-gray-400">Select the recorded gender for the patient's chart.</p>
          </div>

          {/* Contact */}
          <div>
            <label htmlFor="contact" className="block text-sm text-gray-700 mb-1">Contact</label>
            <input
              id="contact"
              name="contact"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              type="tel"
              placeholder="+1 (555) 555-5555"
              className="w-full max-w-[360px] px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
            <p className="mt-1 text-xs text-gray-400">Phone number for appointment confirmations and results.</p>
          </div>

          {/* Address */}
          <div>
            <label htmlFor="address" className="block text-sm text-gray-700 mb-1">Address</label>
            <input
              id="address"
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              type="text"
              placeholder="Street, City, State, ZIP"
              className="w-full max-w-[420px] px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <p className="mt-1 text-xs text-gray-400">Optional — used for patient records and courier pickups.</p>
          </div>

          {/* Active block */}
          <div>
            <div className="rounded-md border bg-white p-3 flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-800 font-medium">Active</p>
                <p className="text-xs text-gray-400">Enable or disable this patient in the system</p>
              </div>

              <div>
                <button
                  type="button"
                  onClick={() => setActive((v) => !v)}
                  role="switch"
                  aria-pressed={active}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${active ? 'bg-blue-600' : 'bg-gray-200'}`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${active ? 'translate-x-5' : 'translate-x-1'}`} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex justify-end items-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="h-9 rounded-full border px-3 text-sm bg-white text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-2"
            disabled={saving}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="h-9 rounded-full bg-blue-600 hover:bg-blue-700 text-white px-4 text-sm flex items-center gap-2"
            disabled={saving}
          >
            <span className="material-icons" style={{ fontSize: 16 }}>save</span>
            {saving ? 'Saving...' : 'Save Patient'}
          </button>
        </div>
      </form>
    </div>
  );
}