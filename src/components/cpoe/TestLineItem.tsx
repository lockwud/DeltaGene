import React from 'react';
import { OrderLine } from '@/components/types/types';

type Props = {
  index: number;
  value: OrderLine;
  onChange: (idx: number, patch: Partial<OrderLine>) => void;
  onRemove: (idx: number) => void;
};

export default function TestLineItem({ index, value, onChange, onRemove }: Props) {
  return (
    <div className="flex gap-2 items-start">
      <input
        value={value.name}
        onChange={(e) => onChange(index, { name: e.target.value })}
        placeholder="Test name or code"
        className="flex-1 px-3 py-2 border rounded-md text-sm"
      />
      <select value={value.specimen} onChange={(e) => onChange(index, { specimen: e.target.value })} className="px-2 py-2 border rounded-md text-sm">
        <option>Blood</option>
        <option>Urine</option>
        <option>Swab</option>
        <option>Stool</option>
        <option>Other</option>
      </select>
      <select value={value.priority} onChange={(e) => onChange(index, { priority: e.target.value as any })} className="px-2 py-2 border rounded-md text-sm">
        <option value="Routine">Routine</option>
        <option value="ASAP">ASAP</option>
        <option value="Stat">Stat</option>
      </select>
      <button onClick={() => onRemove(index)} className="text-sm text-red-600 px-2 py-1 rounded-md">Remove</button>
    </div>
  );
}