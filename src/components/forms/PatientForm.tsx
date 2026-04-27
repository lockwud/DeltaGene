'use client';

import React from 'react';
import Button from '@/components/ui/Button';

type Props = {
  onClose: () => void;
};

const PatientForm: React.FC<Props> = ({ onClose }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl border p-6">
      
      {/* HEADER */}
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-lg font-semibold text-gray-800">
          Register New Patient
        </h2>

        <button onClick={onClose}>
          <span className="material-icons text-gray-500 hover:text-gray-700">
            close
          </span>
        </button>
      </div>

      {/* FORM */}
      <form className="space-y-4">
        
        {/* NAME */}
        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Full Name
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* DOB */}
        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Date of Birth
          </label>
          <input
            type="date"
            className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* GENDER */}
        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Gender
          </label>
          <select
            className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* CONTACT */}
        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Contact
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* ADDRESS */}
        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Address
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* ACTIONS */}
        <div className="flex justify-end gap-3 pt-3">
          <Button variant="secondary" type="button" onClick={onClose}>
            Cancel
          </Button>

          <Button type="submit">
            Register Patient
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PatientForm;